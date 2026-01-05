package com.afk.control.service;

import com.afk.control.dto.MultimediaDto;

import java.util.List;

public interface MultimediaService {

    MultimediaDto createMultimedia(MultimediaDto multimediaDto);

    MultimediaDto findMultimediaById(Long id);

    List<MultimediaDto> findAllMultimedias();

    void deleteMultimediaById(Long id);

    List<MultimediaDto> findMultimediasByPublicacion(Long publicacionId);

    List<MultimediaDto> findMultimediasByTipo(String tipo);

    MultimediaDto updateMultimedia(Long id, MultimediaDto multimediaDto);

    List<MultimediaDto> findAllMultimediasByIds(List<Long> ids);
}
