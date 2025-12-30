package com.afk.control.dto;

import com.afk.model.entity.enums.EstadoCita;

import java.time.LocalDateTime;

public record CitaDto(
        Long id,
        LocalDateTime fecha,
        Long idUsuarioCita,
        Long idUsuarioRemitente,
        EstadoCita estado,
        Long idServicio,
        Long idPublicacion
) {}
