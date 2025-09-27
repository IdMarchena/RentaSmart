package com.afk.control.service;


import com.afk.control.dto.ContratoDto;

import java.util.List;

public interface ContratoService {
    ContratoDto createContrato(ContratoDto contratos);
    ContratoDto findContratoById(Long id);
    List<ContratoDto> findAllContratos();
    ContratoDto updateContrato(Long id, ContratoDto contrato);
    void deleteContratoById(Long id);
    List<ContratoDto> findContratoByUsuario(Long idUsuario);
}
