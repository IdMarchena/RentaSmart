package com.afk.control.service;
import com.afk.control.dto.CalificacionDto;
import java.util.List;

public interface CalificacionService {
    CalificacionDto createCalificacion(CalificacionDto calificacion);
    CalificacionDto findCalificacionById(Long id);
    List<CalificacionDto> findAllCalificaciones();
    CalificacionDto updateCalificacion(Long id, CalificacionDto calificacion);
    void deleteCalificacionById(Long id);
    List<CalificacionDto> encontrarCalificacionesPorId(List<Long> id);
    List<CalificacionDto> encontrarCalificacionesPorServicioId(Long idServicio);
    List<CalificacionDto> encontrarCalificacionesPorPublicacionId(Long idPublicacion);

}
