package com.afk.control.service.impl;

import com.afk.control.dto.ApartamentoDto;
import com.afk.control.dto.MultimediaDto;
import com.afk.control.mapper.MultimediaMapper;
import com.afk.control.service.MultimediaService;
import com.afk.model.entity.Apartamento;
import com.afk.model.entity.Multimedia;
import com.afk.model.repository.MultimediaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MultimediaServiceImpl implements MultimediaService {

    private final MultimediaRepository multimediaRepository;
    private final MultimediaMapper multimediaMapper;

    @Override
    public MultimediaDto createMultimedia(MultimediaDto multimediaDto) {
        Multimedia multimedia = multimediaMapper.toEntity(multimediaDto);
        Multimedia savedMultimedia = multimediaRepository.save(multimedia);
        return multimediaMapper.toDto(savedMultimedia);
    }

    @Override
    public MultimediaDto findMultimediaById(Long id) {
        Multimedia multimedia = multimediaRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Multimedia con ID " + id + " no encontrado"));
        return multimediaMapper.toDto(multimedia);
    }

    @Override
    public List<MultimediaDto> findAllMultimedias() {
        List<Multimedia> multimedias = multimediaRepository.findAll();
        return multimedias.stream()
                .map(multimediaMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public void deleteMultimediaById(Long id) {
        if (!multimediaRepository.existsById(id)) {
            throw new NoSuchElementException("Multimedia con ID " + id + " no encontrado para eliminar");
        }
        multimediaRepository.deleteById(id);
    }

    @Override
    public List<MultimediaDto> findMultimediasByPublicacion(Long publicacionId) {
        List<Multimedia> multimedias = multimediaRepository.findByPublicacionId(publicacionId);
        return multimedias.stream()
                .map(multimediaMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<MultimediaDto> findMultimediasByTipo(Long tipoMultimediaId) {
        List<Multimedia> multimedias = multimediaRepository.findByTipoId(tipoMultimediaId);
        return multimedias.stream()
                .map(multimediaMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public MultimediaDto updateMultimedia(Long id, MultimediaDto multimediaDto) {
        Multimedia existingMultimedia = multimediaRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Apartamento no encontrado"));
        multimediaMapper.updateEntityFromDto(multimediaDto,existingMultimedia);
        Multimedia updatedMultimedia = multimediaRepository.save(existingMultimedia);
        return multimediaMapper.toDto(updatedMultimedia);
    }
}
