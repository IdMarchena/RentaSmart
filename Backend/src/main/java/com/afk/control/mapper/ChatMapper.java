package com.afk.control.mapper;

import com.afk.client.external.dto.ChatRequest;
import com.afk.client.external.dto.ChatResponse;
import com.afk.model.entity.Chat;
import com.afk.model.entity.Usuario;
import org.mapstruct.*;

import java.time.LocalDateTime;
import java.util.List;

@Mapper(componentModel = "spring",
        imports = {LocalDateTime.class},
        uses = {com.afk.control.mapper.UsuarioMapper.class})
public interface ChatMapper {

    default Usuario map(Long id) {
        if (id == null) return null;
        Usuario usuario = new Usuario();
        usuario.setId(id);
        return usuario;
    }

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "usuarioa", source = "senderId")
    @Mapping(target = "usuariob", source = "receiverId")
    @Mapping(target = "mensaje", source = "message")
    @Mapping(target = "estado_chat", source = "status")
    Chat toEntity(ChatRequest chatRequest);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "senderId", target = "usuarioa.id")
    @Mapping(source = "receiverId", target = "usuariob.id")
    @Mapping(source = "message", target = "mensaje")
    @Mapping(source = "status", target = "estado_chat")
    ChatResponse toResponse(Chat chat);

    List<ChatResponse> toResponseList(List<Chat> chats);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "usuarioa", ignore = true)
    @Mapping(target = "usuariob", ignore = true)
    void updateEntityFromRequest(@MappingTarget Chat entity, ChatRequest request);
}