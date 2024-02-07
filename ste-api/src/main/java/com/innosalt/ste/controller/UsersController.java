package com.innosalt.ste.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.nio.charset.Charset;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dreamsecurity.json.JSONObject;
import com.dreamsecurity.mobileOK.MobileOKException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.innosalt.ste.dto.User;
import com.innosalt.ste.dto.UserDetail;
import com.innosalt.ste.exception.ExceptionCode;
import com.innosalt.ste.exception.ExceptionPayload;
import com.innosalt.ste.model.DataPayload;
import com.innosalt.ste.model.ResponsePayload;
import com.innosalt.ste.service.UserService;
import com.innosalt.ste.util.CommUtil;
import com.innosalt.ste.util.JwtTokenUtil;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiParam;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Api(tags = "회원관리")
//@Tag(name = "User", description = "User Description")
@RestController
@RequestMapping(value = "/users")
@RequiredArgsConstructor
@Slf4j
public class UsersController {

	private final UserService userService;
	private final JwtTokenUtil jwtTokenUtil;

	@Value("${jwt.refresh.timeout}")
	private int refreshTimeout;

	@Operation(summary = "[NoAuth] 로그인")
	@ApiResponse(responseCode = "200", description = "", content = {
			@Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = DataPayload.class)) })
	@PostMapping({ "/signin" })
	public ResponseEntity<?> signin(
			@ApiParam(value = "...") @Parameter(description = "...") @io.swagger.v3.oas.annotations.parameters.RequestBody(description = "not working", required = true, content = @Content(schema = @Schema(implementation = User.SignIn.class))) @Valid @RequestBody User.SignIn dto,
			HttpServletRequest request, HttpServletResponse response) {

		UserDetail detail = userService.loadUserByLogin(dto);
		if (detail != null) {
			String accessToken = loginProc(detail.getSn(), request, response);
			return ResponseEntity.ok().body(new DataPayload(accessToken));
		}
		return ResponseEntity.ok().body(new ExceptionPayload(ExceptionCode.FAIL_AUTHENTICATION));
	}

	private String loginProc(String sn, HttpServletRequest request, HttpServletResponse response) {
		Map<String, String> map = new HashMap<String, String>();
		map.put("type", "IN");
		map.put("sn", sn);
		map.put("ip", CommUtil.getRemoteAddr(request));

		String accessToken = jwtTokenUtil.generateAccessToken(sn);
		String refreshToken = jwtTokenUtil.generateRefreshToken(sn);

		// 다중 매체에서 리프레시토큰을 이용한 자동갱신이 불가
		// 필요하다면 ip, useragent 등의 값을 REPO에 함께 저장 필요
		Cookie cookie = new Cookie("refreshToken", refreshToken);
		cookie.setSecure(true);
		cookie.setHttpOnly(true);
		cookie.setPath("/");
		cookie.setMaxAge(refreshTimeout);
		response.addCookie(cookie);

		map.put("token", refreshToken);

		userService.saveLogin(map);

		return accessToken;
	}

	@Operation(summary = "로그아웃")
	@ApiResponse(responseCode = "200", description = "", content = {
			@Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = DataPayload.class)) })
	@PostMapping({ "/signout" })
	public ResponseEntity<?> signout(@AuthenticationPrincipal UserDetail user, HttpServletRequest request,
			HttpServletResponse response) {

		userService.logout(user.getSn());
		return ResponseEntity.ok().body(new DataPayload());
	}

	@Operation(summary = "[NoAuth] 로그인 토큰 재발급")
	@ApiResponse(responseCode = "200", description = "", content = {
			@Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = DataPayload.class)) })
	@PostMapping({ "/re-signin" })
	public ResponseEntity<?> resignin(HttpServletRequest request, HttpServletResponse response) {

		Cookie rc[] = request.getCookies();
		String cookieTok = null;
		for (Cookie cookie : rc) {
			if (cookie.getName().equals("refreshToken"))
				cookieTok = cookie.getValue();
		}
		if (cookieTok == null)
			return ResponseEntity.ok().body(new ExceptionPayload(ExceptionCode.FAIL_AUTHENTICATION, "no cookie"));

		String sn = jwtTokenUtil.resolveRefreshToken(cookieTok);
		Map<String, Object> repo = userService.loadTokenBySn(sn);
		System.out.println(repo);
		if (repo == null)
			return ResponseEntity.ok().body(new ExceptionPayload(ExceptionCode.FAIL_AUTHENTICATION, "no repo"));

		String accessToken = null;
		if (cookieTok.equals((String) repo.get("token"))) {
			accessToken = jwtTokenUtil.generateAccessToken(sn);
		} else {
			userService.logout(sn);
			return ResponseEntity.ok().body(new ExceptionPayload(ExceptionCode.FAIL_AUTHENTICATION, "not match"));
		}

		return ResponseEntity.ok().body(new DataPayload(accessToken));
	}

	@Operation(summary = "[NoAuth] 회원가입")
	@ApiResponse(responseCode = "200", description = "", content = {
			@Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = DataPayload.class)) })
	@PostMapping({ "/signup" })
	public ResponseEntity<?> signup(@RequestBody User.SignUp dto, HttpServletRequest request,
			HttpServletResponse response) {
		ResponsePayload payload = userService.signUp(dto, request);
		if (payload.getCode().equals("R0000")) {
			DataPayload dp = (DataPayload) payload;
			dto = (User.SignUp) dp.getData();
			String accessToken = loginProc(dto.getSn(), request, response);
			String userName = dto.getName();

			Map<String, String> rMap = new HashMap<String, String>();
			rMap.put("token", accessToken);
			rMap.put("name", userName);
			return ResponseEntity.ok().body(new DataPayload(rMap));
		} else {
			return ResponseEntity.ok().body(payload);
		}
	}

	@Operation(summary = "[NoAuth] ID중복체크")
	@ApiResponse(responseCode = "200", description = "", content = {
			@Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ResponsePayload.class)) })
	@PostMapping({ "/verification/idcheck" })
	public ResponseEntity<?> idcheck(@RequestBody User.IdCheck dto) {
		return ResponseEntity.ok().body(userService.checkUserId(dto));
	}

	@Operation(summary = "[NoAuth] 휴대폰본인인증 결과 페이지")
	@ApiResponse(responseCode = "200", description = "", content = {
			@Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = String.class)) })
	@PostMapping({ "/verification/mok_result" })
	public ResponseEntity<?> iden_result(@RequestParam(name = "data", required = false) String data)
			throws UnsupportedEncodingException {

		data = URLDecoder.decode(data, "UTF-8");
		log.debug(data);

		JSONObject resultJSON = new JSONObject(data);
		return ResponseEntity.ok().body(resultJSON.toString());
	}

	@Operation(summary = "[NoAuth] 휴대폰본인인증 토큰요청 페이지", description = "https://회원사URL/mok/mok_std_request.jsp 역할")
	@ApiResponse(responseCode = "200", description = "", content = {
			@Content(mediaType = MediaType.TEXT_HTML_VALUE, schema = @Schema(implementation = String.class)) })
	@PostMapping({ "/verification/html/{usage}" })
	public ResponseEntity<?> iden_token_request(
			@ApiParam(name = "usage", defaultValue = "signup", value = "signup/findid/resetpw") @PathVariable(name = "usage") String usage)
			throws JsonMappingException, JsonProcessingException {
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders.setContentType(new MediaType(MediaType.TEXT_HTML, Charset.forName("UTF-8")));
		try {
			// 01001 : 회원가입, 01002 : 정보변경, 01003 : ID찾기, 01004 : 비밀번호찾기, 01005 : 본인확인용,
			// 01006 : 성인인증, 01007 : 상품구매/결제, 01999 : 기타
			if (usage.equals("findid"))
				usage = "01003";
			else if (usage.equals("resetpw"))
				usage = "01004";
			else
				usage = "01001";
			String content = userService.identityRequest(usage);
			return new ResponseEntity<String>(content, responseHeaders, HttpStatus.OK);
		} catch (MobileOKException e) {
			return new ResponseEntity<String>("ERROR", responseHeaders, HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

	@Operation(summary = "[NoAuth] ID찾기")
	@ApiResponse(responseCode = "200", description = "", content = {
			@Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ResponsePayload.class)) })
	@PostMapping({ "/find/id" })
	public ResponseEntity<?> findid(@RequestBody User.FindId dto) {
		return ResponseEntity.ok().body(userService.findId(dto));
	}

	@Operation(summary = "[NoAuth] 비밀번호재설정")
	@ApiResponse(responseCode = "200", description = "", content = {
			@Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = ResponsePayload.class)) })
	@PostMapping({ "/find/pass" })
	public ResponseEntity<?> findPassword(@RequestBody User.FindPassword dto) {
		return ResponseEntity.ok().body(userService.resetPassword(dto));
	}

	////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

	@Operation(summary = "내정보")
