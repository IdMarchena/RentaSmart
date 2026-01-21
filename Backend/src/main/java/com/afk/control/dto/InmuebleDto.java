package com.afk.control.dto;

import com.afk.model.entity.enums.EstadoInmueble;
import com.afk.model.entity.enums.TipoInmueble;

import java.util.List;

public record InmuebleDto(
        Long id,
        TipoInmueble tipo,
        String descripcion,
        Long idUbicacion,
        Integer areaTotal,
        Integer numeroBanos,
        Integer numeroPisos,
        Integer capacidadPersonas,
        Integer estrato,
        EstadoInmueble estadoInmueble,
        String nombre,
        Long idArrendatario,
        Integer numeroHabitaciones

) {
}
