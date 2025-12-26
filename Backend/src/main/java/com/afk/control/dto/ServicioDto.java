package com.afk.control.dto;

import com.afk.model.entity.enums.EstadoServicio;

public record ServicioDto(
        Long id,
        String nombre,
        String descripcion,
        Long idUsuario,
        Long idTipo,
        Integer precio,
        EstadoServicio estado
) {
}
