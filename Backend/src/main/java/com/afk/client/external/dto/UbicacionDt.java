package com.afk.client.external.dto;


import com.afk.model.entity.enums.EstadoUbicacion;

public record UbicacionDt(Long id,
                          Long id_padre,
                          String nombre,
                          Double latitud,
                          Double longitud,
                          EstadoUbicacion estado) {
}
