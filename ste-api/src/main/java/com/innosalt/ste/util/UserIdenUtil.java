package com.innosalt.ste.util;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.dreamsecurity.json.JSONObject;
import com.dreamsecurity.mobileOK.MobileOKException;
import com.dreamsecurity.mobileOK.mobileOKKeyManager;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class UserIdenUtil {
	@Value("${api.identity.req_url}")
	private String reqUrl;

	@Value("${api.identity.mok_url}")
	private String mokUrl;

	/**
	 * 본인확인-표준창 인증요청 페이지 생성
	 * 
	 * @param mobileOK
	 * @param clientPrefix
	 * @return HTML
	 */
	public String mobileOK_std_request(mobileOKKeyManager mobileOK, String clientPrefix, String usageCode) {
		Calendar cal = Calendar.getInstance();
		SimpleDateFormat formatter = new SimpleDateFormat("yyyyMMddHHmmss");

		/* 1. 본인확인-표준창 거래요청정보 생성 */

		/* 1.1 이용기관 거래ID 생성, 20자 이상 40자 이내 이용기관 고유 트랜잭션ID (예시) 이용기관식별자+UUID, ... */
		// - 본인확인-표준창 거래ID 는 유일한 값이어야 하며 기 사용한 거래ID가 있는 경우 오류 발생
		// - 이용기관이 고유식별 ID로 유일성을 보장할 경우 고객이 이용하는 ID사용 가능
		String clientTxId = clientPrefix + UUID.randomUUID().toString().replaceAll("-", "");

		/* 1.2 인증 결과 검증을 위한 거래 ID 세션 저장 (권고) */
		// 동일한 세션내 요청과 결과가 동일한지 확인 및 인증결과 재사용 방지처리, "MOKResult" 응답결과 처리시 필수 구현
//		session.setAttribute("sessionClientTxId", clientTxId);

		/* 1.3 거래 ID, 인증 시간을 통한 본인확인 거래 요청 정보 생성 */
		String reqClientInfo = clientTxId + "|" + formatter.format(cal.getTime());

		/* 1.4 생성된 거래정보 암호화 */
		String encryptReqClientInfo;
		try {
			encryptReqClientInfo = mobileOK.RSAEncrypt(reqClientInfo);
		} catch (MobileOKException e) {
			return e.getErrorCode() + "|" + e.getMessage();
		}

		/* 1.5 거래 요청 정보 JSON 생성 */
		JSONObject jsonObject = new JSONObject();
		/* 본인확인 서비스 용도 */
		/*
		 * 01001 : 회원가입, 01002 : 정보변경, 01003 : ID찾기, 01004 : 비밀번호찾기, 01005 : 본인확인용,
		 * 01006 : 성인인증, 01007 : 상품구매/결제, 01999 : 기타
		 */
		jsonObject.put("usageCode", usageCode);
		/* 본인확인 이용기관 서비스 ID (키파일에 serviceId 포함 됨) */
		jsonObject.put("serviceId", mobileOK.getServiceId());
		/* 암호화된 본인확인 거래 요청 정보 */
		jsonObject.put("encryptReqClientInfo", encryptReqClientInfo);
		/* 이용상품 코드 */
		/* 이용상품 코드, telcoAuth : 휴대폰본인확인 (SMS인증시 인증번호 발송 방식 “SMS”) */
		/* 이용상품 코드, telcoAuth-LMS : 휴대폰본인확인 (SMS인증시 인증번호 발송 방식 “LMS”) */
		jsonObject.put("serviceType", "telcoAuth");

		/* 본인확인 결과 타입 */
		/* 본인확인 결과 타입, "MOKToken" : 개인정보 응답결과를 이용기관 서버에서 본인확인 서버에 요청하여 수신 후 처리 */
		/*
		 * 본인확인 결과 타입, "MOKResult" : 개인정보 응답결과를 이용자 브라우져로 수신 후 처리 (이용시 반드시 재사용 방지처리 개발)
		 */
		jsonObject.put("retTransferType", "MOKToken");
		// jsonObject.put("retTransferType", "MOKResult");
		/* 본인확인 결과 수신 URL "https://" 포함한 URL 입력 */
		jsonObject.put("returnUrl", mokUrl); // 결과 수신 후 전달 URL 설정

		/* 1.6 거래 요청 정보 JSON 반환 */
		return jsonObject.toString();
	}

	/**
	 * 본인확인-표준창 검증결과 복호화
	 * 
	 * @param encryptMOKKeyToken 검증결과 요청타입이 MOKToken 일때 응답값
	 * @return 본인확인-표준창 결과 복호화 JSON 정보 siteID 이용기관(이용기관)이 사이트 ID clientTxId
	 *         이용기관(이용기관)이 발급한 거래 ID txId 휴대폰본인확인서버가 발급한 거래 ID providerId 사용자 이동통신사
	 *         구분 ID - “SKT” - “KT” - “LGU” - “SKTMVNO” - “KTMVNO” - “LGUMVNO”
	 *         serviceType 본인확인 요청 서비스 타입 ci 주민등록번호 대체 개인 식별 연동정보 CI(Connecting
	 *         Information) di 이용기관 중복 확인 정보 DI(Duplication Information) userName
	 *         사용자 이름 userPhone 사용자 전화번호 userBirthday 사용자 생년월일 userGender 사용자 성별 -
	 *         “1” : 남자 - “2”: 여자 userNation 사용자 내외국인 정보 - “0” : 내국인 - “1”: 외국인
	 *         reqdate 본인확인 거래요청시간 issuer 본인확인 처리 서버 ID issueDate 발급일 (yyyy-mm-dd
	 *         hh:mm:ss.mis)
	 */
	public String mobileOK_result_request(String encryptMOKKeyToken) {
//		HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
//		factory.setConnectTimeout(10 * 1000);
//		// factory.setReadTimeout(10*1000);
//		RestTemplate restTemplate = new RestTemplate(factory);
//
//		HttpHeaders headers = new HttpHeaders();
//		headers.setContentType(MediaType.APPLICATION_JSON);
//
//		JSONObject parameter = new JSONObject();
//		parameter.put("encryptMOKKeyToken", encryptMOKKeyToken);
//
//		HttpEntity<String> req = new HttpEntity<>(parameter.toString(), headers);
//		RestTemplate client = new RestTemplate();
//		ResponseEntity<JSONObject> responseEntity = client.postForEntity(reqUrl, req, JSONObject.class);
//
//		log.info("API call finish. Received data from api...");
//		log.info("--- data ResponseEntity : {}", responseEntity);
//
//		JSONObject responseJSON = responseEntity.getBody();
//		log.info("Received Data : {}", responseJSON.toString());
//		
//		return responseJSON.getString("encryptMOKResult");
		JSONObject requestData = new JSONObject();
		requestData.put("encryptMOKKeyToken", encryptMOKKeyToken);
		String responseData = sendPost(reqUrl, requestData.toString());
		log.debug(reqUrl);
		log.debug(requestData.toString());
		log.debug("----------------------");
		log.debug(responseData);
		log.debug("----------------------");
		if (responseData == null) {
			log.error("-1|본인확인 MOKToken 인증결과 응답이 없습니다.");
		}
		JSONObject responseJSON = new JSONObject(responseData);
		return responseJSON.getString("encryptMOKResult");
	}

	private String sendPost(String dest, String jsonData) {
		HttpURLConnection connection = null;
		DataOutputStream dataOutputStream = null;
		BufferedReader bufferedReader = null;
		try {
			URL url = new URL(dest);
			connection = (HttpURLConnection) url.openConnection();
			connection.setRequestMethod("POST");
			connection.setRequestProperty("Content-Type", "application/json;charset=UTF-8");
			connection.setDoOutput(true);

			dataOutputStream = new DataOutputStream(connection.getOutputStream());
			dataOutputStream.write(jsonData.getBytes("UTF-8"));

			bufferedReader = new BufferedReader(new InputStreamReader(connection.getInputStream()));
			StringBuffer responseData = new StringBuffer();
			String info;
			while ((info = bufferedReader.readLine()) != null) {
				responseData.append(info);
			}
			return responseData.toString();
		} catch (FileNotFoundException e) {
			// Error Stream contains JSON that we can parse to a FB error
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (bufferedReader != null) {
					bufferedReader.close();
				}

				if (dataOutputStream != null) {
					dataOutputStream.close();
				}

				if (connection != null) {
					connection.disconnect();
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return null;
	}
}
