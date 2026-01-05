package com.afk.control.dto;

import com.afk.model.entity.enums.EstadoInmueble;

import java.util.List;

public record InmuebleDto(
        Long id,
        String descripcion,
        Long idUbicacion,
        Integer areaTotal,
        Integer estrato,
        EstadoInmueble estadoInmueble,
        String nombre,
        Long idServicio,
        Long idArrendatario,
        List<Long> idsHabitaciones

) {
}
