package com.afk.control.dto;

import com.afk.model.entity.enums.EstadoChat;
import java.time.LocalDateTime;
import java.util.List;

public record ChattDto(Long id,
                       String nombre,
                       Long idUsuarioA,
                       Long idUsuarioB,
                       List<Long> idsMensaje,
                       EstadoChat estado_chat,
                       LocalDateTime fechaCreacion) {
}
