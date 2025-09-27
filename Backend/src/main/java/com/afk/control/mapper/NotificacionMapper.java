package com.afk.control.mapper;
import com.afk.control.dto.NotificacionDto;
import com.afk.model.entity.Notificacion;
import com.afk.model.entity.Servicio;
import com.afk.model.entity.Usuario;
import org.mapstruct.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring")
public interface NotificacionMapper {

    @Named("mapU")
    default  Usuario mapU(Long id) {
        if (id == null) return null;
        Usuario usuario = new Usuario();
        usuario.setId(id);
        return usuario;
    }
    @Named("mapS")
    default Servicio mapS(Long id) {
        if (id == null) return null;
        Servicio servicio = new Servicio();
        servicio.setId(id);
        return servicio;
    }

    @Mapping(target = "usuario", source = "idUsuario", qualifiedByName = "mapU")
    @Mapping(target = "servicio", source = "idServicio", qualifiedByName = "mapS")
    @Mapping(target = "estado", source = "estado")
    Notificacion toEntity(NotificacionDto notificacionDto);

    @Mapping(source = "usuario.id", target = "idUsuario")
    @Mapping(source = "servicio.id", target = "idServicio")
    @Mapping(source = "estado", target = "estado")
    NotificacionDto toDto(Notificacion notificacion);


    default List<NotificacionDto> toDtoList(Iterable<Notificacion> notificacions) {
        return StreamSupport.stream(notificacions.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }
    List<Notificacion> toEntityList(List<NotificacionDto> dtos);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(NotificacionDto dto, @MappingTarget Notificacion entity);



}
