package com.afk.client.external.service;

import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;

import java.util.List;

public class StripeService {
    public PaymentIntent crearPago(Integer monto, String moneda) throws StripeException {
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount((long) monto * 100)
                .setCurrency(moneda)
                .addPaymentMethodType("card")
                .build();

        return PaymentIntent.create(params);
    }
}
