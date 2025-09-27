package com.afk.control.dto;

public record RequisitoDto(
        Long id,
        String descripcion,
        Long idInmueble,
        Long idTipo
) {}