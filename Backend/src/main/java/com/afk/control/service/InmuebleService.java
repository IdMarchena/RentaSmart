package com.afk.control.service;
import com.afk.control.dto.HabitacionDto;
import com.afk.control.dto.InmuebleDto;
import com.afk.model.entity.Habitacion;

import java.util.List;
public interface InmuebleService {

    InmuebleDto createInmueble(InmuebleDto inmuebleDto);
    InmuebleDto findInmuebleById(Long id);
    List<InmuebleDto> findAllInmuebles();
    void deleteInmuebleById(Long id);
    List<InmuebleDto> findInmueblesByUbicacion(Long ubicacionId);
    List<InmuebleDto> findInmueblesByEstado(String estadoInmueble);
    InmuebleDto updateInmueble(Long id, InmuebleDto inmuebleDto);
    List<InmuebleDto> findInmueblesByNombre(String nombre);
    List<InmuebleDto> findInmueblesByEstrato(Integer estrato);
    List<InmuebleDto> findInmueblesByUbicacionAndEstado(Long ubicacionId, String estado);
    List<InmuebleDto> findInmueblesByNombreAndEstrato(String nombre, Integer estrato);
    List<InmuebleDto> finInmueblesByIdArrendatario(Long idArrendario);
    void cambiarEstadoInmueble(Long id, String estado);

    List<HabitacionDto> findHabitacionesByInmuebleId(Long id);
    void eliminarHabitacionDeUnInmueblePorHabitacionId(Long idInmueble, Long idHabitacion);
    void actualizarHabitacionDeUnInmueblePorHabitacionId(HabitacionDto habitacion, Long idHabitacion,Long idInmueble, String estado);
    Integer contarHabitacionesPorInmuebleId(Long id);
}
