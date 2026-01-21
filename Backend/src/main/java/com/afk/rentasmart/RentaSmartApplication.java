package com.afk.rentasmart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.afk.model.repository")
@EntityScan(basePackages = "com.afk.model.entity")
@ComponentScan(basePackages = "com.afk")
public class RentaSmartApplication {
    public static void main(String[] args) {
        SpringApplication.run(RentaSmartApplication.class, args);
    }
}