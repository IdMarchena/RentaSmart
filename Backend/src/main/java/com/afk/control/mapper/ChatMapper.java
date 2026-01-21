package com.afk.control.mapper;
import com.afk.control.dto.ChattDto;
import com.afk.model.entity.Chat;
import com.afk.model.entity.Usuario;
import org.mapstruct.*;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring",
        uses = {UsuarioMapper.class,
                MensajeMapper.class})
public interface ChatMapper {

    @Named("chatFromId")
    default Chat fromId(Long id) {
        if (id == null) return null;
        Chat chat = new Chat();
        chat.setId(id);
        return chat;
    }

    default Usuario map(Long id) {
        if (id == null) return null;
        Usuario usuario = new Usuario();
        usuario.setId(id);
        return usuario;
    }

    @Mapping(target="usuarioa",source ="idUsuarioA",qualifiedByName = "usuarioFromId")
    @Mapping(target="usuariob",source ="idUsuarioB",qualifiedByName = "usuarioFromId")
    @Mapping(target="mensajes",source ="idsMensaje",qualifiedByName = "mensajesFromIds")
    Chat toEntity(ChattDto chatDto);

    @Mapping(target="idUsuarioA",source ="usuarioa.id")
    @Mapping(target="idUsuarioB",source ="usuariob.id")
    @Mapping(target="idsMensaje",source ="mensajes",qualifiedByName = "mensajesToIds")
    ChattDto toDto(Chat chat);

    @Named("mensajesToDtoList")
    default List<ChattDto> toDtoList(List<Chat> chats){
        if (chats == null) return null;
        return StreamSupport.stream(chats.spliterator(),false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Named("mensajesToEntityList")
    default List<Chat> toEntityList(List<ChattDto> chats){
        if (chats == null) return null;
        return StreamSupport.stream(chats.spliterator(),false)
                .map(this::toEntity)
                .collect(Collectors.toList());
    }

    @Mapping(target="usuarioa",source ="idUsuarioA",qualifiedByName = "usuarioFromId")
    @Mapping(target="usuariob",source ="idUsuarioB",qualifiedByName = "usuarioFromId")
    @Mapping(target="mensajes",source ="idsMensaje",qualifiedByName = "mensajesFromIds")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromRequest(@MappingTarget Chat entity, ChattDto request);
}