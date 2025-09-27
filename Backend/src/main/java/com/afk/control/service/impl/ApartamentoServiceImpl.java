package com.afk.control.service.impl;

import com.afk.control.dto.ApartamentoDto;
import com.afk.control.mapper.ApartamentoMapper;
import com.afk.control.service.ApartamentoService;
import com.afk.model.entity.Apartamento;
import com.afk.model.repository.ApartamentoRepository;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ApartamentoServiceImpl implements ApartamentoService {

    private final ApartamentoRepository apartamentoRepository;

    @Qualifier("apartamentoMapperImpl")
    private final ApartamentoMapper apartamentoMapper;


    @Override
    @Transactional
    public ApartamentoDto createApartamento(ApartamentoDto apartamentoDto) {
        Apartamento apartamento = apartamentoMapper.toEntity(apartamentoDto);
        if (apartamento.getId() != null) {
            throw new RuntimeException("Apartamento ya existe con el ID: " + apartamento.getId());
        }
        Apartamento savedApartamento = apartamentoRepository.save(apartamento);
        return apartamentoMapper.toDto(savedApartamento);
    }

    @Override
    @Transactional(readOnly = true)
    public ApartamentoDto findAllApartamentosById(Long id) {
        Apartamento apartamento = apartamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Apartamento no encontrado"));
        return apartamentoMapper.toDto(apartamento);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ApartamentoDto> findAllApartamentos() {
        List<Apartamento> apartamentos = apartamentoRepository.findAll();
        return apartamentoMapper.toDtoList(apartamentos);
    }

    @Override
    @Transactional
    public void deleteApartamentoById(Long id) {
        if (!apartamentoRepository.existsById(id)) {
            throw new RuntimeException("Apartamento no encontrado");
        }
        apartamentoRepository.deleteById(id);
    }
    @Override
    public ApartamentoDto updateApartamento(Long id,ApartamentoDto apartamentoDto) {
        Apartamento existingApartametno = apartamentoRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Apartamento no encontrado"));
        apartamentoMapper.updateEntityFromDto(existingApartametno, apartamentoDto);
        Apartamento updatedApartamento = apartamentoRepository.save(existingApartametno);
        return apartamentoMapper.toDto(updatedApartamento);
    }
}
