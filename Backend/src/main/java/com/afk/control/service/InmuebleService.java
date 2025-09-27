package com.afk.control.service;

import com.afk.control.dto.InmuebleDto;
import com.afk.model.entity.enums.EstadoInmueble;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface InmuebleService {

    InmuebleDto createInmueble(InmuebleDto inmuebleDto);
    InmuebleDto findInmuebleById(Long id);
    List<InmuebleDto> findAllInmuebles();
    void deleteInmuebleById(Long id);
    List<InmuebleDto> findInmueblesByUbicacion(Long ubicacionId);
    List<InmuebleDto> findInmueblesByEstado(EstadoInmueble estadoInmueble);
    InmuebleDto updateInmueble(Long id, InmuebleDto inmuebleDto);
    List<InmuebleDto> findInmueblesByNombre(String nombre);
    List<InmuebleDto> findInmueblesByEstrato(Integer estrato);
    List<InmuebleDto> findInmueblesByUbicacionAndEstado(Long ubicacionId, EstadoInmueble estadoInmueble);
    List<InmuebleDto> findInmueblesByNombreAndEstrato(String nombre, Integer estrato);
}
