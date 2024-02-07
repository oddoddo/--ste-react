package com.innosalt.ste.dto;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import springfox.documentation.annotations.ApiIgnore;

@ApiIgnore
public class UserDetail implements UserDetails {
	private static final long serialVersionUID = 1L;

	private String sn;
	private String id;
	private String password;
	private List<String> roles = new ArrayList<>();
	private String status;

	// login
	public UserDetail(String sn, String id) {
		this.sn = sn;
		this.id = id;
	}
	
	// jwt
	public UserDetail(String sn, String id, String status) {
		this.sn = sn;
		this.id = id;
		this.status = status;
	}
	
	public UserDetail(String sn, String id, String password, List<String> roles) {
		this.sn = sn;
		this.id = id;
		this.password = password;
		this.roles = roles;
	}

	public String getSn() {
		return this.sn;
	}

	public String getId() {
		return this.id;
	}

	public List<String> getRoles() {
		return this.roles;
	}

	public void setRoles(List<String> roles) {
		this.roles = roles;
	}
	
	public void setPasswordEncrypt(String password) {
		this.password = password;
	}
	
	public String getStatus() {
		return this.status;
	}

	// add implements
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return (Collection<? extends GrantedAuthority>) this.roles.stream()
				.map(org.springframework.security.core.authority.SimpleGrantedAuthority::new)
				.collect(Collectors.toList());
	}

	public String getPassword() {
		return this.password;
	}

	public String getUsername() {
		return this.id;
	}

	public boolean isAccountNonExpired() {
		return true;
	}

	public boolean isAccountNonLocked() {
		return true;
	}

	public boolean isCredentialsNonExpired() {
		return true;
	}

	public boolean isEnabled() {
		return true;
	}
}
