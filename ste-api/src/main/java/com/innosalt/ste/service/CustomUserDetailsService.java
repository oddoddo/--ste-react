package com.innosalt.ste.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.innosalt.ste.dto.UserDetail;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {
	private final UserService userService;

	public UserDetail loadUserByUsername(String user_sn) throws UsernameNotFoundException {
		UserDetail user = userService.loadUserBySn(user_sn);

		if (user != null) {
			List<String> list = new ArrayList<>();
			list.add("ROLE_USER");
			user.setRoles(list);
		}
		return user;
	}
}
