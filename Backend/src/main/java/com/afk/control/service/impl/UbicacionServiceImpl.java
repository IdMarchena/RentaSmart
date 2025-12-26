package com.afk.control.service.impl;
import com.afk.client.external.dto.UbicacionDt;
import com.afk.client.external.service.UbicacionApiClientService;
import com.afk.control.mapper.UbicacionMapper;
import com.afk.control.service.UbicacionService;
import com.afk.model.entity.Ubicacion;
import com.afk.model.repository.UbicacionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;

@Service
@RequiredArgsConstructor
public class UbicacionServiceImpl implements UbicacionService {

    private final UbicacionApiClientService apiClient;
    private final UbicacionRepository ubicacionRepository;
    private final UbicacionMapper ubicacionMapper;

    private void guardarUbicacion(UbicacionDt dto) {
        Ubicacion entity = ubicacionMapper.toEntity(dto);
        ubicacionRepository.save(entity);
    }

    @Override
    public Mono<UbicacionDt> obtenerCoordenadas(String direccion) {
        return Mono.justOrEmpty(
                        ubicacionRepository.findByNombreIgnoreCase(direccion)
                )
                .map(ubicacionMapper::toDto)
                .switchIfEmpty(
                        apiClient.obtenerCoordenadas(direccion)
                                .doOnNext(this::guardarUbicacion)
                );
    }


    @Override
    public Mono<UbicacionDt> getUbicacion(Long id) {

        return apiClient.obtenerUbicacionPorId(id);
    }

    @Override
    public Mono<Void> sincronizarUbicacion(Long id) {
        return apiClient.obtenerUbicacionPorId(id)
                .map(ubicacionMapper::toEntity)
                .publishOn(Schedulers.boundedElastic())
                .doOnNext(ubicacionRepository::save)
                .then();
    }
}