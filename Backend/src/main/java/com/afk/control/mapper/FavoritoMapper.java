package com.afk.control.mapper;

import com.afk.control.dto.FavoritoDto;
import com.afk.model.entity.Favorito;
import com.afk.model.entity.Usuario;
import com.afk.model.entity.Publicacion;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface FavoritoMapper {
    @Named("mapU")
    default Usuario mapUsuario(Long id) {
        if (id == null) return null;
        Usuario usuario = new Usuario();
        usuario.setId(id);
        return usuario;
    }
    @Named("mapP")
    default Publicacion mapPublicacion(Long id) {
        if (id == null) return null;
        Publicacion pub = new Publicacion();
        pub.setId(id);
        return pub;
    }

    @Mapping(target = "usuario.id", source = "idUsuario")
    @Mapping(target = "publicacion.id", source = "idPublicacion")
    FavoritoDto toDto(Favorito favorito);

    @Mapping(source = "usuario",  target = "idUsuario", qualifiedByName = "mapU")
    @Mapping(source = "publicacion", target = "idPublicacion", qualifiedByName = "mapP")
    Favorito toEntity(FavoritoDto favoritoDto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(FavoritoDto dto, @MappingTarget Favorito entity);
}
