package com.afk.control.dto;

public record InmuebleDto(
        Long id,
        String descripcion,
        Long idUbicaicon,
        Integer areaTotal,
        Integer estrato,
        String nombre,
        Long idServicio

) {
}
