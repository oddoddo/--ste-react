package com.innosalt.ste.config;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
import java.net.HttpURLConnection;
import java.net.URL;

import org.junit.jupiter.api.Test;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

import com.dreamsecurity.json.JSONObject;

class WebSecurityConfigTest {

	@Test
	void test() throws UnsupportedEncodingException {
//		String result = "%257B%2522encryptMOKKeyToken%2522%253A%2522%255BXn%252F%252BoFQ786PkcPrwvAYltHJU%252BA%252Bn0OFebRO7O9hDe%252F0l3Sg8CpD3PvIXRIYe8I55U2bWXLafSSR7%252FlBKNLyhhZWi6sTAD%252FH2jbuiz0hBLKltzmdtfy%252F75peh74bF%252FOMKTFQuzzSwSdif1lMtLFXcEVsqF8Pe0m2D4SWRLBJcEcI%252B6aUL%252BcittpbbhWQV5bi0FSZgPcQ2DaRWkgI0BXhXpz6Rdq4sCEdLZuXhjobhOn17QQ3L4v%252FefHQ%252BSuHPK9urScfRpAYbeP6ikR9Rd0cWNPBRHawnBWvNx1CpdnMSATdvAJQEUDhEm9LKm%252FHWRMVXykExM9b7P4B5HGF6zp8vkRMgpcJpaS0rcX55n%252BzV6r1R9rQSNRK8cFxXrXJ7%252F5OZP1DZO7iTDsUszr7JREks9r08hEP5pgAexkLbGPvQn0ojZb7kPBGlg4iyRSRakK8M2PpGBUYvB%252B6MxBUwTc5IGV9TClgu9aKsJ%252BBvt2%252FWw5jWZ4hSTQNmCdemB7lCm7n5ub2%252FL0JkzPvfeG%252B9I2lUiYfZJxBvM%252BlifmfWXYcFDV1%252B1ij8GZZVom7U9G6wIV6bZO5KVjmSrnufQae1amlKM5dC0ZEPY3EOg%252Be8JFFaECE%253D%2522%252C%2522resultCode%2522%253A%25222000%2522%252C%2522resultMsg%2522%253A%2522success%2522%257D";
//		result = URLDecoder.decode(result, "UTF-8");
//		System.out.println(result);
//		result = URLDecoder.decode(result, "UTF-8");
//		System.out.println(result);
//		JSONObject resultJSON = new JSONObject(result);
//		String encryptMOKKeyToken = resultJSON.optString("encryptMOKKeyToken", null);
//        String encryptMOKResult = resultJSON.optString("encryptMOKResult", null);
//        System.out.println("----------");
//        System.out.println(encryptMOKKeyToken);
//        System.out.println(encryptMOKResult);
		
//		HttpComponentsClientHttpRequestFactory factory = new HttpComponentsClientHttpRequestFactory();
//		factory.setConnectTimeout(10 * 1000);
//		// factory.setReadTimeout(10*1000);
//		RestTemplate restTemplate = new RestTemplate(factory);
//
//		HttpHeaders headers = new HttpHeaders();
//		headers.setContentType(MediaType.APPLICATION_JSON);
//
//		JSONObject parameter = new JSONObject();
//		parameter.put("encryptMOKKeyToken", "[Xn/ oFQ786PkcPrwvAYltHJU A n0OFebRO7O9hDe/0UF9dHmjXohDLgLC2qOfmn1cE8suKCUsQarGQYdKNNtrsOPX2l4LYrcf2x9iKHPvwJUdjSMR6VgJGb/Yr/HFyGYDeGfySz6ih8jcaeOJ0Fh3M7DLoBUODSUoA1gVHmjUb 0n20br/1S10jZFutHh7Dpww7DVCeRXjJl5iNrakdA7pFCYdrRQygtxQOFEhLduNYgXqnx7R982Y189Xat8Bs2zY3P36x3JYCVo6DSpugG01uTc fpurXZwc qYga8Pd2DZVBE5bXR57R ZF 5k0fZ03VdeIgInIYXS0uJjoi76HPDgGtgY3vhqmyo9XLAF/zoJv5xlQLtEjsDv/gia02djuvuOkv3/ktd9HZFDLgSByWAPLET8ADDgvgbbt0VQZoYlqR7Zo/N2neCbRUvMh/y2ntlWuIomOv HVPv6S9EiFELdjOO3//nS1s94aKR38H n8lseQiP5/s iZQ9wabnvnumFWLQu6UZ5OezLf9I5zZFZmtOvw DFg0M2m1Cz4EAhjf r22Zobw6TmiZxohPEsEwmkSBQZeypvfCKAuh8eiLdFFV3OWnyD5h4MB5m4=");
//
//		HttpEntity<String> req = new HttpEntity<>(parameter.toString(), headers);
//		RestTemplate client = new RestTemplate();
//		ResponseEntity<JSONObject> responseEntity = client.postForEntity("https://scert.mobile-ok.com/gui/service/v1/result/request", req, JSONObject.class);
//		System.out.println("API call finish. Received data from api...");
//		System.out.println("--- data ResponseEntity : {}" + responseEntity);
//
//		JSONObject responseJSON = responseEntity.getBody();
//		System.out.println("Received Data : {}" +responseJSON.toString());
		
		
//		JSONObject requestData = new JSONObject();
//        requestData.put("encryptMOKKeyToken", "[Xn/ oFQ786PkcPrwvAYltHJU A n0OFebRO7O9hDe/0UF9dHmjXohDLgLC2qOfmn1cE8suKCUsQarGQYdKNNtrsOPX2l4LYrcf2x9iKHPvwJUdjSMR6VgJGb/Yr/HFyGYDeGfySz6ih8jcaeOJ0Fh3M7DLoBUODSUoA1gVHmjUb 0n20br/1S10jZFutHh7Dpww7DVCeRXjJl5iNrakdA7pFCYdrRQygtxQOFEhLduNYgXqnx7R982Y189Xat8Bs2zY3P36x3JYCVo6DSpugG01uTc fpurXZwc qYga8Pd2DZVBE5bXR57R ZF 5k0fZ03VdeIgInIYXS0uJjoi76HPDgGtgY3vhqmyo9XLAF/zoJv5xlQLtEjsDv/gia02djuvuOkv3/ktd9HZFDLgSByWAPLET8ADDgvgbbt0VQZoYlqR7Zo/N2neCbRUvMh/y2ntlWuIomOv HVPv6S9EiFELdjOO3//nS1s94aKR38H n8lseQiP5/s iZQ9wabnvnumFWLQu6UZ5OezLf9I5zZFZmtOvw DFg0M2m1Cz4EAhjf r22Zobw6TmiZxohPEsEwmkSBQZeypvfCKAuh8eiLdFFV3OWnyD5h4MB5m4=\")");
//        String responseData = sendPost("https://scert.mobile-ok.com/gui/service/v1/result/request", requestData.toString());
//        System.out.println(responseData);
		
		String s = "%257B%2522encryptMOKKeyToken%2522%253A%2522%255BXn%252F%252BoFQ786PkcPrwvAYltHJU%252BA%252Bn0OFebRO7O9hDe%252F2KJJ2V4zfVZ4%252FE84e49mZhmfYvpW5TyIFQRpWKnLK0MfggCx%252FIX7rwx0ia%252BGmnuxKliS4O7UoRcXZIAK5YLfAfSYnVVbajSazMQ6FPGZjjOTJoBGZAjDvpxa3JbXjnEgrQOhxRsmQ7Bdj4e5OlCpgf4ZRMY8E5NoVY0SpecGbtjDBuCgzRLKKCJ2gBe%252F4F9elTMNjPFx5yufaELWwos3kspJRxZwQj09ObN8JiLFZGAg0Rcyuhx8HIZOuWqaJd4Dgu9maYCZw7MQIYCws04pMfX6B1j0qwdaZ24sNooRCFociJgR%252FhowbaWIJbPQs%252BJTVc27WkXPgWFWZnT3pFkTwFqZPaofiJKIFTYDUn1xdzF9qzhuwkJxpwROeO7RjxF9vNKrGbWhM%252BHq4F7HBSvYeW55rGIXPkPZQlYfdsBz6YwBhmJRCvbueKWDZTxKe76myzHWMJHBIsY8gOer6qXVKBfyYN7fRhQasgefk7UjWUe2nTeM4m79Rer0H09HJsDdBkc%252FoLpQ94C5tnZ7KFPT3U0wtK2CgmYX37fi0oBTuoQiTc9U7d6aJCl275OBEJmsE%253D%2522%252C%2522resultCode%2522%253A%25222000%2522%252C%2522resultMsg%2522%253A%2522success%2522%257D";
		
	}
	
	
	public String sendPost(String dest, String jsonData) {
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
