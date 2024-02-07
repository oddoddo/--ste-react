package com.innosalt.ste.filter;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import org.springframework.web.util.ContentCachingRequestWrapper;
import org.springframework.web.util.ContentCachingResponseWrapper;

@Component
@Order(1)
public class CustomServletWrappingFilter extends OncePerRequestFilter {
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
    ContentCachingRequestWrapper wrappingRequest = new ContentCachingRequestWrapper(request);
    ContentCachingResponseWrapper wrappingResponse = new ContentCachingResponseWrapper(response);
    chain.doFilter((ServletRequest)wrappingRequest, (ServletResponse)wrappingResponse);
    wrappingResponse.copyBodyToResponse();
  }
}
