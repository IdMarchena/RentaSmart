package com.afk.control.dto;
import com.afk.model.entity.enums.Roles;

public record SignUpRequest(
        String nombre,
        String correo,
        String contrasenia,
        String cel,
        Roles rol,
        String cedula
) {}
