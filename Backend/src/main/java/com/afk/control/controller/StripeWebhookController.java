package com.afk.control.controller;

import com.afk.client.external.service.StripeService;
import com.stripe.model.Event;
import com.stripe.model.EventDataObjectDeserializer;
import com.stripe.model.PaymentIntent;
import com.stripe.net.Webhook;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/webhooks")
@RequiredArgsConstructor
@Slf4j
public class StripeWebhookController {

    private final StripeService stripeService;

    @Value("${spring.security.stripe.webhook.secret}")
    private String endpointSecret;

    @PostMapping("/stripe")
    public ResponseEntity<String> handleWebhook(@RequestBody String payload, @RequestHeader("Stripe-Signature") String sigHeader,
                                                @RequestParam String tipo) {
        Event event;

        try {
            event = Webhook.constructEvent(payload, sigHeader, endpointSecret);
        } catch (Exception e) {
            log.error("Fallo en la validación del Webhook: {}", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Firma inválida");
        }
        if ("payment_intent.succeeded".equals(event.getType())) {
            EventDataObjectDeserializer dataObjectDeserializer = event.getDataObjectDeserializer();
            PaymentIntent intent = null;

            if (dataObjectDeserializer.getObject().isPresent()) {
                intent = (PaymentIntent) dataObjectDeserializer.getObject().get();
            } else {
                intent = (PaymentIntent) event.getData().getObject();
            }
            if (intent != null) {
                log.info("¡Pago confirmado! Intent ID: {}", intent.getId());
                stripeService.confirmarPagoExitoso(tipo,intent.getId());
            }
        }
        return ResponseEntity.ok("Evento procesado correctamente");
    }
}