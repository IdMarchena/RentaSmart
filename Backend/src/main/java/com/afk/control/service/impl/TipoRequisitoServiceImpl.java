package com.afk.control.service.impl;

import com.afk.control.dto.TipoRequisitoDto;
import com.afk.control.mapper.TipoRequisitoMapper;
import com.afk.control.service.TipoRequisitoService;
import com.afk.model.entity.TipoRequisito;
import com.afk.model.repository.TipoRequisitoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TipoRequisitoServiceImpl implements TipoRequisitoService {

    private final TipoRequisitoRepository tipoRequisitoRepository;
    @Qualifier("tipoRequisitoMapperImpl")
    private final TipoRequisitoMapper mapper;

    @Override
    public TipoRequisitoDto createTipoRequisito(TipoRequisitoDto tipoRequisitoDto) {
        TipoRequisito tipoRequisito = mapper.toEntity(tipoRequisitoDto);
        TipoRequisito savedTipoRequisito = tipoRequisitoRepository.save(tipoRequisito);
        return mapper.toDto(savedTipoRequisito);
    }

    @Override
    @Transactional(readOnly = true)
    public TipoRequisitoDto findTipoRequisitoById(Long id) {
        TipoRequisito tipoRequisito = tipoRequisitoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Tipo de requisito no encontrado"));
        return mapper.toDto(tipoRequisito);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TipoRequisitoDto> findAllTiposRequisito() {
        List<TipoRequisito> tipoRequisitos = tipoRequisitoRepository.findAll();
        if (tipoRequisitos.isEmpty()) {
            throw new RuntimeException("Tipo de requisitos no encontrados");
        }
        return mapper.toDtoList(tipoRequisitos);
    }

    @Override
    public void deleteTipoRequisitoById(Long id) {
        if (!tipoRequisitoRepository.existsById(id)) {
            throw new RuntimeException("Tipo de requisito no encontrado");
        }
        tipoRequisitoRepository.deleteById(id);
    }
}