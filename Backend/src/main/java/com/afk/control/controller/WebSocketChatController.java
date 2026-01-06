package com.afk.control.controller;

import com.afk.control.dto.MensajeDto;
import com.afk.control.service.ChatService;
import com.afk.control.service.MensajeService;
import com.afk.model.entity.enums.EstadoChat;
import lombok.AllArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Controller;

import java.security.Principal;
import java.time.LocalDateTime;

@AllArgsConstructor
@Controller
public class WebSocketChatController {

    private final MensajeService mensajeService;
    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    @MessageMapping("/chat.send.{chatId}")
    public void handlePrivateMessage(
            @Payload MensajeDto mensajeDto,
            @DestinationVariable Long chatId,
            Principal principal) {
        MensajeDto mensajeParaGuardar = new MensajeDto(
                null,
                chatId,
                mensajeDto.idEmisor(),
                mensajeDto.contenido(),
                EstadoChat.ENVIADO,
                LocalDateTime.now()
        );
        MensajeDto savedMessage = mensajeService.crearMensaje(mensajeParaGuardar);
        messagingTemplate.convertAndSend("/topic/chat." + chatId, savedMessage);
    }

    @MessageMapping("/chat.addUser.{chatId}")
    @SendTo("/topic/chat.{chatId}")
    public MensajeDto addUser(
            @Payload MensajeDto mensajeDto,
            @DestinationVariable Long chatId) {
        return mensajeDto;
    }

    @MessageMapping("/chat.markAsRead.{chatId}.{usuarioId}")
    public void markAsRead(
            @DestinationVariable Long chatId,
            @DestinationVariable Long usuarioId) {
        mensajeService.marcarMensajesComoLeidos(chatId, usuarioId);
        messagingTemplate.convertAndSend("/topic/chat." + chatId + ".status", "LEIDO");
    }
}