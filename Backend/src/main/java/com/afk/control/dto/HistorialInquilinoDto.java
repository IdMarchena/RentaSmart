package com.afk.control.dto;

import java.time.LocalDateTime;

public record HistorialInquilinoDto(
        Long id,
        LocalDateTime fecha_historial_postulante,
        Long idContrato,
        Long idUsuario
) {
}
