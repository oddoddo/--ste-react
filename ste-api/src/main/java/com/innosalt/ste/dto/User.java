package com.innosalt.ste.dto;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.innosalt.ste.validator.format.IsYnValid;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Hidden
@ApiModel(description = "회원 모델")
public class User {
	@Getter
	@Setter
	@ToString
	@Schema(description = "로그인")
	public static class SignIn {
		@ApiModelProperty(value = "ID", position = 1, required = true)
		@NotBlank
		private String id;

		@ApiModelProperty(value = "비밀번호", position = 2, required = true)
		@NotBlank
		private String password;

		@ApiModelProperty(value = "암호화된 비밀번호", hidden = true)
		private String passwordEncrypt;

		@ApiModelProperty(value = "refreshToken", hidden = true)
		private String token;
	}

	@Getter
	@Setter
	@ToString
	public static class SignUp {
		@ApiModelProperty(value = "ID", position = 0, required = true)
		@NotBlank
		private String id;

		@ApiModelProperty(value = "비밀번호", position = 1, required = true)
		@NotBlank
		private String password;

		@ApiModelProperty(value = "mobile-ok로 보낼 인증토큰", position = 2, required = true)
		@NotBlank
		private String idenToken;

		@ApiModelProperty(value = "약관1", required = true, allowableValues = "Y")
		@IsYnValid(message = "유효한 값이 아닙니다 (Y, N)")
		private String term1;
		@ApiModelProperty(value = "약관2", required = true, allowableValues = "Y")
		@IsYnValid(message = "유효한 값이 아닙니다 (Y, N)")
		private String term2;
		@ApiModelProperty(value = "약관3", required = true, allowableValues = "Y")
		@IsYnValid(message = "유효한 값이 아닙니다 (Y, N)")
		private String term3;
		@ApiModelProperty(value = "약관4", required = true, allowableValues = "Y")
		@IsYnValid(message = "유효한 값이 아닙니다 (Y, N)")
		private String term4;
		@ApiModelProperty(value = "약관5", required = true, allowableValues = "Y")
		@IsYnValid(message = "유효한 값이 아닙니다 (Y, N)")
		private String term5;

		@ApiModelProperty(value = "CI", hidden = true)
		private String ci;

		@ApiModelProperty(value = "DI", hidden = true)
		private String di;

		@ApiModelProperty(value = "휴대폰번호", hidden = true)
		private String hpno;

		@ApiModelProperty(value = "성명", hidden = true)
		private String name;

		@ApiModelProperty(value = "생년월일", hidden = true)
		private String birth;

		@ApiModelProperty(value = "성별 1남자 2여자", hidden = true)
		private String gender;

		@ApiModelProperty(value = "내외국인 0내국인 1외국인", hidden = true)
		private String nation;

		@ApiModelProperty(value = "암호화된 비밀번호", hidden = true)
		private String passwordEncrypt;

		@ApiModelProperty(value = "암호화된 CI", hidden = true)
		private String ciEncrypt;

		@ApiModelProperty(value = "암호화된 핸드폰번호", hidden = true)
		private String hpnoEncrypt;

		@ApiModelProperty(name = "User Unique Id", hidden = true)
		private String sn;

		@ApiModelProperty(name = "계좌번호", hidden = true)
		private String acctNo;

		@ApiModelProperty(value = "암호화된 계좌번호", hidden = true)
		private String acctNoEncrypt;
	}

	@Getter
	@Setter
	@ToString
	public static class IdCheck {
		@ApiModelProperty(value = "ID", position = 1, required = true)
		@NotBlank
		private String id;

		@ApiModelProperty(value = "사용용도, 회원가입:SIGNUP, 아이디찾기:FINDID", position = 2, required = true)
		@NotBlank
		private String usage = "SIGNUP";
	}

	@Getter
	@Setter
	@ToString
	public static class FavoriteSymbol {
		@ApiModelProperty(value = "단축코드", required = true)
		@NotBlank
		private String symbol;
	}

	@Getter
	@Setter
	@ToString
	public static class MyInfo {
		@ApiModelProperty(value = "ID")
		private String id;

		@ApiModelProperty(value = "성명")
		private String name;

		@ApiModelProperty(value = "계좌번호")
		private String acctNo;

		@ApiModelProperty(value = "DB상 암호화된 계좌번호", hidden = true)
		@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
		private String acctNoEncrypt;
	}

	@Getter
	@Setter
	@ToString
	public static class FindId {
		@ApiModelProperty(value = "mobile-ok로 보낼 인증토큰", position = 1, required = true)
		@NotBlank
		private String idenToken;
	}

	@Getter
	@Setter
	@ToString
	public static class FindPassword {
		@ApiModelProperty(value = "mobile-ok로 보낼 인증토큰", position = 1, required = true)
		@NotBlank
		private String idenToken;

		@ApiModelProperty(value = "ID", position = 2, required = true)
		@NotBlank
		private String id;

		@ApiModelProperty(value = "비밀번호", position = 3, required = true)
		@NotBlank
		private String password;

		@ApiModelProperty(value = "암호화된 비밀번호", hidden = true)
		private String passwordEncrypt;

		@ApiModelProperty(value = "SN", hidden = true)
		private String sn;
	}

	@Getter
	@Setter
	@ToString
	public static class MyInfoDetail {
		@ApiModelProperty(value = "sn", hidden = true)
		@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
		private String sn;

		@ApiModelProperty(value = "ID")
		@JsonProperty(access = JsonProperty.Access.READ_ONLY)
		private String id;

		@ApiModelProperty(value = "성명")
		@JsonProperty(access = JsonProperty.Access.READ_ONLY)
		private String name;

		@ApiModelProperty(value = "휴대폰번호")
		@JsonProperty(access = JsonProperty.Access.READ_ONLY)
		private String hpno;

		@ApiModelProperty(value = "암호화된 핸드폰번호", hidden = true)
		@JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
		private String hpnoEncrypt;
		
		@ApiModelProperty(value = "email")
		@Email
		private String email;

		@ApiModelProperty(value = "집/회사")
		private String addr_type;

		@ApiModelProperty(value = "주소")
		private String addr;

		@ApiModelProperty(value = "상세주소")
		private String addr_detail;

	}
}
