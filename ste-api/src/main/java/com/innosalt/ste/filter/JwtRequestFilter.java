package com.innosalt.ste.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.annotation.Order;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.innosalt.ste.dto.UserDetail;
import com.innosalt.ste.exception.ExceptionCode;
import com.innosalt.ste.exception.ExceptionPayload;
import com.innosalt.ste.util.JwtTokenUtil;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
@Order(2)
public class JwtRequestFilter extends OncePerRequestFilter {

	@Autowired
	private JwtTokenUtil jwtTokenUtil;

	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
			throws ServletException, IOException {
		String jwtToken = jwtTokenUtil.resolveAccessToken(request);
		log.debug("[token] " + jwtToken);
		// validateAccessToken, getAuthentication 에서 발생한 모든 에러는 0102로 처리
		if (jwtToken != null && jwtTokenUtil.validateAccessToken(jwtToken)) {
			Authentication authentication = jwtTokenUtil.getAuthentication(jwtToken);
			UserDetail user = (UserDetail) authentication.getPrincipal();
			if (user.getStatus().equals("WITHDRAW")) {
				request.setAttribute("error", new ExceptionPayload(ExceptionCode.WITHDRAW_DI));
			} else {
				SecurityContextHolder.getContext().setAuthentication(authentication);
				request.setAttribute("user_sn", user.getSn());
			}
		}

		chain.doFilter((ServletRequest) request, (ServletResponse) response);
	}
}
