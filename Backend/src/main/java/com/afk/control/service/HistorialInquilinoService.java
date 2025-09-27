package com.afk.control.service;

import com.afk.control.dto.HistorialInquilinoDto;

import java.util.List;

public interface HistorialInquilinoService {
    HistorialInquilinoDto createHistorialInquilino(HistorialInquilinoDto historialInquilinoDto);
    HistorialInquilinoDto findHistorialInquilinoById(Long id);
    List<HistorialInquilinoDto> findAllHistorialInquilinos();
    void deleteHistorialInquilinoById(Long id);
    List<HistorialInquilinoDto> findHistorialByUsuario(Long usuarioId);
    List<HistorialInquilinoDto> findHistorialByContrato(Long contratoId);
}
