package com.afk.control.service.impl;

import com.afk.control.dto.AlquilerDto;
import com.afk.control.mapper.AlquilerMapper;
import com.afk.control.service.AlquilerService;
import com.afk.model.entity.Alquiler;
import com.afk.model.entity.HistorialInquilino;
import com.afk.model.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
@Service
@RequiredArgsConstructor
public class AlquilerServiceImpl implements AlquilerService {

    private final AlquilerRepository alquilerRepository;
    private final HistorialInquilinoRepository historialPostulanteRepository;
    private final InmuebleRepository inmuebleRepository;
    private final CalificacionRepository calificacionRepository;
    private final CitaRepository citaRepository;
    private final FavoritoRepository favoritoRepository;
    private final PublicacionRepository publicacionRepository;
    private final ServicioRepository servicioRepository;
    @Qualifier("AlquilerMapperImpl")
    private final AlquilerMapper mapper;

    @Override
    @Transactional
    public AlquilerDto createAlquiler(AlquilerDto alquilerDto) {
        Alquiler alquiler = mapper.toEntity(alquilerDto);

        if (alquilerDto.idsHistorialInquilino() != null) {
            List<HistorialInquilino> historiales = historialPostulanteRepository.findAllById(alquilerDto.idsHistorialInquilino());
            alquiler.setHistorialInquilinos(historiales);
        }

        Alquiler savedOferta = alquilerRepository.save(alquiler);
        return mapper.toDto(savedOferta);
    }

    @Override
    @Transactional(readOnly = true)
    public AlquilerDto findAlquilerById(Long id) {
        Alquiler alquiler = alquilerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Alquiler no encontrado"));
        return mapper.toDto(alquiler);
    }


    @Override
    @Transactional(readOnly = true)
    public List<AlquilerDto> findAllAlquileres() {
        return mapper.toDtoList(alquilerRepository.findAll());
    }

    @Override
    @Transactional
    public void deleteAlquilerById(Long id) {
        if (!alquilerRepository.existsById(id)) {
            throw new RuntimeException("Oferta laboral no encontrada");
        }
        alquilerRepository.deleteById(id);
    }
}
