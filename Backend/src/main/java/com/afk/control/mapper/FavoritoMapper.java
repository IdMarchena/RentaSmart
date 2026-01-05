package com.afk.control.mapper;
import com.afk.control.dto.FavoritoDto;
import com.afk.model.entity.Favorito;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring",
        uses = {UsuarioMapper.class,
                PublicacionMapper.class})
@Component
public interface FavoritoMapper {

    @Named("favoritoFromId")
    default Favorito fromId(Long id) {
        if (id == null) return null;
        Favorito favorito = new Favorito();
        favorito.setId(id);
        return favorito;
    }

    @Mapping(target = "usuario",  source = "idUsuario", qualifiedByName = "usuarioFromId")
    @Mapping(target = "publicacion", source = "idPublicacion", qualifiedByName = "publicacionFromId")
    Favorito toEntity(FavoritoDto favoritoDto);

    @Mapping(target = "idUsuario", source = "usuario.id")
    @Mapping(target = "idPublicacion", source = "publicacion.id")
    FavoritoDto toDto(Favorito favorito);



    @Named("favoritoToDtoList")
    default List<FavoritoDto> toDtoList(Iterable<Favorito> favoritos) {
        if (favoritos == null) return null;
        return StreamSupport.stream(favoritos.spliterator(),false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Named("favoritoToEntityList")
    default List<Favorito> toEntityList(Iterable<FavoritoDto> favoritoDtos) {
        if (favoritoDtos == null) return null;
        return StreamSupport.stream(favoritoDtos.spliterator(),false)
                .map(this::toEntity)
                .collect(Collectors.toList());
    }

    @Mapping(target = "usuario", source = "idUsuario", qualifiedByName = "usuarioFromId")
    @Mapping(target = "publicacion", source = "idPublicacion", qualifiedByName = "publicacionFromId")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(FavoritoDto dto, @MappingTarget Favorito entity);
}
