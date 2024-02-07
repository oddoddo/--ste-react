package com.innosalt.ste.interceptor;

import java.util.Enumeration;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.lang.Nullable;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.innosalt.ste.dto.LogDTO;
import com.innosalt.ste.service.CodeService;
import com.innosalt.ste.service.UserService;
import com.innosalt.ste.util.CommUtil;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
@RequiredArgsConstructor
public class CustomInterceptor implements HandlerInterceptor {
	private final CodeService codeService;
	private final UserService userService;
	private final ObjectMapper objectMapper;

	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		log.info("[preHandle][" + request + "]" + "[" + request.getMethod() + "]" + request.getRequestURI()
				+ getParameters(request));
		long startTime = System.currentTimeMillis();
		request.setAttribute("startTime", startTime);
		return true;
	}

	public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
			@Nullable ModelAndView modelAndView) throws Exception {
		/***
		 * View를 렌더링하기 전에 postHandle 메소드가 호출된다. 그렇기 때문에 modelAndView 정보를 알 수 있다. 특정
		 * View에 modelAndView 값을 수정해야할 필요가 있다면 postHandle 메소드에서 작업이 이뤄지면 된다.
		 */
		log.info("[postHandle][" + request + "]");
	}

	public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler,
			@Nullable Exception ex) throws Exception {
		/***
		 * 클라이언트에게 최종적으로 Response를 전달하기 전에 호출되는 afterCompletion 메소드에는 Exception 정보가
		 * 담겨온다. 그렇기 때문에 afterCompletion 메소드에서는 response의 값을 Control 하거나 Exception 값에 따른
		 * 핸들링을 하면 된다.
		 */
		LogDTO dto = new LogDTO();
		dto.setIpaddr(CommUtil.getRemoteAddr(request));

		String user_sn = (String) request.getAttribute("user_sn");
		if (user_sn != null)
			dto.setUser_sn(user_sn);

		String method = request.getMethod();
		dto.setReq_method(method);

		String request_url = request.getRequestURI();
		if (method.toUpperCase().equals("GET")) {
			if (request.getQueryString() != null) {
				request_url += "?" + request.getQueryString();
			}
		} else {
			try {
				final ContentCachingRequestWrapper cachingRequest = (ContentCachingRequestWrapper) request;
				if (cachingRequest.getContentAsByteArray().length > 0) {
					String value;
					try {
						// content-type JSON이 아닌 경우 readTree에서 에러 발생
						value = objectMapper.readTree(cachingRequest.getContentAsByteArray()).toString();
					} catch (JsonParseException e) {
						value = new String(cachingRequest.getContentAsByteArray());
					}
					if (value.length() > 10000) {
						value = value.substring(0, 10000);
					}
					dto.setParams(value);
				}
			} catch (ClassCastException cce) {
			}
		}
		dto.setReq_url(request_url);

		if (response.getStatus() == 404) {
			dto.setCode("404");
		} else if (response.getContentType().indexOf("image") >= 0
				|| response.getContentType().indexOf("download") >= 0) {
			dto.setCode("200");
			dto.setMessage(response.getContentType());
		} else if (response.getContentType().indexOf("json") >= 0) {
			final ContentCachingResponseWrapper cachingResponse = (ContentCachingResponseWrapper) response;
			if (cachingResponse.getContentAsByteArray().length > 0) {
				JsonNode json = objectMapper.readTree(cachingResponse.getContentAsByteArray());
				if (json.get("code") != null) {
					String code = json.get("code").asText();
					dto.setCode(code);
					if (!code.equals("R0000")) {
						String message = json.get("message").asText();
						if (message != null && !message.equals("")) {
							dto.setMessage(message);
						}
						if (ex != null) {
							dto.setMessage(message + " " + CommUtil.getPrintStackTrace(ex));
						}
					}
				}
			}
		}

		long startTime = (long) request.getAttribute("startTime");
		long endTime = System.currentTimeMillis();
		long executeTime = endTime - startTime;
		dto.setExcute_time(executeTime);

		if (request_url.indexOf("/healthcheck") == -1) {
			codeService.insertLog(dto);
			if (dto.getUser_sn() != null) {
				userService.refreshToken(dto.getUser_sn());
			}
		}

		log.info("[afterCompletion][" + request + "][exception: " + ex + "]");
	}

	private String getParameters(HttpServletRequest request) {
		StringBuffer posted = new StringBuffer();
		Enumeration<?> e = request.getParameterNames();
		if (e != null)
			posted.append("?");
		while (e.hasMoreElements()) {
			if (posted.length() > 1)
				posted.append("&");
			String curr = (String) e.nextElement();
			posted.append(String.valueOf(curr) + "=");
			if (curr.contains("password") || curr.contains("pass") || curr.contains("pwd")) {
				posted.append("*****");
				continue;
			}
			posted.append(request.getParameter(curr));
		}
		String ip = request.getHeader("X-FORWARDED-FOR");
		String ipAddr = (ip == null) ? CommUtil.getRemoteAddr(request) : ip;
		if (ipAddr != null && !ipAddr.equals(""))
			posted.append("&_psip=" + ipAddr);
		return posted.toString();
	}

}
