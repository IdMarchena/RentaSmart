package com.afk.backend.control.service;

import java.util.List;

public interface TipoEmpresaService {
    TipoEmpresaDto createTipoEmpresa(TipoEmpresaDto tipo);
    TipoEmpresaDto findTipoEmpresaById(Long id);
    List<TipoEmpresaDto> findAllTiposEmpresa();
    void deleteTipoEmpresaById(Long id);
}
