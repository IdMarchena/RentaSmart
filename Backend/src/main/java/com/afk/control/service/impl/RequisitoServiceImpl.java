package com.afk.control.service.impl;

import com.afk.control.dto.RequisitoDto;
import com.afk.control.mapper.RequisitoMapper;
import com.afk.control.service.RequisitoService;
import com.afk.model.entity.Requisito;
import com.afk.model.repository.RequisitoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RequisitoServiceImpl implements RequisitoService {

    private final RequisitoRepository requisitoRepository;
    @Qualifier("requisitoMapperImpl")
    private final RequisitoMapper mapper;
    @Override
    public RequisitoDto createRequisito(RequisitoDto requisito) {
        if (requisito == null) {
            throw new IllegalArgumentException("El requisito no puede ser nulo");
        }
        Requisito requi = mapper.toEntity(requisito);
        return Optional.ofNullable(requi)
                .map(requisitoRepository::save)
                .map(savedRequi -> mapper.toDto(savedRequi))
                .orElseThrow(() -> new RuntimeException("Creación de requisito inválida"));
    }
    @Override
    @Transactional(readOnly = true)
    public RequisitoDto findRequisitoById(Long id){
        if(id == null || id <= 0){
            throw new IllegalArgumentException("El id del requisito no puede ser nulo o negativo");
        }
        Requisito requisito = requisitoRepository.findById(id)
                        .orElseThrow(() -> new NoSuchElementException("Requisito con id " + id + " no encontrado"));
        return mapper.toDto(requisito);
    }
    @Override
    @Transactional(readOnly = true)
    public List<RequisitoDto> findAllRequisitos(){
        List<Requisito> requisitos = requisitoRepository.findAll();
        if(requisitos.isEmpty()){
            throw new NoSuchElementException("Requisitos no encontradas");
        }
        return mapper.toDtoList(requisitos);
    }
    @Override
    @Transactional(readOnly = true)
    public boolean deleteRequisitoById(Long id){
        if(id == null || id <= 0){
            throw new NoSuchElementException("Requisito no encontrado");
        }
        try{
            requisitoRepository.deleteById(id);
            return true;
        }catch(Exception e){
            return false;
        }
    }

    @Override
    @Transactional(readOnly = true)
    public RequisitoDto updateRequisito(RequisitoDto requisito,Long id) {
        if(requisito == null){
            throw new IllegalArgumentException("El requisito no puede ser nulo");
        }

        Requisito requisitoEntity = mapper.toEntity(requisito);

        Requisito rExistente = requisitoRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("requisito no encontrado"));

        rExistente.setDescripcion(requisitoEntity.getDescripcion());
        return mapper.toDto(requisitoRepository.save(rExistente));

    }
}