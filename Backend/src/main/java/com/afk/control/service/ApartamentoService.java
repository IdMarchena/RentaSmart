package com.afk.control.service;
import com.afk.control.dto.ApartamentoDto;

import java.util.List;

public interface ApartamentoService {
    ApartamentoDto createApartamento(ApartamentoDto apartamentoDto);
    ApartamentoDto findAllApartamentosById(Long id);
    List<ApartamentoDto> findAllApartamentos();
    void deleteApartamentoById(Long id);
    ApartamentoDto updateApartamento(Long id,ApartamentoDto apartamentoDto);
}
