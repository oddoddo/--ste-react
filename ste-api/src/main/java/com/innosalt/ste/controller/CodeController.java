package com.innosalt.ste.controller;

import java.util.HashMap;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.innosalt.ste.mca.MCAJsonService;
import com.innosalt.ste.model.DataPayload;
import com.innosalt.ste.model.TR;
import com.innosalt.ste.model.TR.Body;
import com.innosalt.ste.model.TR.Header;
import com.innosalt.ste.service.CodeService;

import io.swagger.annotations.Api;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import springfox.documentation.annotations.ApiIgnore;

@Api(tags = "공통")
@RestController
@RequestMapping
@RequiredArgsConstructor
@Slf4j
public class CodeController {

	private final CodeService codeService;
	private final MCAJsonService mcaService;

	@ApiIgnore
	@GetMapping({ "/healthcheck" })
	public String ping() {
		return "";
	}

	@Operation(summary = "[NoAuth] Code List", description = "코드 리스트", security = {})
	@SecurityRequirements(value = {})
	@GetMapping({ "/code" })
	public ResponseEntity<?> selectCode() {
		return ResponseEntity.ok().body(new DataPayload(codeService.selectCode()));
	}

	@ApiIgnore
	@GetMapping({ "/helloworld/ping" })
	public String helloworld() throws JsonProcessingException {
		log.info("------------------------------------------");
		Header h = Header.builder().svc_cd("PINGPONG").pub_ip("127.0.0.1").pri_ip("127.0.0.1")
				.svc_cd("12345678901234567890123456789012").build();

		Map<String, String> map = new HashMap<String, String>();
		map.put("Ask", "Ping");

		TR sTR = TR.builder().header(h).body(Body.builder().input(map).build()).build();
		TR rTR = mcaService.getData(sTR);
		return rTR.toString();
	}
}
