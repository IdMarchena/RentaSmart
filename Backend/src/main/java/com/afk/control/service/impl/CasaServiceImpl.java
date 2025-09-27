package com.afk.control.service.impl;
import com.afk.control.dto.CasaDto;
import com.afk.control.mapper.CasaMapper;
import com.afk.control.service.CasaService;
import com.afk.model.entity.Casa;
import com.afk.model.repository.CasaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CasaServiceImpl implements CasaService {
    private final CasaRepository casaRepository;
    private final CasaMapper casaMapper;

    @Override
    public CasaDto createCasa(CasaDto dto){
        Casa casa = casaMapper.toEntity(dto);
        Casa casaSaved = casaRepository.save(casa);
        return casaMapper.toDto(casaSaved);
    }
    @Override
    public CasaDto findCasaById(Long id){
        Casa casa= casaRepository.findById(id).orElseThrow(()->
                new NoSuchElementException("Casa con id"+ id+" no encontrado"));
        return casaMapper.toDto(casa);
    }

    @Override
    public List<CasaDto> findAllCasas(){
        List<Casa> casas= casaRepository.findAll();
        return casas.stream().map(casaMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public CasaDto updateCasas(Long id, CasaDto dto){
        Casa casaExisting =casaRepository.findById(id).orElseThrow(() ->
                new NoSuchElementException("Casa con id"+ id+" no encontrado"));
        casaMapper.updateEntityFromDto(dto, casaExisting);
        Casa casaUpdate= casaRepository.save(casaExisting);
        return casaMapper.toDto(casaUpdate);
    }

    @Override
    public void deleteCasasById(Long id){
        if(!casaRepository.existsById(id)){
            throw new NoSuchElementException("Casa con id"+ id+" no encontrado");
        } casaRepository.deleteById(id);
    }
    @Override
    public List<CasaDto> findCasaByUsuario(Long idUsuario) {
        Optional<Casa> casaOptional = casaRepository.findById(idUsuario);
        return casaOptional.map(casa -> List.of(casaMapper.toDto(casa)))
                .orElseGet(Collections::emptyList);
    }

}
