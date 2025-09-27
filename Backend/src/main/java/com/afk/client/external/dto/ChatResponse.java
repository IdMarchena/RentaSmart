package com.afk.client.external.dto;



import com.afk.model.entity.enums.EstadoChat;

import java.time.LocalDateTime;

public record ChatResponse(
        Long id,
        Long senderId,
        Long receiverId,
        String message,
        EstadoChat status,
        LocalDateTime createdAt
) {}
