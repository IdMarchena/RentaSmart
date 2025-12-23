package com.afk.control.service.impl;

import com.afk.control.dto.RequisitoDto;
import com.afk.control.mapper.RequisitoMapper;
import com.afk.control.service.RequisitoService;
import com.afk.model.repository.RequisitoRepository;
import com.afk.model.repository.TipoRequisitoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RequisitoServiceImpl implements RequisitoService {

    private final RequisitoRepository requisitoRepository;
    private final TipoRequisitoRepository tipoRequisitoRepository;
    @Qualifier("requisitoMapperImpl")
    private final RequisitoMapper mapper;
    
    @Override
    RequisitoDto createRequisito(RequisitoDto requisito);
    
    @Override
    @
    RequisitoDto findRequisitoById(Long id);
    List<RequisitoDto> findAllRequisitos();
    void deleteRequisitoById(Long id);
}