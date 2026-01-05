package com.afk.rentasmart;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages = "com.afk.model.repository") // Asegúrate de que esta ruta sea exacta
@EntityScan(basePackages = "com.afk.model.entity")
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
