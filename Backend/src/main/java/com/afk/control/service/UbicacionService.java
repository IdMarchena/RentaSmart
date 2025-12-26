package com.afk.control.service;

import com.afk.client.external.dto.UbicacionDt;
import reactor.core.publisher.Mono;

public interface UbicacionService {
    Mono<UbicacionDt> obtenerCoordenadas(String direccion);
    Mono<UbicacionDt> getUbicacion(Long id);
    Mono<Void> sincronizarUbicacion(Long id);
}