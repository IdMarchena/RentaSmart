package com.afk.control.dto;
import com.afk.model.entity.enums.EstadoChat;
import java.time.LocalDateTime;

public record MensajeDto(Long id,
                         Long idChat,
                         Long idEmisor,
                         String contenido,
                         EstadoChat estado,
                         LocalDateTime fechaEnvio) {
}
