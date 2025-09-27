package com.afk.control.dto;

import com.afk.model.entity.enums.EstadoCita;

import java.time.LocalDateTime;

public record SolicitudDeServicioDto(
        Long id,
        Long idServicio,
        Long idUsuario,
        Long idInmueble,
        LocalDateTime fecha,
        EstadoCita estado
) {
}
