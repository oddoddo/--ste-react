package com.innosalt.ste.mca;

import java.util.concurrent.CompletableFuture;

import io.netty.buffer.ByteBuf;
import io.netty.buffer.Unpooled;
import io.netty.channel.ChannelHandlerContext;
import io.netty.channel.SimpleChannelInboundHandler;
import io.netty.channel.pool.ChannelPool;
import io.netty.util.Attribute;
import lombok.extern.slf4j.Slf4j;

@Slf4j
public class ClientInboundHandler extends SimpleChannelInboundHandler<String> {
  
  private ChannelPool channelPool;
  
  public ClientInboundHandler(ChannelPool channelPool) {
    log.info(String.format("ClientInboundHandler is created......[%s]", new Object[] { toString() }));
    this.channelPool = channelPool;
  }
  
  public void channelActive(ChannelHandlerContext ctx) throws java.lang.Exception {
    log.info("ClientInboundHandler channelActive is true....");
  }
  
  protected void channelRead0(ChannelHandlerContext ctx, String msg) throws java.lang.Exception {
    if (msg == null)
      return; 
    log.debug(String.format("channelRead message : %s", msg));

    if (msg.length() > 7) {
      Attribute<CompletableFuture<String>> futureAttribute = ctx.channel().attr(ConnectionFactory.FUTURE);
      CompletableFuture<String> future = (CompletableFuture<String>)futureAttribute.getAndSet(null);
      this.channelPool.release(ctx.channel(), ctx.channel().voidPromise());
      if (future != null) {
        future.complete(msg.substring(7));
      } else {
        log.error(String.format("receive result at MCA but future is null [result:\n%s\n]", new Object[] { msg }));
        ctx.close();
      } 
    }
  }
  
  public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) throws java.lang.Exception {
    log.error("exceptionCaught[NETTY]............................[" + cause.toString() + "]");
    Attribute<CompletableFuture<String>> futureAttribute = ctx.channel().attr(ConnectionFactory.FUTURE);
    CompletableFuture<String> future = (CompletableFuture<String>)futureAttribute.getAndSet(null);
    cause.printStackTrace();
    this.channelPool.release(ctx.channel());
    ctx.close();
    if (future != null)
      future.completeExceptionally(cause); 
  }
  
  private void sendInitSignal(ChannelHandlerContext c) {
    String initMessage = "";
    log.debug(String.format("MCLIENT INIT : SEND : [%s] \n", new Object[] { initMessage }));
    byte[] str = initMessage.getBytes();
    ByteBuf byteBuf = Unpooled.buffer(str.length);
    byteBuf.writeBytes(str);
    try {
      c.writeAndFlush(byteBuf).sync();
    } catch (InterruptedException e) {
      e.printStackTrace();
    } 
  }
  
  private void sendRegistSignal(ChannelHandlerContext c) {
    String initMessage = "";
    log.debug(String.format("MCLIENT REGIST : SEND : [%s] \n", new Object[] { initMessage }));
    byte[] str = initMessage.getBytes();
    ByteBuf byteBuf = Unpooled.buffer(str.length);
    byteBuf.writeBytes(str);
    try {
      c.writeAndFlush(byteBuf).sync();
    } catch (InterruptedException e) {
      e.printStackTrace();
    } 
  }
}
