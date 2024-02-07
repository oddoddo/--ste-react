package com.innosalt.ste.exception;

public class CustomException extends RuntimeException {
	ExceptionCode exceptionCode;
	String message = "";

	public CustomException(ExceptionCode exceptionCode) {
		this.exceptionCode = exceptionCode;
	}

	public CustomException(ExceptionCode exceptionCode, String message) {
		this.exceptionCode = exceptionCode;
		this.message = message;
	}

	public ExceptionCode getExceptionCode() {
		return this.exceptionCode;
	}
}
