package com.innosalt.ste.mca;

import java.io.ByteArrayOutputStream;
import java.net.URISyntaxException;
import java.nio.charset.Charset;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.concurrent.CompletableFuture;

import org.springframework.beans.factory.annotation.Value;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.innosalt.ste.model.TR;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.Channel;
import io.netty.util.concurrent.Future;
import io.netty.util.concurrent.FutureListener;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class NettyClient {
	private ConnectionFactory connectionFactory;

	@Value("${mca.server.ip}")
	private String serverIp;

	@Value("${mca.server.port}")
	private int serverPort;

	private Channel channel;

	public NettyClient(ConnectionFactory connectionFactory) {
		setConnectionFactory(connectionFactory);
	}

	public ConnectionFactory getConnectionFactory() {
		return this.connectionFactory;
	}

	public void setConnectionFactory(ConnectionFactory connectionFactory) {
		this.connectionFactory = connectionFactory;
	}

	public void close() {
		if (this.channel != null) {
			try {
				this.connectionFactory.release(this.channel);
			} catch (java.lang.Exception ignored) {
				ignored.printStackTrace();
			}
			try {
				this.channel.close();
			} catch (java.lang.Exception ignored) {
				ignored.printStackTrace();
			}
		}
	}

	public CompletableFuture<String> send(TR tr) {
		CompletableFuture<String> future = new CompletableFuture<>();
		Future<Channel> channelFuture = this.connectionFactory.getChannelFuture();
		channelFuture.addListener(new FutureListener<Channel>() {
			private ByteBuf byteBuf;

			public void operationComplete(Future<Channel> f) throws JsonProcessingException, URISyntaxException {
				if (f.isSuccess()) {
					channel = f.getNow();
					channel.attr(ConnectionFactory.FUTURE).set(future);

					tr.getHeader().setRqrs_cd("S");
					tr.getHeader().setGuid(makeMCAGuid(null));
					tr.getHeader().setPub_ip("127.0.0.1");
					tr.getHeader().setPri_ip("127.0.0.1");

					ObjectMapper mapper = new ObjectMapper();
					String sendMessage = mapper.writeValueAsString(tr);

					byte[] json = sendMessage.getBytes(Charset.forName("UTF-8"));
					
					// 앞에 7Byte를 길이로 Ex) 100byte일 경우 0000100 뒤에 Json데이터
					byte[] len = String.format("%07d", json.length).getBytes(Charset.forName("UTF-8"));
					byte[] str = new byte[json.length + len.length];
					for (int i = 0; i < str.length; ++i) {
						str[i] = i < len.length ? len[i] : json[i - len.length];
					}
//					sendMessage = String.format("%07d", json.length) + sendMessage;
					log.debug(String.format("[Future] SEND MESSAGE : [%s]\n", sendMessage));

//					byte[] str = sendMessage.getBytes(Charset.forName("UTF-8"));
					byteBuf = Unpooled.buffer(str.length);
					byteBuf.writeBytes(str);
					channel.writeAndFlush(byteBuf, channel.voidPromise());

//					URI uri = new URI("http://" + serverIp + ":" + serverPort);
//					DefaultFullHttpRequest defaultFullHttpRequest = new DefaultFullHttpRequest(HttpVersion.HTTP_1_1,
//							HttpMethod.POST, uri.getRawPath());
//					defaultFullHttpRequest.headers().set(HttpHeaderNames.HOST, uri.getHost());
//					defaultFullHttpRequest.headers().set(HttpHeaderNames.CONTENT_TYPE,
//							HttpHeaderValues.APPLICATION_JSON);
//					defaultFullHttpRequest.headers().set(HttpHeaderNames.CONNECTION, HttpHeaderValues.CLOSE);
//					byteBuf = Unpooled.copiedBuffer(sendMessage, Charset.forName("UTF-8"));
//					defaultFullHttpRequest.headers().set(HttpHeaderNames.CONTENT_LENGTH,
//							Integer.valueOf(byteBuf.readableBytes()));
//					defaultFullHttpRequest.content().writeBytes(byteBuf);
//					channel.writeAndFlush(defaultFullHttpRequest, channel.voidPromise());
				}
			}
		});
		return future;
	}

	public String makeMCAGuid(String mciHandle) {
		if (mciHandle == null)
			mciHandle = "0000000000";
		StringBuffer stff = new StringBuffer();
		stff.append(getMicroDate());
		stff.append(mciHandle);
		stff.append("00");
		return stff.toString();
	}

	public String getMicroDate() {
		return (new SimpleDateFormat("yyyyMMddHHmmssSSSSSS")).format(new Date());
	}
}
