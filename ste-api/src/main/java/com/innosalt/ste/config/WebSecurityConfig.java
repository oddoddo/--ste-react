package com.innosalt.ste.config;

import java.io.OutputStream;

import javax.servlet.Filter;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.innosalt.ste.exception.ExceptionCode;
import com.innosalt.ste.exception.ExceptionPayload;
import com.innosalt.ste.filter.JwtRequestFilter;

import lombok.RequiredArgsConstructor;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
@RequiredArgsConstructor
public class WebSecurityConfig {
	private static final String[] SWAGGER_URI = new String[] { "/v3/api-docs", "/swagger-resources/**", "/swagger-ui/**" };
	private static final String[] PUBLIC_URI = new String[] { "/*/*signin", "/*/signup", "/users/verification/**", "/users/find/**" };
	private static final String[] PUBLIC_GET_URI = new String[] { "/exception/**", "/helloworld/**", "/actuator/health", "/code/**", "/healthcheck" };

	private final ObjectMapper objectMapper;
	private final JwtRequestFilter jwtRequestFilter;

	@Bean
	public WebSecurityCustomizer configure() {
		return web -> {

		};
	}

	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws java.lang.Exception {
		return http.httpBasic().disable().formLogin().disable().cors().and().csrf().disable().sessionManagement()
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().authorizeRequests()
				.antMatchers(SWAGGER_URI).permitAll().antMatchers(PUBLIC_URI).permitAll()
				.antMatchers(HttpMethod.GET, PUBLIC_GET_URI).permitAll().anyRequest().hasRole("USER")

				.and().addFilterBefore((Filter) this.jwtRequestFilter, UsernamePasswordAuthenticationFilter.class)
				.exceptionHandling().authenticationEntryPoint((request, response, authException) -> {
					response.setStatus(HttpStatus.OK.value());
					response.setContentType(MediaType.APPLICATION_JSON_VALUE);

					ExceptionPayload ex = new ExceptionPayload(ExceptionCode.NEED_AUTHENTICATION);
					if (request.getAttribute("error") != null)
						ex = (ExceptionPayload) request.getAttribute("error");
					System.out.println(">>>>>>>>>>>>>>>>>>" + ex.getCode());
					objectMapper.writeValue((OutputStream) response.getOutputStream(), ex);
				}).and().build();
	}

//	@Bean
//	public FilterRegistrationBean<CorsFilter> corsFilterRegistrationBean() {
//		CorsConfiguration config = new CorsConfiguration();
//		config.setAllowCredentials(false);
//		config.addAllowedOrigin("*");
//		config.addAllowedHeader("*");
//		config.addAllowedMethod("POST, GET, PUT, OPTIONS, DELETE");
//		config.setMaxAge(6000L);
//		UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//		source.registerCorsConfiguration("/**", config);
//		FilterRegistrationBean<CorsFilter> filterBean = new FilterRegistrationBean<>(new CorsFilter(source));
//		filterBean.setOrder(0);
//		return filterBean;
//	}
}