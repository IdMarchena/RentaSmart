package com.afk.control.service;


import com.afk.client.external.dto.ChatRequest;
import com.afk.client.external.dto.ChatResponse;
import com.afk.model.entity.enums.EstadoChat;

import java.util.List;

public interface ChatService {
    ChatResponse createChat(ChatRequest chatRequest);
    ChatResponse getChatById(Long id);
    List<ChatResponse> getAllChats();
    ChatResponse updateChat(Long id, ChatRequest chatRequest);
    void deleteChat(Long id);
    List<ChatResponse> getChatsByUser(Long userId);
    List<ChatResponse> getChatsBetweenUsers(Long user1Id, Long user2Id);
    void updateChatStatus(Long chatId, EstadoChat status);
}
