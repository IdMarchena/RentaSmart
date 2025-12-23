package com.afk.control.service;

import com.afk.control.dto.RequisitoDto;

import java.util.List;

public interface RequisitoService {
    RequisitoDto createRequisito(RequisitoDto requisito);
    RequisitoDto findRequisitoById(Long id);
    List<RequisitoDto> findAllRequisitos();
    void deleteRequisitoById(Long id);
    void updateRequisito(RequisitoDto requisito);
}
