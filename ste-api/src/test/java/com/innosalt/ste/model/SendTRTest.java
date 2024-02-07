package com.innosalt.ste.model;

import java.util.Map;

import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.innosalt.ste.mapper.UserMapper;

@AutoConfigureMockMvc
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@RunWith(SpringJUnit4ClassRunner.class)
class SendTRTest {
	@Autowired
	private UserMapper userMapper;

//	@Test
//	void test() throws JsonProcessingException {
//		Header h = Header.builder().svc_cd("SDL10013").pub_ip("127.0.0.1").pri_ip("127.0.0.1").build();
//		Map<String, String> map = new HashMap<String, String>();
//		map.put("usr_id", "ci");
//		map.put("ac_ccd", "01");
//		map.put("ac_pwd", "0000");
//		map.put("da_mnet", "60");
//		map.put("ac_stmt_symbl", "ACXToken");
//		map.put("mbr_cmpny_no", "00013");
//		map.put("isng_ac_f", "N");
//		
//		TR sTR = TR.builder().header(h).body(Body.builder().input(map).build()).build();
//		
//		ObjectMapper mapper = new ObjectMapper();
//		System.out.println(mapper.writeValueAsString(sTR));
		
//		String returnMessage = "{\"header\":{\"rqrs_cd\":\"R\",\"svc_cd\":\"SDL10013\",\"guid\":\"20231122103705000537000000000000\",\"pub_ip\":\"127.0.0.1\",\"pri_ip\":\"127.0.0.1\",\"mac_addr\":\"ab:cd:ef:gh:ij\",\"conn_media_cd\":\"cmeul\"},\"body\":{\"message\":{\"rt_cd\":\"0\",\"err_cd\":\"SUCCESS\",\"err_msg\":\"정상처리 되었습니다.\"},\"output\":{\"da_ac_no\":\"356243502601\",\"scss_f\":\"Y\",\"msg_cd\":\"00000\",\"msg_cntnt\":\"정상처리되었습니다.\"}}}";
//		ObjectMapper objectMapper = new ObjectMapper();
//		TR returnTR = objectMapper.readValue(returnMessage, new TypeReference<TR>() {
//		});
//		if (returnTR.getBody().getMessage().getRt_cd().equals("0"))
//			System.out.println(returnTR.getBody().getOutput());
//		else {
//			System.out.println("error");
//		}
//	}

	@Test
	void ttt() {
		Map<String, String> map = userMapper.selectUserByDi("MC0GCCqGSIb3DQIJAyEAsrPkeg9Rjl/ReyxAqomYe0f+eJYLPQCEDiTL42CbAfE=");
		System.out.println(map);
	}
}
