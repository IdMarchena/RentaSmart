package com.afk.control.dto;

public record UsuarioDto(
        Long id,
        String nombre,
        String correo,
        String contrasenia
) {}