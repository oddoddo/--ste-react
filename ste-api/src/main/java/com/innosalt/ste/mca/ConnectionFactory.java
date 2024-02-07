package com.innosalt.ste.mca;

import java.nio.ByteOrder;
import java.nio.charset.Charset;
import java.util.concurrent.CompletableFuture;

import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import io.netty.bootstrap.Bootstrap;
import io.netty.buffer.ByteBuf;
import io.netty.channel.Channel;
import io.netty.channel.ChannelOption;
import io.netty.channel.ChannelPipeline;
import io.netty.channel.EventLoopGroup;
import io.netty.channel.FixedRecvByteBufAllocator;
import io.netty.channel.nio.NioEventLoopGroup;
import io.netty.channel.pool.AbstractChannelPoolHandler;
import io.netty.channel.pool.ChannelPool;
import io.netty.channel.pool.FixedChannelPool;
import io.netty.channel.socket.nio.NioSocketChannel;
import io.netty.handler.codec.LengthFieldBasedFrameDecoder;
import io.netty.handler.codec.string.StringDecoder;
import io.netty.util.AttributeKey;
import io.netty.util.CharsetUtil;
import io.netty.util.concurrent.Future;
import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class ConnectionFactory {
	public static final AttributeKey<CompletableFuture<String>> FUTURE = AttributeKey.valueOf("future");

	private StringDecoder stringDecoder;
	private ChannelPool channelPool;
	private EventLoopGroup eventLoopGroup;

	@Value("${mca.server.ip}")
	private String serverIp;

	@Value("${mca.server.port}")
	private int serverPort;

	@Value("${mca.server.threads}")
	private int numberOfThreads;

	@Value("${mca.server.connections}")
	private int numberOfConnections;

	@PostConstruct
	public void init() {
		this.stringDecoder = new StringDecoder(Charset.forName("UTF-8"));
		connect(this.serverIp, this.serverPort, this.numberOfThreads, this.numberOfConnections);
	}

	private void connect(String host, int port, int numberOfThreads, int numberOfConnections) {
		log.info(String.format(
				"Connection Factory's Configuration : Host [%s], Port [%d], Number of Thread [%d], Number of Connection [%d] \n",
				new Object[] { host, Integer.valueOf(port), Integer.valueOf(numberOfThreads),
						Integer.valueOf(numberOfConnections) }));
		this.eventLoopGroup = (EventLoopGroup) new NioEventLoopGroup(numberOfThreads);
		int receiveBufSize = 23072;

		Bootstrap bootstrap = new Bootstrap();
		bootstrap.option(ChannelOption.TCP_NODELAY, true);
		bootstrap.option(ChannelOption.RCVBUF_ALLOCATOR, new FixedRecvByteBufAllocator(receiveBufSize));
		bootstrap.group(eventLoopGroup).channel(NioSocketChannel.class).remoteAddress(host, port);

		channelPool = new FixedChannelPool(bootstrap, new AbstractChannelPoolHandler() {
			@Override
			public void channelCreated(Channel ch) {

				log.info("==============================================================================");
				log.info("= Channel created.............................................................");
				log.info("==============================================================================");
				ChannelPipeline cp = ch.pipeline();

				class CustomLengthFieldBasedFrameDecoder extends LengthFieldBasedFrameDecoder {
					public CustomLengthFieldBasedFrameDecoder(int maxFrameLength, int lengthFieldOffset,
							int lengthFieldLength, int lengthAdjustment, int initialBytesToStrip) {
						super(maxFrameLength, lengthFieldOffset, lengthFieldLength, lengthAdjustment,
								initialBytesToStrip);
					}

					@Override
					protected long getUnadjustedFrameLength(ByteBuf buf, int offset, int length, ByteOrder order) {
						buf = buf.order(order);
						byte[] lengthBytes = new byte[length];
						buf.getBytes(offset, lengthBytes);
						String s = new String(lengthBytes, CharsetUtil.UTF_8);
						return Long.parseLong(s);
					}
				}
				cp.addLast("frameDecoder", new CustomLengthFieldBasedFrameDecoder(65536, 0, 7, 0, 0));
				cp.addLast("stringDecoder", stringDecoder);
				cp.addLast("clientHandler", new ClientInboundHandler(channelPool));
//				cp.addLast("aggregator", new HttpObjectAggregator(2147483647));
//			    cp.addLast("codec", new HttpClientCodec());
//			    cp.addLast("handler", new ClientHttpResponseHandler(channelPool));
			}
		}, numberOfConnections);
	}

	public Future<Channel> getChannelFuture() {
		return this.channelPool.acquire();
	}

	@PreDestroy
	public void disconnect() throws java.lang.Exception {
		this.eventLoopGroup.shutdownGracefully().sync();
	}

	public void release(Channel c) {
		this.channelPool.release(c);
	}
}
