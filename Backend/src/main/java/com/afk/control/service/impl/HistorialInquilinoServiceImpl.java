package com.afk.control.service.impl;

import com.afk.control.dto.HistorialInquilinoDto;
import com.afk.control.mapper.HistorialInquilinoMapper;
import com.afk.control.service.HistorialInquilinoService;
import com.afk.model.entity.HistorialInquilino;
import com.afk.model.repository.HistorialInquilinoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class HistorialInquilinoServiceImpl implements HistorialInquilinoService {

    private final HistorialInquilinoRepository historialInquilinoRepository;
    private final HistorialInquilinoMapper historialInquilinoMapper;

    @Override
    public HistorialInquilinoDto createHistorialInquilino(HistorialInquilinoDto historialInquilinoDto) {
        HistorialInquilino historialInquilino = historialInquilinoMapper.toEntity(historialInquilinoDto);
        HistorialInquilino savedHistorial = historialInquilinoRepository.save(historialInquilino);
        return historialInquilinoMapper.toDto(savedHistorial);
    }

    @Override
    public HistorialInquilinoDto findHistorialInquilinoById(Long id) {
        HistorialInquilino historial = historialInquilinoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Historial de inquilino no encontrado"));
        return historialInquilinoMapper.toDto(historial);
    }

    @Override
    public List<HistorialInquilinoDto> findAllHistorialInquilinos() {
        List<HistorialInquilino> historialList = historialInquilinoRepository.findAll();
        return historialList.stream()
                .map(historialInquilinoMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteHistorialInquilinoById(Long id) {
        if (!historialInquilinoRepository.existsById(id)) {
            throw new RuntimeException("Historial de inquilino no encontrado");
        }
        historialInquilinoRepository.deleteById(id);
    }

    @Override
    public List<HistorialInquilinoDto> findHistorialByUsuario(Long usuarioId) {
        List<HistorialInquilino> historialList = historialInquilinoRepository.findByUserId(usuarioId);
        return historialList.stream()
                .map(historialInquilinoMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<HistorialInquilinoDto> findHistorialByContrato(Long contratoId) {
        List<HistorialInquilino> historialList = historialInquilinoRepository.findByContratoId(contratoId);
        return historialList.stream()
                .map(historialInquilinoMapper::toDto)
                .collect(Collectors.toList());
    }
}
