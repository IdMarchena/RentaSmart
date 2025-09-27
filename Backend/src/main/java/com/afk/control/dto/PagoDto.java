package com.afk.control.dto;
import com.afk.model.entity.enums.EstadoPago;

import java.time.LocalDateTime;

public record PagoDto(
        Long id,
        LocalDateTime fecha,
        Integer monto,
        Long idTipo,
        EstadoPago estado
) {
}
