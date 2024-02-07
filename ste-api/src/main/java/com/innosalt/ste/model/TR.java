package com.innosalt.ste.model;

import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TR {
	private Header header;
	private Body body;

	@Builder
	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class Header {
		@Builder.Default private String rqrs_cd = "S";
		private String svc_cd;
		private String guid;
		private String pub_ip;
		private String pri_ip;
		@Builder.Default private String mac_addr = "ab:cd:ef:gh:ij";
		@Builder.Default private String conn_media_cd = "cmeul";
	}
	
	@Builder
	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	@JsonInclude(JsonInclude.Include.NON_NULL)
	public static class Body {
		private Map<String, String> input;
		private Map<String, String> output;
		private Message message;
	}

	@ToString
	@Getter
	@Setter
	@AllArgsConstructor
	@NoArgsConstructor
	public static class Message {
		private String rt_cd;
		private String err_cd;
		private String err_msg;
	}
	
//	public String getJson(TR tr) {
//		ObjectMapper mapper = new ObjectMapper();
////		mapper.setSerializationInclusion(Include.NON_NULL);
//		String sendMessage = null;
//		try {
//			sendMessage = mapper.writeValueAsString(tr);
//		} catch (JsonProcessingException e) {
//			e.printStackTrace();
//		}
//		return sendMessage;
//	}
//	
//	public TR getTR(String json) {
//		ObjectMapper objectMapper = new ObjectMapper();
//		try {
//			return objectMapper.readValue(json, new TypeReference<TR>() {});
//		} catch (JsonProcessingException e) {
//			e.printStackTrace();
//		}
//		TR tr = new TR();
//		tr.getBody().getMessage().setRt_cd("ERROR");
//		return tr;
//	}
}
