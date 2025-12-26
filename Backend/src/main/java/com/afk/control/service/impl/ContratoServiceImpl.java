package com.afk.control.service.impl;
import com.afk.control.dto.ContratoDto;
import com.afk.control.mapper.ContratoMapper;
import com.afk.control.service.ContratoService;
import com.afk.model.entity.Contrato;
import com.afk.model.repository.ContratoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ContratoServiceImpl implements ContratoService {

    private final ContratoRepository repository;
    private final ContratoMapper mapper;

    @Override
    public ContratoDto createContrato(ContratoDto dto) {
        Contrato contrato = mapper.toEntity(dto);
        Contrato savedContrato = repository.save(contrato);
        return mapper.toDto(savedContrato);
    }

    @Override
    public ContratoDto findContratoById(Long id) {
        Contrato contrato = repository.findById(id).orElseThrow(() ->
                new NoSuchElementException("Contrato con ID " + id + " no encontrada"));
        return mapper.toDto(contrato);
    }

    @Override
    public List<ContratoDto> findAllContratos() {
        List<Contrato> contratos = repository.findAll();
        return contratos.stream().map(mapper::toDto).collect(Collectors.toList());
    }

    @Override
    public ContratoDto updateContrato(Long id, ContratoDto dto) {
        Contrato existingCita = repository.findById(id).orElseThrow(() ->
                new NoSuchElementException("Cita con ID " + id + " no encontrada"));
        mapper.updateEntityFromDto(dto, existingCita);
        Contrato updateContrato = repository.save(existingCita);
        return mapper.toDto(updateContrato);
    }

    @Override
    public void deleteContratoById(Long id) {
        if (!repository.existsById(id)) {
            throw new NoSuchElementException("contrato con ID " + id + " no encontrada");
        }
        repository.deleteById(id);
    }

    @Override
    public List<ContratoDto> findContratoByUsuario(Long idUsuario) {
        Optional<Contrato> contratoOptional = repository.findById(idUsuario);
        return contratoOptional.map(contrato -> List.of(mapper.toDto(contrato)))
                .orElseGet(Collections::emptyList);
    }
}