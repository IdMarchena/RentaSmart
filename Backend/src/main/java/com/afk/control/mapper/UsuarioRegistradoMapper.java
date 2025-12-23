package com.afk.control.mapper;
import com.afk.control.dto.UsuarioRegistradoDto;
import com.afk.model.entity.*;
import org.mapstruct.*;

import java.util.List;

@Mapper(
        componentModel = "spring",
        uses = {
                RolMapper.class,
                UbicacionMapper.class
        }
)
public interface UsuarioRegistradoMapper {

    @Mapping(target = "rol", source = "rol", qualifiedByName = "RolFromId")
    @Mapping(target = "ubicacion", source = "ubicacion", qualifiedByName = "ubicacionFromId")
    @Mapping(
            target = "fechaRegistro",
            expression = "java(java.time.LocalDateTime.now())"
    )
    @Mapping(target = "estado_usuario_registrado", source = "estado")
    UsuarioRegistrado toEntity(UsuarioRegistradoDto dto);

    @Mapping(target = "rol", source = "rol.id")
    @Mapping(target = "ubicacion", source = "ubicacion.id")
    UsuarioRegistradoDto toDto(UsuarioRegistrado usuario);

    List<UsuarioRegistradoDto> toDtoList(List<UsuarioRegistrado> usuarios);

}
