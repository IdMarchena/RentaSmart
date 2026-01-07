package com.afk.control.controller;


import com.afk.client.external.service.StripeService;
import com.afk.control.mapper.UsuarioMapper;
import com.afk.model.entity.Usuario;
import com.afk.model.repository.UsuarioRepository;
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

    private final UsuarioRepository usuarioRepository;
    private final UsuarioMapper usuarioMapper;

    @PostMapping("/crear-intencion")
    public ResponseEntity<?> crearIntencionPago(@RequestBody Map<String, Object> request) {
        try {
            Integer monto = (Integer) request.get("monto");
            String moneda = (String) request.get("moneda");
            String origen = (String) request.get("origen"); // "CONTRATO" o "SERVICIO"
            Long idOrigen = Long.valueOf(request.get("idOrigen").toString());
            Long idUsuario = Long.valueOf(request.get("idUsuario").toString());

            Usuario u = usuarioRepository.findById(idUsuario)
                    .orElseThrow(() -> new Exception("Usuario no encontrado"));

            PaymentIntent intent = stripeService.iniciarProcesoPago(monto, moneda, origen, idOrigen,usuarioMapper.toDto(u));

            Map<String, String> response = new HashMap<>();

            response.put("clientSecret", intent.getClientSecret());
            response.put("stripeId", intent.getId());

            return ResponseEntity.ok(response);
        } catch (StripeException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error de Stripe: " + e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body("Error en los datos de la solicitud: " + e.getMessage());
        }
    }
}

