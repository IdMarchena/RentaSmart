package com.afk.control.service.impl;
import com.afk.client.external.dto.ChatRequest;
import com.afk.client.external.dto.ChatResponse;
import com.afk.control.service.ChatService;
import com.afk.model.entity.Chat;
import com.afk.model.entity.Usuario;
import com.afk.model.entity.enums.EstadoChat;
import com.afk.model.repository.ChatRepository;
import com.afk.model.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final ChatRepository chatRepository;
    private final UsuarioRepository usuarioRepository;

    @Override
    @Transactional
    public ChatResponse createChat(ChatRequest chatRequest) {
        Usuario sender = usuarioRepository.findById(chatRequest.senderId())
                .orElseThrow(() -> new RuntimeException("Usuario remitente no encontrado"));

        Usuario receiver = usuarioRepository.findById(chatRequest.receiverId())
                .orElseThrow(() -> new RuntimeException("Usuario destinatario no encontrado"));

        Chat chat = Chat.builder()
                .usuarioa(sender)
                .usuariob(receiver)
                .mensaje(chatRequest.message())
                .estado_chat(chatRequest.status() != null ? chatRequest.status() : EstadoChat.ENVIADO)
                .fechaCreacion(LocalDateTime.now())
                .build();

        Chat savedChat = chatRepository.save(chat);
        return toChatResponse(savedChat);
    }

    @Override
    public ChatResponse getChatById(Long id) {
        Chat chat = chatRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Chat no encontrado"));
        return toChatResponse(chat);
    }

    @Override
    public List<ChatResponse> getAllChats() {
        return chatRepository.findAll().stream()
                .map(this::toChatResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public ChatResponse updateChat(Long id, ChatRequest chatRequest) {
        Chat chat = chatRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Chat no encontrado"));

        if (chatRequest.message() != null) {
            chat.setMensaje(chatRequest.message());
        }
        if (chatRequest.status() != null) {
            chat.setEstado_chat(chatRequest.status());
        }

        Chat updatedChat = chatRepository.save(chat);
        return toChatResponse(updatedChat);
    }

    @Override
    public void deleteChat(Long id) {
        if (!chatRepository.existsById(id)) {
            throw new RuntimeException("Chat no encontrado");
        }
        chatRepository.deleteById(id);
    }

    @Override
    public List<ChatResponse> getChatsByUser(Long userId) {
        return chatRepository.findByUsuarioId(userId).stream()
                .map(this::toChatResponse)
                .collect(Collectors.toList());
    }

    @Override
    public List<ChatResponse> getChatsBetweenUsers(Long user1Id, Long user2Id) {
        return chatRepository.findChatsBetweenUsers(user1Id, user2Id).stream()
                .map(this::toChatResponse)
                .collect(Collectors.toList());
    }

    private ChatResponse toChatResponse(Chat chat) {
        return new ChatResponse(
                chat.getId(),
                chat.getUsuarioa().getId(),
                chat.getUsuariob().getId(),
                chat.getMensaje(),
                chat.getEstado_chat(),
                chat.getFechaCreacion()
        );
    }
    @Override
    @Transactional
    public void updateChatStatus(Long chatId, EstadoChat status) {
        Chat chat = chatRepository.findById(chatId)
                .orElseThrow(() -> new RuntimeException("Chat no encontrado"));
        chat.setEstado_chat(status); // Actualiza el estado
        chatRepository.save(chat); // Guarda el cambio
    }
}