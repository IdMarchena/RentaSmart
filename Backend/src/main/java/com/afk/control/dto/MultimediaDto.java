package com.afk.control.dto;
import com.afk.model.entity.enums.EstadoMultimedia;

public record MultimediaDto(
        Long id,
        String url,
        EstadoMultimedia tipo,
        Long idPublicacion,
        Integer orden
) {
}
