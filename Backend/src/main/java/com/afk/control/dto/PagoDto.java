package com.afk.control.dto;
import com.afk.model.entity.enums.EstadoPago;
import com.afk.model.entity.enums.TipoPago;

import java.time.LocalDateTime;

public record PagoDto(Long id,
                      LocalDateTime fecha,
                      Integer monto,
                      TipoPago tipo,
                      EstadoPago estado,
                      String moneda,
                      String stripePaymentIntentId,
                      Long origenId,
                      Long idUsuario
) {
}
