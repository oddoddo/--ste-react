package com.innosalt.ste;

import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SteApiApplication {
  public SteApiApplication() {}
  
  public static void main(String[] args) {
    org.springframework.boot.SpringApplication.run(SteApiApplication.class, args);
  }
}