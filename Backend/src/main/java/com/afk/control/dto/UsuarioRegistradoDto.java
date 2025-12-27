package com.afk.control.dto;

import com.afk.model.entity.enums.EstadoUsuarioRegistrado;
import java.time.LocalDateTime;

public record UsuarioRegistradoDto(
        Long id,
        Long rol,
        Long ubicacion,
        EstadoUsuarioRegistrado estado,
        String telefono,
        String cedula
) {}