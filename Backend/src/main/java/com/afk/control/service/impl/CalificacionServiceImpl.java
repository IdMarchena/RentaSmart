package com.afk.control.service.impl;

import com.afk.control.dto.CalificacionDto;
import com.afk.control.dto.PublicacionDto;
import com.afk.control.dto.ServicioDto;
import com.afk.control.mapper.CalificacionMapper;
import com.afk.control.mapper.PublicacionMapper;
import com.afk.control.mapper.ServicioMapper;
import com.afk.control.service.CalificacionService;
import com.afk.model.entity.Calificacion;
import com.afk.model.entity.Publicacion;
import com.afk.model.entity.Servicio;
import com.afk.model.repository.CalificacionRepository;
import com.afk.model.repository.PublicacionRepository;
import com.afk.model.repository.ServicioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;
@RequiredArgsConstructor
@Service
public class CalificacionServiceImpl implements CalificacionService {

    private final CalificacionRepository repository;
    private final CalificacionMapper mapper;


    private final ServicioRepository servicioRepository;
    private final ServicioMapper sMapper;

    private final PublicacionRepository publicacionRepository;
    private final PublicacionMapper pMapper;


    @Override
    public CalificacionDto createCalificacion(CalificacionDto dto) {
        if(dto == null) throw new IllegalArgumentException("El dto de la calificacion no puede ser nulo");
        if(dto.idServicio()!=null && dto.idPublicacion()!=null) throw new IllegalArgumentException("la calificacion no se le puede asignar a la misma vez a un servicio y a una publicacion, debe ser uno por vez");
        Calificacion calificacion = mapper.toEntity(dto);
        calificacion.setFecha(LocalDateTime.now());
        Calificacion savedCalificacion = repository.save(calificacion);
        return mapper.toDto(savedCalificacion);
    }

    @Override
    public CalificacionDto findCalificacionById(Long id) {
        Calificacion calificacion = repository.findById(id).orElseThrow(() ->
                new NoSuchElementException("Calificación con ID " + id + " no encontrada"));
        return mapper.toDto(calificacion);
    }

    @Override
    public List<CalificacionDto> findAllCalificaciones() {
        List<Calificacion> calificaciones = repository.findAll();
        return calificaciones.stream().map(mapper::toDto).collect(Collectors.toList());
    }

    @Override
    public CalificacionDto updateCalificacion(Long id, CalificacionDto dto) {
        Calificacion existingCalificacion = repository.findById(id).orElseThrow(() ->
                new NoSuchElementException("Calificación con ID " + id + " no encontrada"));
        mapper.updateEntityFromDto(dto, existingCalificacion);
        Calificacion updatedCalificacion = repository.save(existingCalificacion);
        return mapper.toDto(updatedCalificacion);
    }

    @Override
    public void deleteCalificacionById(Long id) {
        if (!repository.existsById(id)) {
            throw new NoSuchElementException("Calificación con ID " + id + " no encontrada");
        }
        repository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CalificacionDto> encontrarCalificacionesPorId(List<Long> ids){
        List<Calificacion> calificaciones = repository.findAllById(ids);
        return mapper.toDtoList(calificaciones);
    }

    @Override
    public List<CalificacionDto> encontrarCalificacionesPorServicioId(Long idServicio) {
        if(idServicio<0 || idServicio==null) throw new IllegalArgumentException("el id no puede ser nulo o negativo");
        Servicio s = servicioRepository.findById(idServicio).
                orElseThrow(() -> new NoSuchElementException("Servicio con ID " + idServicio + " no encontrada"));
        if(s == null) throw new NoSuchElementException("el servicio con ese id no fue encontrado");
        List<Calificacion> calificaciones = s.getCalificaciones();
        if(calificaciones.isEmpty()) throw new NoSuchElementException("no se encontraron calificaciones asociadas a este servicio");
        return mapper.toDtoList(calificaciones);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CalificacionDto> encontrarCalificacionesPorPublicacionId(Long idPublicacion) {
        if (idPublicacion == null || idPublicacion < 0)
            throw new IllegalArgumentException("El id no puede ser nulo o negativo");

        Publicacion p = publicacionRepository.findById(idPublicacion)
                .orElseThrow(() -> new NoSuchElementException("Publicación con ID " + idPublicacion + " no encontrada"));

        Set<Calificacion> calificaciones = p.getCalificaciones();

        if (calificaciones == null || calificaciones.isEmpty()) {
            return List.of(); // Devuelve [] al Frontend
        }

        return mapper.toDtoList(calificaciones);
    }
}
