package com.afk.control.dto;

import java.time.LocalDateTime;

public record CalificacionDto(
        Long id,
        Integer puntaje,
        String comentario,
        Long idUsuarioPostulante,
        Long idPublicacion,
        Long idServicio,
        LocalDateTime fecha
) {}