package com.afk.control.dto;

import java.util.List;

public record InmuebleDto(
        Long id,
        String descripcion,
        Long idUbicacion,
        Integer areaTotal,
        Integer estrato,
        String nombre,
        Long idServicio,
        Long idArrendatario,
        List<Long> idsHabitaciones

) {
}
