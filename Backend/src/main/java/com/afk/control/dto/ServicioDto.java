package com.afk.control.dto;
import com.afk.model.entity.enums.EstadoServicio;
import com.afk.model.entity.enums.TipoServicio;

import java.util.List;

public record ServicioDto(
        Long id,
        String nombre,
        String descripcion,
        Long idUsuario,
        TipoServicio tipo,
        Integer precio,
        EstadoServicio estado,
        Long idUbicacion,
        List<Long> calificacionesIds
) {
}
