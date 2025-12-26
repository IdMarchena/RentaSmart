package com.afk.control.dto;

import com.afk.model.entity.enums.EstadoSancion;

import java.time.LocalDateTime;

public record SancionDto(
        Long id,
        String descripcion,
        Long idUsuario,
        Long idPublicacion,
        LocalDateTime fecha,
        EstadoSancion estado
) {}