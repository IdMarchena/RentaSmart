package com.afk.control.dto;

import com.afk.model.entity.enums.EstadoPago;
import com.afk.model.entity.enums.TipoFactura;

import java.time.LocalDateTime;

public record FacturaDto(
        Long id,
        LocalDateTime fechaEmision,
        String detalle,
        Long idUsuario,
        Long idPago,
        TipoFactura tipoFactura,
        Long idOrigen,
        EstadoPago estado
) {
}
