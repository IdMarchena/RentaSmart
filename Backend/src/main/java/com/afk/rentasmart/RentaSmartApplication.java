package com.afk.rentasmart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan(basePackages = {
        "com.afk.client",
        "com.afk.control",
        "com.afk.model",
        "com.afk.bootstrap"
})
public class RentaSmartApplication {

    public static void main(String[] args) {
        SpringApplication.run(RentaSmartApplication.class, args);
    }

}
