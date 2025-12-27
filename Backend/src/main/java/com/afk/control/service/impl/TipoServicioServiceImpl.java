package com.afk.control.service.impl;

import com.afk.control.dto.TipoServicioDto;
import com.afk.control.mapper.TipoServicioMapper;
import com.afk.control.service.TipoServicioService;
import com.afk.model.entity.TipoServicio;
import com.afk.model.repository.TipoServicioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class TipoServicioServiceImpl implements TipoServicioService {

    private final TipoServicioRepository repository;
    private final TipoServicioMapper mapper;

    @Override
    public TipoServicioDto save(TipoServicioDto tipoServicioDto) {
        if(tipoServicioDto==null) throw new IllegalArgumentException("Tipo de servicio no puede ser nulo");
        TipoServicio t = mapper.toEntity(tipoServicioDto);
        repository.save(t);
        return mapper.toDto(t);
    }

    @Override
    @Transactional(readOnly = true)
    public TipoServicioDto findById(Long id) {
        if(id==null || id<0) throw new IllegalArgumentException("Id no puede ser nulo ni menor a 0");
        TipoServicio t = repository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Tipo de servicio no encontrado"));
        return mapper.toDto(t);
    }

    @Override
    @Transactional(readOnly = true)
    public List<TipoServicioDto> findAll() {
        List<TipoServicio> t = repository.findAll();
        if(t.isEmpty()) throw new NoSuchElementException("Tipos de servicio no encontrado");
        return mapper.toDtoList(t);
    }

    @Override
    @Transactional(readOnly = true)
    public void delete(Long id) {
        if(id==null) throw new IllegalArgumentException("Tipo de servicio no puede ser nulo");
        TipoServicio t = repository.findById(id)
                        .orElseThrow(() -> new NoSuchElementException("Tipo de servicio no encontrado"));
        repository.delete(t);
    }

    @Override
    public void update(Long id,TipoServicioDto tipoServicioDto) {
        if(tipoServicioDto==null) throw new IllegalArgumentException("Tipo de servicio no puede ser nulo");
        TipoServicio t = mapper.toEntity(tipoServicioDto);
        TipoServicio tExisting = repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Tipo de servicio no encontrado"));
        tExisting.setDescripcion(t.getDescripcion());
        repository.save(tExisting);
    }
}
