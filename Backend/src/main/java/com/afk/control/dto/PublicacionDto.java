package com.afk.control.dto;
import com.afk.model.entity.enums.EstadoPublicacion;
import java.time.LocalDateTime;
import java.util.List;

public record PublicacionDto(
        Long id,
        String titulo,
        String descripcion,
        Long idInmueble,
        LocalDateTime fechaPublicacion,
        EstadoPublicacion estadoPublicacion,
        List<Long> calificacionesIds,
        Long idUsuario,
        Double precio,
        List<MultimediaDto> multimedia
) {}