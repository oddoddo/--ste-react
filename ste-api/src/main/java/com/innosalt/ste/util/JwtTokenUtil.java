package com.innosalt.ste.util;

import java.io.Serializable;
import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.MalformedJwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.SignatureException;
import io.jsonwebtoken.UnsupportedJwtException;
import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class JwtTokenUtil implements Serializable {
	private static final long serialVersionUID = -2550185165626007488L;

	@Value("${jwt.access.secret}")
	private String accessKey;

	@Value("${jwt.refresh.secret}")
	private String refreshKey;

	@Value("${jwt.access.timeout}")
	private long accessTimeout;

	@Value("${jwt.refresh.timeout}")
	private int refreshTimeout;

	private final UserDetailsService userDetailsService;

	public JwtTokenUtil(UserDetailsService userDetailsService) {
		this.userDetailsService = userDetailsService;
	}

	public String generateAccessToken(String strUser_sn) {
		Claims claims = Jwts.claims().setSubject("AccessToken");
		claims.put("user_sn", strUser_sn);
		return Jwts.builder().setClaims(claims).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + this.accessTimeout * 1000L))
				.signWith(SignatureAlgorithm.HS512, this.accessKey).compact();
	}

	public Authentication getAuthentication(String token) {
		String strUser_sn = (String) ((Claims) Jwts.parser().setSigningKey(this.accessKey).parseClaimsJws(token)
				.getBody()).get("user_sn");
		UserDetails userDetails = userDetailsService.loadUserByUsername(strUser_sn);
		return (Authentication) new UsernamePasswordAuthenticationToken(userDetails, null,
				userDetails.getAuthorities());
	}

	public String resolveAccessToken(HttpServletRequest request) {
		String bearerToken = request.getHeader("Authorization");
		if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer "))
			return bearerToken.substring(7, bearerToken.length());
		return null;
	}

	public boolean validateAccessToken(String jwtToken) {
		try {
			Jws<Claims> claims = Jwts.parser().setSigningKey(this.accessKey).parseClaimsJws(jwtToken);
			return !((Claims) claims.getBody()).getExpiration().before(new Date());
		} catch (SignatureException e) {
			log.error("Invalid JWT signature", (Throwable) e);
			return false;
		} catch (MalformedJwtException e) {
			log.error("Invalid JWT token", (Throwable) e);
			return false;
		} catch (ExpiredJwtException e) {
			log.error("Expired JWT token", (Throwable) e);
			return false;
		} catch (UnsupportedJwtException e) {
			log.error("Unsupported JWT token", (Throwable) e);
			return false;
		} catch (IllegalArgumentException e) {
			log.error("JWT claims string is empty.", e);
			return false;
		} catch (java.lang.Exception e) {
			return false;
		}
	}

	public String generateRefreshToken(String strUser_sn) {
		Claims claims = Jwts.claims().setSubject("RefreshToken");
		claims.put("user_sn", strUser_sn);
		return Jwts.builder().setClaims(claims).setIssuedAt(new Date(System.currentTimeMillis()))
				.setExpiration(new Date(System.currentTimeMillis() + this.refreshTimeout * 1000L))
				.signWith(SignatureAlgorithm.HS512, this.refreshKey).compact();
	}

	public String resolveRefreshToken(String token) {
		return (String) ((Claims) Jwts.parser().setSigningKey(this.refreshKey).parseClaimsJws(token).getBody())
				.get("user_sn");
	}
}
