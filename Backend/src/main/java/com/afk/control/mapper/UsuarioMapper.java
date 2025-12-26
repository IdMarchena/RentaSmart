package com.afk.control.mapper;
import com.afk.control.dto.UsuarioDto;
import com.afk.model.entity.Usuario;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import java.util.List;

@Mapper(componentModel = "spring")
public interface UsuarioMapper {

    @Mapping(source = "contrasenia", target = "clave")
    Usuario toEntity(UsuarioDto dto);

    @Mapping(source = "clave", target = "contrasenia")
    UsuarioDto toDto(Usuario usuario);

    List<UsuarioDto> toDto(List<Usuario> usuarios);

    List<Usuario> toEntity(List<UsuarioDto> usuarioDtos);
}

