package com.innosalt.ste.exception;

public class MCAException extends RuntimeException {
  ExceptionCode exceptionCode;
  
  String trId;
  
  public MCAException(ExceptionCode exceptionCode, String trId) {
    this.exceptionCode = exceptionCode;
    this.trId = trId;
  }
  
  public ExceptionCode getExceptionCode() {
    return this.exceptionCode;
  }
  
  public String getTrId() {
    return this.trId;
  }
  
  public MCAException(ExceptionCode code, String trId, String message) {
    super(message);
    this.exceptionCode = code;
    this.trId = trId;
  }
}
