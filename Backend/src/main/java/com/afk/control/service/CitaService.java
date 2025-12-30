package com.afk.control.service;

import com.afk.control.dto.CitaDto;

import java.time.LocalDateTime;
import java.util.List;

public interface CitaService {
    CitaDto createCita(CitaDto cita);
    CitaDto findCitaById(Long id);
    List<CitaDto> findAllCitas();
    CitaDto updateCita(Long id, CitaDto cita);
    void deleteCitaById(Long id);
    List<CitaDto> findCitasByUsuario(Long idUsuario);

    List<CitaDto> listarCitasPorIDServicio(Long idServicio);
    List<CitaDto> listarCitasPorIDPublicacion(Long idPublicacion);
    List<CitaDto> listarCitasPorEstado(String estado);
    List<CitaDto> listarCitasPorFecha(LocalDateTime fecha);

}
