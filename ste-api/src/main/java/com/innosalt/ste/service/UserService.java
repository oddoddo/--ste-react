package com.innosalt.ste.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dreamsecurity.json.JSONObject;
import com.dreamsecurity.mobileOK.MobileOKException;
import com.dreamsecurity.mobileOK.mobileOKKeyManager;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.innosalt.ste.dto.User;
import com.innosalt.ste.dto.UserDetail;
import com.innosalt.ste.exception.CustomException;
import com.innosalt.ste.exception.ExceptionCode;
import com.innosalt.ste.exception.ExceptionPayload;
import com.innosalt.ste.mapper.UserMapper;
import com.innosalt.ste.mca.MCAJsonService;
import com.innosalt.ste.model.DataPayload;
import com.innosalt.ste.model.ResponsePayload;
import com.innosalt.ste.model.TR;
import com.innosalt.ste.model.TR.Body;
import com.innosalt.ste.model.TR.Header;
import com.innosalt.ste.util.AES256Util;
import com.innosalt.ste.util.SHA256Util;
import com.innosalt.ste.util.UserIdenUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class UserService {
	private final UserMapper userMapper;
	private final UserIdenUtil userIdenUtil;
	private final MCAJsonService mcaService;

	@Value("${api.encrypt.secretKey}")
	private String secretKey;

	@Value("${api.identity.key_info}")
	private String keyInfo;

	@Value("${jwt.refresh.timeout}")
	private int refreshTimeout;

	/**
	 * 인증 체크. call by JWTUtil
	 * 
	 * @param user_sn
	 * @return UserDetail
	 */
	public UserDetail loadUserBySn(String user_sn) {
		return userMapper.loadUserBySn(user_sn);
	}
	
	/**
	 * 로그인
	 * 
	 * @param SignIn
	 * @return UserDetail
	 */
	public UserDetail loadUserByLogin(User.SignIn dto) {
		dto.setPasswordEncrypt(SHA256Util.encrypt(dto.getPassword(), dto.getId() + secretKey));

		UserDetail detail = userMapper.loadUserByLogin(dto);
		return detail;
	}

	/**
	 * 토큰 재발급
	 * 
	 * @param user_sn
	 * @return refreshToken
	 */
	public Map<String, Object> loadTokenBySn(String sn) {
		return userMapper.loadTokenBySn(sn);
	}

	/**
	 * 로그인 처리 공통
	 * @param map
	 */
	@Transactional
	public void saveLogin(Map<String, String> map) {
		userMapper.insertUserLogin(map);
		userMapper.deleteUserLoginRepo(map.get("sn"));
		userMapper.insertUserLoginRepo(map);
	}
	
	/**
	 * 리프레시토큰 만료 갱신
	 * @param sn
	 */
	public void refreshToken(String sn) {
		int c = userMapper.updateUserLoginRepo(sn);
		log.debug(String.format("[refresh token update] %s %d", sn, c));
	}

	/**
	 * 로그아웃
	 * 
	 * @param sn
	 */
	public void logout(String sn) {
		userMapper.deleteUserLoginRepo(sn);
		userMapper.refreshUserLoginRepo(refreshTimeout);
	}

	/**
	 * 내정보
	 * 
	 * @param user_sn
	 * @return MyInfo
	 * @throws Exception
	 */
	public User.MyInfo selectUserAcct(String user_sn) throws Exception {
		User.MyInfo myinfo = userMapper.selectUserAcct(user_sn);
		myinfo.setAcctNo(AES256Util.decrypt(myinfo.getAcctNoEncrypt(), user_sn + secretKey));
		return myinfo;
	}
	
	/**
	 * 내정보
	 * @param user_sn
	 * @return MyInfoDetail
	 * @throws Exception
	 */
	public User.MyInfoDetail selectUserDetail(String user_sn) throws Exception {
		User.MyInfoDetail myinfo = userMapper.selectUserDetail(user_sn);
		if(myinfo.getHpnoEncrypt() != null)
			myinfo.setHpno(AES256Util.decrypt(myinfo.getHpnoEncrypt(), user_sn + secretKey));
		return myinfo;
	}

	private mobileOKKeyManager keyInit() throws MobileOKException {
		mobileOKKeyManager mobileOK = new mobileOKKeyManager();
		try {
			/* 키파일은 반드시 서버의 안전한 로컬경로에 별도 저장. 웹URL 경로에 파일이 있을경우 키파일이 외부에 노출될 수 있음 주의 */
			mobileOK.keyInit(keyInfo, "krste123");
		} catch (MobileOKException e) {
			throw e;
		}
		return mobileOK;
	}

	private JSONObject getIdenResult(String encryptMOKKeyToken) throws CustomException {
		JSONObject decrpytResultJson = null;
		try {
			mobileOKKeyManager mobileOK = keyInit();
			String encryptMOKResult = userIdenUtil.mobileOK_result_request(encryptMOKKeyToken);
			decrpytResultJson = new JSONObject(mobileOK.getResultJSON(encryptMOKResult));
			log.debug(decrpytResultJson.toString());
		} catch (MobileOKException e) {
			throw new CustomException(ExceptionCode.IDENTITY_UNDEFIND_ERROR, e.getErrorCode() + "|" + e.getMessage());
		} catch (Exception e) {
			e.printStackTrace();
			throw new CustomException(ExceptionCode.IDENTITY_UNDEFIND_ERROR);
		}
		return decrpytResultJson;
	}

	/**
	 * 휴대폰 본인인증 요청
	 * 
	 * @param usage
	 * @return 요청시 필요한 JSON
	 * @throws MobileOKException
	 */
	public String identityRequest(String usage) throws MobileOKException {
		mobileOKKeyManager mobileOK = keyInit();
		// 이용기관 거래ID생성시 이용기관별 유일성 보장을 위해 설정, 이용기관식별자는 이용기관코드 영문자로 반드시 수정
		String clientPrefix = "KRSTE"; // 8자이내 권고 (예) MOK, TESTCOKR

		return userIdenUtil.mobileOK_std_request(mobileOK, clientPrefix, usage);
	}

	/**
	 * 가입
	 * 
	 * @param SignUp
	 * @param request
	 * @return ResponsePayload
	 */
	@Transactional
	public ResponsePayload signUp(User.SignUp dto, HttpServletRequest request) {
		try {
			// 아이디 중복체크
			if (userMapper.checkDuplicateId(dto.getId()) > 0)
				throw new CustomException(ExceptionCode.DUPLICATE_ID);

			// 핸드폰본인인증 결과 받아오기
			JSONObject userIdenMap = getIdenResult(dto.getIdenToken());

			dto.setDi(userIdenMap.optString("di", null));
			// 가입자 중복체크
			if (userMapper.selectUserByDi(dto.getDi()) != null)
				throw new CustomException(ExceptionCode.DUPLICATE_DI);

			dto.setCi(userIdenMap.optString("ci", null));
			dto.setName(userIdenMap.optString("userName", null));
			dto.setHpno(userIdenMap.optString("userPhone", null));
			dto.setBirth(userIdenMap.optString("userBirthday", null));
			dto.setGender(userIdenMap.optString("userGender", null));
			dto.setNation(userIdenMap.optString("userNation", null));

			// 가입SN 생성
			String userSn = userMapper.selectNextUsersn();
			dto.setSn(userSn);

			// 계좌생성
			Header h = Header.builder().svc_cd("SDL10013").pub_ip((String) request.getAttribute("X-Forwarded-For"))
					.pri_ip((String) request.getAttribute("X-Forwarded-For")).build();
			Map<String, String> map = new HashMap<String, String>();
//			map.put("usr_id", dto.getCi());
			map.put("usr_id", dto.getSn());
			map.put("ac_ccd", "01");
			map.put("ac_pwd", "0000");
			map.put("da_mnet", "60");
			map.put("ac_stmt_symbl", "ACXToken");
			map.put("mbr_cmpny_no", "00013");
			map.put("isng_ac_f", "N");

			TR sTR = TR.builder().header(h).body(Body.builder().input(map).build()).build();
			try {
				TR rTR = mcaService.getData(sTR);
				Map<String, String> mcaRetMap = rTR.getBody().getOutput();
				if (mcaRetMap.get("scss_f").equals("Y"))
					dto.setAcctNo(mcaRetMap.get("da_ac_no"));
				else
					throw new CustomException(ExceptionCode.MCA_OUTPUT_ERROR);
			} catch (JsonProcessingException e) {
				throw new CustomException(ExceptionCode.MCA_STRING_OUT_OF_BOUNDS);
			}

			// 암호화 처리
			try {
				dto.setCiEncrypt(AES256Util.encrypt(dto.getCi(), userSn + secretKey));
				dto.setHpnoEncrypt(AES256Util.encrypt(dto.getHpno(), userSn + secretKey));
				dto.setAcctNoEncrypt(AES256Util.encrypt(dto.getAcctNo(), userSn + secretKey));
				dto.setPasswordEncrypt(SHA256Util.encrypt(dto.getPassword(), dto.getId() + secretKey));
			} catch (Exception e) {
				throw new CustomException(ExceptionCode.ENCRYPT_EXCEPTION);
			}

			userMapper.insertUser(dto);
			userMapper.insertUserDetail(dto);
			userMapper.insertUserAcct(dto);
			userMapper.insertUserIdentity(dto);

		} catch (CustomException e) {
			return new ExceptionPayload(e.getExceptionCode(), e.getMessage());
		} catch (Exception e) {
			e.printStackTrace();
			return new ExceptionPayload(ExceptionCode.SERVER_EXCEPTION);
		}
		return new DataPayload(dto);
	}

	/**
	 * ID 찾기
	 * 
	 * @param FindId
	 * @return ResponsePayload
	 */
	public ResponsePayload findId(User.FindId dto) {
		Map<String, String> map = null;
		try {
			// 핸드폰본인인증 결과 받아오기
			JSONObject userIdenMap = getIdenResult(dto.getIdenToken());

			map = userMapper.selectUserByDi(userIdenMap.optString("di", null));
			if(map != null) map.remove("sn");
			else {
				map = new HashMap<String, String>();
				map.put("id", "");
			}
		} catch (CustomException e) {
			return new ExceptionPayload(e.getExceptionCode(), e.getMessage());
		} catch (Exception e) {
			e.printStackTrace();
			return new ExceptionPayload(ExceptionCode.SERVER_EXCEPTION);
		}
		return new DataPayload(map);
	}

	/**
	 * 비밀번호 재설정
	 * 
	 * @param FindPassword
	 * @return ResponsePayload
	 */
	public ResponsePayload resetPassword(User.FindPassword dto) {
		try {
			if (userMapper.checkNormalId(dto.getId()) < 1)
				throw new CustomException(ExceptionCode.NOT_NORMAL_ID);

			// 핸드폰본인인증 결과 받아오기
			JSONObject userIdenMap = getIdenResult(dto.getIdenToken());

			Map<String, String> map = userMapper.selectUserByDi(userIdenMap.optString("di", null));

			if (dto.getId().equals(map.get("id")) == false)
				throw new CustomException(ExceptionCode.UNMATCH_DI_ID,
						String.format("input[%s] di[%s]", dto.getId(), map.get("id")));

			dto.setSn(map.get("sn"));
			dto.setPasswordEncrypt(SHA256Util.encrypt(dto.getPassword(), dto.getId() + secretKey));

			userMapper.updatePassword(dto);
		} catch (CustomException e) {
			return new ExceptionPayload(e.getExceptionCode(), e.getMessage());
		} catch (Exception e) {
			e.printStackTrace();
			return new ExceptionPayload(ExceptionCode.SERVER_EXCEPTION);
		}
		return new DataPayload();
	}

	/**
	 * ID 중복체크
	 * 
	 * @param IdCheck
	 * @return ResponsePayload
	 */
	public ResponsePayload checkUserId(User.IdCheck dto) {
		if (dto.getUsage().equals("FINDID")) {
			if (userMapper.checkNormalId(dto.getId()) < 1)
				return new ExceptionPayload(ExceptionCode.NOT_NORMAL_ID);
		} else {
			if (userMapper.checkDuplicateId(dto.getId()) > 0)
				return new ExceptionPayload(ExceptionCode.DUPLICATE_ID);
		}
		return new DataPayload();
	}

	/**
	 * 즐겨찾기
	 */
	public List<String> selectFavoriteSymbols(String sn) {
		return userMapper.selectFavoriteSymbols(sn);
	}

	public int insertFavoriteSymbol(Map<String, String> map) {
		return userMapper.insertFavoriteSymbol(map);
	}

	public int deleteFavoriteSymbol(Map<String, String> map) {
		return userMapper.deleteFavoriteSymbol(map);
	}
	
	/**
	 * 기본정보 수정
	 * @param dto
	 */
	public int updateUserInfo(User.MyInfoDetail dto) {
		return userMapper.updateUserDetail(dto);
	}
	
	/**
	 * 회원 탈퇴
	 * @param user_sn
	 */
	public void deleteUser(String user_sn) {
		Map<String, Object> map = new HashMap<String, Object>();
		map.put("sn", user_sn);
		userMapper.deleteUser(map);
		System.out.println(map);
	}
	
}