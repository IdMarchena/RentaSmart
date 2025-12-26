package com.afk.control.dto;
import com.afk.model.entity.enums.EstadoNotificacion;
import java.time.LocalDateTime;
public record NotificacionDto(
        Integer id,
        String mensaje,
        LocalDateTime fecha,
        Long idUsuario,
        Long idServicio,
        EstadoNotificacion estado
) {}