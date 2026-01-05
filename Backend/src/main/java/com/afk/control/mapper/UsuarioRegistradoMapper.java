package com.afk.control.mapper;
import com.afk.control.dto.UsuarioRegistradoDto;
import com.afk.model.entity.*;
import org.mapstruct.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring",
        uses = {RolMapper.class,
                UbicacionMapper.class
                }
)
public interface UsuarioRegistradoMapper {

    @Mapping(target = "rol", source = "idRol", qualifiedByName = "RolFromId")
    @Mapping(target = "ubicacion", source = "idUbicacion", qualifiedByName = "ubicacionFromId")
    @Mapping(target = "nombre", ignore = true)
    @Mapping(target = "correo", ignore = true)
    @Mapping(target = "clave", ignore = true)
    UsuarioRegistrado toEntity(UsuarioRegistradoDto dto);

    @Mapping(target = "idRol", source = "rol.id")
    @Mapping(target = "idUbicacion", source = "ubicacion.id")
    UsuarioRegistradoDto toDto(UsuarioRegistrado usuario);

    @Named("usuarioRegistradoToDtoList")
    default List<UsuarioRegistradoDto> toDtoList(Iterable<UsuarioRegistrado> usuarios){
        return StreamSupport.stream(usuarios.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Named("usuarioRegistradoToEntityList")
    default List<UsuarioRegistrado> toEntityList(Iterable<UsuarioRegistradoDto> usuarios){
        return StreamSupport.stream(usuarios.spliterator(),false)
                .map(this::toEntity)
                .collect(Collectors.toList());
    }
}
