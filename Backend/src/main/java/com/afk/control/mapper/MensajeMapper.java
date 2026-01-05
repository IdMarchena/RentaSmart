package com.afk.control.mapper;
import com.afk.control.dto.MensajeDto;
import com.afk.model.entity.Chat;
import com.afk.model.entity.Mensaje;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring",
        uses = {UsuarioMapper.class})
@Component
public interface MensajeMapper {

    @Named("mensajeFromId")
    default Mensaje mensajeFromId(Long id) {
        if (id == null) return null;
        Mensaje mensaje = new Mensaje();
        mensaje.setId(id);
        return mensaje;
    }

    @Named("mensajesFromIds")
    default List<Mensaje> multimediasFromIds(List<Long> ids) {
        if (ids == null) return null;
        return ids.stream().map(this::mensajeFromId).collect(Collectors.toList());
    }

    @Named("mensajesToIds")
    default List<Long> calificacionesToIds(List<Mensaje> mensajes) {
        if (mensajes == null) return List.of();
        return mensajes.stream()
                .map(Mensaje::getId)
                .collect(Collectors.toList());
    }

    @Named("chatFromId")
    default Chat chatFromId(Long id) {
        if (id == null) return null;
        Chat chat = new Chat();
        chat.setId(id);
        return chat;
    }

    @Mapping(target = "chat",source = "idChat", qualifiedByName = "chatFromId")
    @Mapping(target = "emisor",source = "idEmisor", qualifiedByName = "usuarioFromId")
    Mensaje toEntity(MensajeDto mensajeDto);

    @Mapping(target = "idEmisor", source = "emisor.id")
    @Mapping(target = "idChat", source = "chat.id")
    MensajeDto toDto(Mensaje mensaje);

    @Named("calificacionToDtoList")
    default List<MensajeDto> toDtoList(Iterable<Mensaje> mensajes) {
        if (mensajes == null) return null;
        return StreamSupport.stream(mensajes.spliterator(),false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Named("calificacionToEntityList")
    default List<Mensaje> toEntityList(Iterable<MensajeDto> mensajes) {
        if (mensajes == null) return null;
        return StreamSupport.stream(mensajes.spliterator(),false)
                .map(this::toEntity)
                .collect(Collectors.toList());

    }

    @Mapping(target = "chat",source = "idChat", qualifiedByName = "chatFromId")
    @Mapping(target = "emisor",source = "idEmisor", qualifiedByName = "usuarioFromId")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(MensajeDto dto, @MappingTarget Mensaje entity);


}
