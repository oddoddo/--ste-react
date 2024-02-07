package com.innosalt.ste.exception;

import com.innosalt.ste.exception.ExceptionCode;

public enum ExceptionCode {
  FAIL_AUTHENTICATION("R0101", "인증에 실패했습니다."),
  NEED_AUTHENTICATION("R0102", "인증이 필요합니다."),
  
  MCA_READ_TIMEOUT("R0201", "MCA ReadTimeout"),
  MCA_STRING_OUT_OF_BOUNDS("R0202", "MCA StringIndexOutofBound"),
  MCA_UNDEFIND_ERROR("R0203", "MCA Undefind Error"),
  MCA_OUTPUT_ERROR("R0204", "MCA Output Error"),
  
  DUPLICATE_ID("R0301", "Duplicate ID"),
  IDENTITY_UNDEFIND_ERROR("R0302", "Identity System Error"),
  DUPLICATE_DI("R0303", "중복된 가입자입니다"),
  WITHDRAW_DI("R0304", "탈퇴 회원"),
  UNMATCH_DI_ID("R0305", "비번 재설정 중 아이디 불일치"),
  NOT_NORMAL_ID("R0306", "탈퇴한 아이디"),

  INVALID_INPUT_VALUE("R9991", "Invalid input value."),
  ENCRYPT_EXCEPTION("R9998", "암호화 오류"),
  SERVER_EXCEPTION("R9999", "서버 오류"),
  CUSTOM_EXCEPTION_SAMPLE("RCODE", "Custom Exception Sample");
  
  public String getDiscription() {
    return this.discription;
  }
  
  public String getCode() {
    return this.code;
  }
  
  private final String code;
  private final String discription;
  
  ExceptionCode(String code, String discription) {
    this.code = code;
    this.discription = discription;
  }
}
