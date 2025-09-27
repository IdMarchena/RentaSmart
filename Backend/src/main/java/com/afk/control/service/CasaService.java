package com.afk.control.service;
import com.afk.control.dto.CasaDto;

import java.util.List;

public interface CasaService {
    CasaDto createCasa(CasaDto casa);
    CasaDto findCasaById(Long id);
    List<CasaDto> findAllCasas();
    CasaDto updateCasas(Long id, CasaDto caasa);
    void deleteCasasById(Long id);
    List<CasaDto> findCasaByUsuario(Long idUsuario);
}
