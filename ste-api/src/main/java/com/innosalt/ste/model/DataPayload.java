package com.innosalt.ste.model;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ToString
@Getter
@Setter
public class DataPayload extends ResponsePayload {
	private Object data;

	public DataPayload(Object data) {
		setCode("R0000");
		this.data = data;
	}

	public DataPayload(String code, Object data) {
		setCode(code);
		this.data = data;
	}

	public DataPayload() {
		setCode("R0000");
	}
}
