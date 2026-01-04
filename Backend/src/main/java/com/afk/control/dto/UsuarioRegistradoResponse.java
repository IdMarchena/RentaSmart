package com.afk.control.dto;

import com.afk.model.entity.enums.EstadoUsuarioRegistrado;

import java.time.LocalDateTime;

public record UsuarioRegistradoResponse(
        Long id,
        String nombre,
        String email,
        String telefono,
        String rolNombre,
        String ubicacionNombre,
        LocalDateTime fechaRegistro,
        EstadoUsuarioRegistrado estado,
        String username
) {}
