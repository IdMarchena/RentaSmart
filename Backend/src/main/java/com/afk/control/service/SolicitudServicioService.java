package com.afk.control.service;

import com.afk.control.dto.SolicitudDeServicioDto;

import java.time.LocalDateTime;
import java.util.List;

public interface SolicitudServicioService {

    SolicitudDeServicioDto crearSolicitudServicio(SolicitudDeServicioDto solicitudServicio);

    SolicitudDeServicioDto findById(Long id);

    SolicitudDeServicioDto actualizarSolicitudServicio(Long id,SolicitudDeServicioDto solicitudServicio);

    List<SolicitudDeServicioDto> findAll();

    List<SolicitudDeServicioDto> findByUsuario(Long idUsuario);

    List<SolicitudDeServicioDto> findByEstado(String estado);

    List<SolicitudDeServicioDto> findByServicio(Long idServicio);

    List<SolicitudDeServicioDto> findByInmueble(Long idInmueble);

    List<SolicitudDeServicioDto> findByFechaBetween(LocalDateTime startDate, LocalDateTime endDate);

    boolean deleteById(Long id);
}
