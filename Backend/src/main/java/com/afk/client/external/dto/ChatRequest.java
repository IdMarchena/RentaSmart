package com.afk.client.external.dto;


import com.afk.model.entity.enums.EstadoChat;

public record ChatRequest(
        Long senderId,
        Long receiverId,
        String message,
        EstadoChat status
) {}
