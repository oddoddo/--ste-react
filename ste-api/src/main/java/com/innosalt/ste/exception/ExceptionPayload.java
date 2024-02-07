package com.innosalt.ste.exception;

import com.innosalt.ste.model.ResponsePayload;

import lombok.Getter;

@Getter
public class ExceptionPayload extends ResponsePayload {
	private String message;

	public ExceptionPayload(String code) {
		setCode(code);
	}
	
	public ExceptionPayload(ExceptionCode code) {
		setCode(code.getCode());
	}

	public ExceptionPayload(ExceptionCode code, String message) {
		setCode(code.getCode());
		this.message = message;
	}
}
