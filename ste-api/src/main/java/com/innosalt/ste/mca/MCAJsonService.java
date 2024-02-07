package com.innosalt.ste.mca;

import java.io.UnsupportedEncodingException;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.TimeoutException;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.innosalt.ste.exception.CustomException;
import com.innosalt.ste.exception.ExceptionCode;
import com.innosalt.ste.exception.MCAException;
import com.innosalt.ste.model.TR;

import io.netty.handler.timeout.ReadTimeoutException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
@RequiredArgsConstructor
public class MCAJsonService {
	private final ConnectionFactory connectionFactory;
	private int DEFAULT_TIMEOUT = 12;

	public TR getData(TR tr) throws JsonProcessingException {
		return getData(tr, this.DEFAULT_TIMEOUT);
	}

	public TR getData(TR inputTR, int timeout) {
		TR outputTR = null;
		boolean bRetry = false;
		NettyClient nettyClient = null;

		try {
			nettyClient = new NettyClient(this.connectionFactory);
			try {
				outputTR = callMCAService(nettyClient, inputTR, timeout);
			} catch (StringIndexOutOfBoundsException siobe1) {
				log.debug("StringIndexOutOfBoundsException is caught");
				siobe1.printStackTrace();
				nettyClient.close();
				if (bRetry) {
					logStringIndexOutofBound(inputTR, siobe1);
					try {
						Thread.sleep(1000L);
						outputTR = callMCAService(nettyClient, inputTR, timeout);
					} catch (StringIndexOutOfBoundsException siobe2) {
						nettyClient.close();
						logStringIndexOutofBound(inputTR, siobe2);
						Thread.sleep(1000L);
						outputTR = callMCAService(nettyClient, inputTR, timeout);
					}
				}
			} catch (java.lang.Exception e) {
				nettyClient.close();
				if (bRetry) {
					Thread.sleep(1000L);
					outputTR = callMCAService(nettyClient, inputTR, timeout);
				}
			}
		} catch (StringIndexOutOfBoundsException siobe) {
			if (nettyClient != null)
				nettyClient.close();
			throw logStringIndexOutofBound(inputTR, siobe);
		} catch (ReadTimeoutException rte) {
			if (nettyClient != null)
				nettyClient.close();
			String trId = inputTR.getHeader().getSvc_cd();
			String exceptionMessage = rte.toString();
			log.error(String.format("ReadTimeoutException : TR  [%s], ERROR [%s]",
					new Object[] { trId, exceptionMessage }));
			throw new MCAException(ExceptionCode.MCA_READ_TIMEOUT, trId, exceptionMessage);
		} catch (java.lang.Exception e) {
			e.printStackTrace();
			if (nettyClient != null)
				nettyClient.close();
			String trId = inputTR.getHeader().getSvc_cd();
			String exceptionMessage = e.toString();
			log.error(String.format("Exception : TR  [%s], ERROR [%s]", new Object[] { trId, exceptionMessage }));
			throw new MCAException(ExceptionCode.MCA_UNDEFIND_ERROR, trId, exceptionMessage);
		}
		return outputTR;
	}

	private MCAException logStringIndexOutofBound(TR tr, StringIndexOutOfBoundsException siobe) {
		String trId = tr.getHeader().getSvc_cd();
		String exceptionMessage = siobe.toString();
		log.error(String.format("StringIndexOutOfBoundsException : TR  [%s], ERROR [%s]",
				new Object[] { trId, exceptionMessage }));
		return new MCAException(ExceptionCode.MCA_STRING_OUT_OF_BOUNDS, trId, exceptionMessage);
	}

	private TR callMCAService(NettyClient nettyClient, TR tr, int timeout)
			throws InterruptedException, ExecutionException, TimeoutException, UnsupportedEncodingException,
			JsonMappingException, JsonProcessingException, CustomException {
		CompletableFuture<String> future = nettyClient.send(tr);
		String returnMessage = future.get(timeout, TimeUnit.SECONDS);
		ObjectMapper objectMapper = new ObjectMapper();
		TR returnTR = objectMapper.readValue(returnMessage, new TypeReference<TR>() {
		});
		if (returnTR.getBody().getMessage().getRt_cd().equals("0"))
			return returnTR;
		else {
			log.error(returnTR.toString());
			throw new CustomException(ExceptionCode.MCA_OUTPUT_ERROR);
		}
	}
}
