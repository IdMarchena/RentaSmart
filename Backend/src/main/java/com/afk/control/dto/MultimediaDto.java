package com.afk.control.dto;
import com.afk.model.entity.enums.TipoMultimedia;

public record MultimediaDto(
        Long id,
        String url,
        TipoMultimedia tipo,
        Long idPublicacion,
        Integer orden
) {
}
