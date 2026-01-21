package com.afk.control.service.impl;
import com.afk.client.external.dto.UbicacionDt;
import com.afk.client.external.service.UbicacionApiClientService;
import com.afk.control.mapper.UbicacionMapper;
import com.afk.control.service.UbicacionService;
import com.afk.model.entity.Ubicacion;
import com.afk.model.repository.UbicacionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Mono;
import reactor.core.scheduler.Schedulers;
@Slf4j
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
    public Mono<UbicacionDt> crearUbicacion(UbicacionDt dto) {
        return Mono.fromCallable(() -> {
            return ubicacionRepository.findByNombreAndLatitudAndLongitud(
                    dto.nombre(),
                    dto.latitud(),
                    dto.longitud()
            ).map(existente -> {
                log.info("📍 Ubicación ya existe, reutilizando ID: {}", existente.getId());
                return ubicacionMapper.toDto(existente);
            }).orElseGet(() -> {
                log.info("✨ Creando nueva ubicación: {}", dto.nombre());
                Ubicacion nuevaEntity = ubicacionMapper.toEntity(dto);
                if (dto.id_padre() != null) {
                    ubicacionRepository.findById(dto.id_padre())
                            .ifPresent(nuevaEntity::setPadre);
                }
                Ubicacion guardada = ubicacionRepository.save(nuevaEntity);
                return ubicacionMapper.toDto(guardada);
            });
        }).subscribeOn(Schedulers.boundedElastic());
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
        log.info("🔍 [UbicacionService] Iniciando búsqueda de ubicación con ID: {}", id);

        return Mono.fromCallable(() -> {
                    log.debug("💾 [DB] Accediendo al repositorio para ID: {}", id);
                    return ubicacionRepository.findById(id);
                })
                .subscribeOn(Schedulers.boundedElastic()) // Necesario porque JPA es bloqueante
                .flatMap(optional -> {
                    if (optional.isPresent()) {
                        log.info("✅ [DB] Ubicación encontrada en base de datos local: {}", optional.get().getNombre());
                        log.info("✅ [DB] Ubicación encontrada en base de datos local latitud: {}", optional.get().getLatitud());
                        log.info("✅ [DB] Ubicación encontrada en base de datos local longitud: {}", optional.get().getLongitud());
                        return Mono.just(ubicacionMapper.toDto(optional.get()));
                    } else {
                        log.warn("⚠️ [DB] ID {} no encontrado localmente. Intentando vía ApiClient...", id);
                        return apiClient.obtenerUbicacionPorId(id)
                                .doOnNext(dto -> log.info("🌐 [API] Ubicación recuperada de API externa"))
                                .doOnError(error -> log.error("❌ [API] Error al consultar API externa para ID {}: {}", id, error.getMessage()));
                    }
                })
                .doOnError(e -> log.error("💥 [Fatal] Error inesperado en getUbicacion: ", e));
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