//	@ApiImplicitParams({
//			@ApiImplicitParam(name = "authorization", value = "authorization", required = true, dataType = "string", paramType = "header"),
//			@ApiImplicitParam(name = "refreshToken", value = "refreshToken", required = true, dataType = "string", paramType = "header") })
	@ApiResponse(responseCode = "200", description = "", content = {
			@Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = DataPayload.class)) })
	@GetMapping({ "/my" })
	public ResponseEntity<?> myinfo(@AuthenticationPrincipal UserDetail user) throws Exception {
		User.MyInfo myinfo = userService.selectUserAcct(user.getSn());
		return ResponseEntity.ok().body(new DataPayload(myinfo));
	}

	@Operation(summary = "기본정보")
	@ApiResponse(responseCode = "200", description = "", content = {
			@Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = DataPayload.class)) })
	@GetMapping({ "/my_detail" })
	public ResponseEntity<?> my_detail(@AuthenticationPrincipal UserDetail user) throws Exception {
		User.MyInfoDetail myinfo = userService.selectUserDetail(user.getSn());
		return ResponseEntity.ok().body(new DataPayload(myinfo));
	}

	@Operation(summary = "기본정보 수정")
	@ApiResponse(responseCode = "200", description = "", content = {
			@Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = DataPayload.class)) })
	@PostMapping({ "/my_detail" })
	public ResponseEntity<?> my_detail_up(@AuthenticationPrincipal UserDetail user,
			@Valid @RequestBody User.MyInfoDetail dto) throws Exception {
		dto.setSn(user.getSn());
		userService.updateUserInfo(dto);
		return ResponseEntity.ok().body(new DataPayload());
	}
	
	@Operation(summary = "탈퇴")
	@ApiResponse(responseCode = "200", description = "", content = {
			@Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = DataPayload.class)) })
	@PostMapping({ "/withdraw" })
	public ResponseEntity<?> withdraw(@AuthenticationPrincipal UserDetail user) {
		userService.deleteUser(user.getSn());
		return ResponseEntity.ok().body(new DataPayload());
	}

	@Operation(summary = "즐겨찾기 종목들")
	@ApiResponse(responseCode = "200", description = "", content = {
			@Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = DataPayload.class)) })
	@GetMapping({ "/favorite" })
	public ResponseEntity<?> favorites(@AuthenticationPrincipal UserDetail user) {
		log.debug("user_sn : " + user.getSn());
		List<String> list = userService.selectFavoriteSymbols(user.getSn());
		Map<String, List> map = new HashMap<String, List>();
		map.put("symbols", list);
		return ResponseEntity.ok().body(new DataPayload(map));
	}

	@Operation(summary = "즐겨찾기 종목 추가")
	@ApiResponse(responseCode = "200", description = "", content = {
			@Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = DataPayload.class)) })
	@PostMapping({ "/favorite" })
	public ResponseEntity<?> favorite_add(@AuthenticationPrincipal UserDetail user,
			@RequestBody User.FavoriteSymbol fav) {
		log.debug("user_sn : " + user.getSn());
		Map<String, String> map = new HashMap<String, String>();
		map.put("sn", user.getSn());
		map.put("symbol", fav.getSymbol());
		userService.insertFavoriteSymbol(map);
		return ResponseEntity.ok().body(new DataPayload());
	}

	@Operation(summary = "즐겨찾기 종목 삭제")
	@ApiResponse(responseCode = "200", description = "", content = {
			@Content(mediaType = MediaType.APPLICATION_JSON_VALUE, schema = @Schema(implementation = DataPayload.class)) })
	@DeleteMapping({ "/favorite" })
	public ResponseEntity<?> favorite_del(@AuthenticationPrincipal UserDetail user,
			@RequestBody User.FavoriteSymbol fav) {
		log.debug("user_sn : " + user.getSn());
		Map<String, String> map = new HashMap<String, String>();
		map.put("sn", user.getSn());
		map.put("symbol", fav.getSymbol());
		userService.deleteFavoriteSymbol(map);
		return ResponseEntity.ok().body(new DataPayload());
	}
}
