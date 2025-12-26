package com.afk.control.dto;

import com.afk.model.entity.enums.EstadoReporteFinanciero;

import java.time.LocalDateTime;

public record ReporteFinancieroDto(
        Long id,
        Long idUsuario,
        Long idInmueble,
        String contenido,
        LocalDateTime fecha,
        Long idTipo,
        EstadoReporteFinanciero estado

) {
}
