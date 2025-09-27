package com.afk.control.dto;


import com.afk.model.entity.enums.EstadoCita;

import java.time.LocalDateTime;

public record CitaDto(
        Long id,
        LocalDateTime fecha,
        Long idUsuario,
        Long idServicio,
        EstadoCita estadoCita,
        Long idSolicitudServicio
) {}