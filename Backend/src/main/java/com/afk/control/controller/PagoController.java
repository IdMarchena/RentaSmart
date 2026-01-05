package com.afk.control.controller;


import com.afk.client.external.service.StripeService;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/pagos")
@RequiredArgsConstructor
public class PagoController {

    private final StripeService stripeService;

    @PostMapping("/crear-intencion")
    public ResponseEntity<?> crearIntencionPago(@RequestBody Map<String, Object> request) {
        try {
            Integer monto = (Integer) request.get("monto");
            String moneda = (String) request.get("moneda");

            PaymentIntent intent = stripeService.crearPago(monto, moneda);

            Map<String, String> response = new HashMap<>();
            response.put("clientSecret", intent.getClientSecret());

            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error al crear el pago");
        }
    }
}

