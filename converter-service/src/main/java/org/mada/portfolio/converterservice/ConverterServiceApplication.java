package org.mada.portfolio.converterservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class ConverterServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(ConverterServiceApplication.class, args);
    }

}
