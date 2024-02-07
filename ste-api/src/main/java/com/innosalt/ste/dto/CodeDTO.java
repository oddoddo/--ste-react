package com.innosalt.ste.dto;

import io.swagger.annotations.ApiModel;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@ApiModel("CodeDTO")
@Getter
@Setter
@ToString
public class CodeDTO {
	private String value;
	private String group_value;
	private String name;
	private String use_yn;
}
