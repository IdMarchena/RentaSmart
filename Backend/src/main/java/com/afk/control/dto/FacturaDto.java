package com.afk.control.dto;

import java.time.LocalDateTime;

public record FacturaDto(
        Long id,
        LocalDateTime fechaEmision,
        String detalle,
        Long idUsuario,
        Long idReporteMantenimiento,
        Long idPago,
        Long idContrato,
        Long idServicio
) {
}
