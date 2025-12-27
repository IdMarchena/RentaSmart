package com.afk.control.service;

import com.afk.control.dto.TipoServicioDto;

import java.util.List;

public interface TipoServicioService {

    TipoServicioDto save(TipoServicioDto tipoServicioDto);
    TipoServicioDto findById(Long id);
    List<TipoServicioDto> findAll();
    void delete(Long id );
    void update(Long id,TipoServicioDto tipoServicioDto);
}
