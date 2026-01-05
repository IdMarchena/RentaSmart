package com.afk.control.dto;

import com.afk.model.entity.enums.EstadoPago;

import java.time.LocalDateTime;

public record FacturaDto(
        Long id,
        LocalDateTime fechaEmision,
        String detalle,
        Long idUsuario,
        Long idPago,
        Long idContrato,
        Long idServicio,
        EstadoPago estado
) {
}
