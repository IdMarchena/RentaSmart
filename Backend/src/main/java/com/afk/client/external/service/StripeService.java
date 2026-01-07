package com.afk.client.external.service;

import com.afk.control.dto.UsuarioDto;
import com.afk.control.mapper.PagoMapper;
import com.afk.control.mapper.UsuarioMapper;
import com.afk.control.service.FacturaService;
import com.afk.model.entity.Pago;
import com.afk.model.entity.TipoPago;
import com.afk.model.entity.enums.EstadoPago;
import com.afk.model.repository.PagoRepository;
import com.afk.model.repository.TipoPagoRepository;
import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import jakarta.annotation.PostConstruct;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Slf4j
@RequiredArgsConstructor
@Service
public class StripeService {

    @Value("${spring.security.stripe.secret.key}")
    private String secretKey;

    private final PagoRepository pagoRepository;
    private final TipoPagoRepository tipoPagoRepository;

    private final FacturaService facturaService;

    private final PagoMapper pagoMapper;

    private final UsuarioMapper usuarioMapper;

    @PostConstruct
    public void init() {
        Stripe.apiKey = secretKey;
    }

    @Transactional
    public PaymentIntent iniciarProcesoPago(Integer monto, String moneda, String nombreTipo, Long idOrigen, UsuarioDto usuario) throws StripeException {
        // 1. Crear el PaymentIntent en Stripe
        PaymentIntentCreateParams params = PaymentIntentCreateParams.builder()
                .setAmount((long) monto * 100)
                .setCurrency(moneda)
                .putMetadata("origenTipo", nombreTipo) // Ej: "CONTRATO"
                .putMetadata("origenId", idOrigen.toString())
                .build();

        PaymentIntent intent = PaymentIntent.create(params);

        TipoPago tipo = tipoPagoRepository.findByDescripcion(nombreTipo);

        Pago nuevoPago = Pago.builder()
                .fecha(LocalDateTime.now())
                .monto(monto)
                .moneda(moneda)
                .tipo(tipo)
                .estado(EstadoPago.PENDIENTE)
                .stripePaymentIntentId(intent.getId())
                .origenId(idOrigen)
                .usuario(usuarioMapper.toEntity(usuario))
                .build();

        pagoRepository.save(nuevoPago);

        return intent;
    }
    @Transactional
    public void confirmarPagoExitoso(String stripeIntentId) {
        Pago pago = pagoRepository.findByStripePaymentIntentId(stripeIntentId);

        if (pago != null) {
            pago.setEstado(EstadoPago.COMPLETADO);
            pagoRepository.save(pago);

            // Solo generamos factura si el pago existe
            facturaService.generarFacturaDesdePago(pagoMapper.toDto(pago));
            log.info("Pago {} procesado y factura generada.", stripeIntentId);
        } else {
            // Esto es lo que verás ahora con el 'trigger'
            log.warn("Se recibió confirmación de Stripe para un pago que no existe en nuestra DB: {}", stripeIntentId);
        }
    }
}