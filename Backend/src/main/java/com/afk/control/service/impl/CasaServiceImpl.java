package com.afk.control.service.impl;
import com.afk.control.dto.CasaDto;
import com.afk.control.mapper.CasaMapper;
import com.afk.control.service.CasaService;
import com.afk.model.entity.Casa;
import com.afk.model.repository.CasaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CasaServiceImpl implements CasaService {
    private final CasaRepository casaRepository;
    private final CasaMapper casaMapper;

    @Override
    public CasaDto createCasa(CasaDto dto){
        if(dto==null){
            throw new IllegalArgumentException("CasaDto cannot be null");
        }
        Casa casa = casaMapper.toEntity(dto);
        Casa casaSaved = casaRepository.save(casa);
        return casaMapper.toDto(casaSaved);
    }
    @Override
    @Transactional(readOnly = true)
    public CasaDto findCasaById(Long id){
        Casa casa= casaRepository.findById(id).orElseThrow(()->
                new NoSuchElementException("Casa con id"+ id+" no encontrado"));
        return casaMapper.toDto(casa);
    }

    @Override
    @Transactional(readOnly = true)
    public List<CasaDto> findAllCasas(){
        List<Casa> casas= casaRepository.findAll();
        if(casas.isEmpty()) throw new NoSuchElementException("Casas no encontrado");
        return casas.stream().map(casaMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public CasaDto updateCasas(Long id, CasaDto dto){
        if(dto==null){
            throw new IllegalArgumentException("CasaDto cannot be null");
        }
        Casa casaExisting =casaRepository.findById(id).orElseThrow(() ->
                new NoSuchElementException("Casa con id"+ id+" no encontrado"));
        casaExisting.setNumeroPisos(dto.numeroPisos());
        Casa casaUpdate= casaRepository.save(casaExisting);
        return casaMapper.toDto(casaUpdate);
    }

    @Override
    public void deleteCasasById(Long id){
        if(!casaRepository.existsById(id)){
            throw new NoSuchElementException("Casa con id"+ id+" no encontrado");
        } casaRepository.deleteById(id);
    }


}
