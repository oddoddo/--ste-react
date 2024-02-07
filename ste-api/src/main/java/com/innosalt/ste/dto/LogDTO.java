package com.innosalt.ste.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class LogDTO {
	private int seq;
	private String user_sn;
	private String req_url;
	private String req_method;
	private String params;
	private String ipaddr;
	private String code;
	private String message;
	private long excute_time;
}
