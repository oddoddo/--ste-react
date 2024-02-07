package com.innosalt.ste.mca;

import java.util.concurrent.CompletableFuture;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.channel.pool.ChannelPool;
import io.netty.handler.codec.http.HttpContent;
import io.netty.handler.codec.http.HttpObject;
import io.netty.handler.codec.http.HttpResponse;
import io.netty.util.Attribute;
import io.netty.util.CharsetUtil;

public class ClientHttpResponseHandler extends SimpleChannelInboundHandler<HttpObject> {
	private static final Logger log = LoggerFactory.getLogger(ClientHttpResponseHandler.class);

	private ChannelPool channelPool;

	public ClientHttpResponseHandler(ChannelPool channelPool) {
		log.info(String.format("ClientHttpResponseHandler is created......[%s]", new Object[] { toString() }));
		this.channelPool = channelPool;
	}

	public void channelActive(ChannelHandlerContext ctx) throws java.lang.Exception {
		log.info("ClientHttpResponseHandler channelActive is true....");
	}

	protected void channelRead0(ChannelHandlerContext ctx, HttpObject msg) throws java.lang.Exception {
		if (msg instanceof HttpResponse) {
			HttpResponse response = (HttpResponse) msg;
			log.info("STATUS: " + response.status());
			log.info("VERSION: " + response.protocolVersion());
			if (!response.headers().isEmpty())
				for (CharSequence name : response.headers().names()) {
					for (CharSequence value : response.headers().getAll(name))
						log.info("HEADER: " + name + " = " + value);
				}
			System.out.println("CONTENT [");
		}
		if (msg instanceof HttpContent) {
			HttpContent content = (HttpContent) msg;
			log.debug(String.format("ConnectionFactory.FUTURE value: [%s]", new Object[] { ConnectionFactory.FUTURE }));
			Attribute<CompletableFuture<String>> futureAttribute = ctx.channel().attr(ConnectionFactory.FUTURE);
			log.debug("ClientHttpResponseHandler.chnnelRead0.... 1");
			CompletableFuture<String> future = (CompletableFuture<String>) futureAttribute.getAndSet(null);
			log.debug("ClientHttpResponseHandler.chnnelRead0.... " + future);
			if (future != null) {
				this.channelPool.release(ctx.channel(), ctx.channel().voidPromise());
				log.info("content : " + content.content().toString(CharsetUtil.UTF_8));
				future.complete(content.content().toString(CharsetUtil.UTF_8));
			}
			if (content instanceof io.netty.handler.codec.http.LastHttpContent) {
				System.out.println("] END OF CONTENT");
				if (future == null) {
					log.error(String.format("receive result at MCA but future is null [result:\n%s\n]",
							new Object[] { "" }));
					ctx.close();
				} else {
					future.cancel(true);
				}
			}
		}
	}

	public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws java.lang.Exception {
		log.error("exceptionCaught[NETTY]............................[" + cause.toString() + "]");
		Attribute<CompletableFuture<String>> futureAttribute = ctx.channel().attr(ConnectionFactory.FUTURE);
		CompletableFuture<String> future = (CompletableFuture<String>) futureAttribute.getAndSet(null);
		cause.printStackTrace();
		this.channelPool.release(ctx.channel());
		ctx.close();
		if (future != null)
			future.completeExceptionally(cause);
	}
}
