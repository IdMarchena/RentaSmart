package com.afk.control.service;

import com.afk.control.dto.RequisitoDto;

import java.util.List;

public interface RequisitoService {
    RequisitoDto createRequisito(RequisitoDto requisito);
    RequisitoDto findRequisitoById(Long id);
    List<RequisitoDto> findAllRequisitos();
    boolean deleteRequisitoById(Long id);
    RequisitoDto updateRequisito(RequisitoDto requisito,Long id);
}
