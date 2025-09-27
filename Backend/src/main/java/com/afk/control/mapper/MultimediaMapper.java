package com.afk.control.mapper;

import com.afk.control.dto.MultimediaDto;
import com.afk.model.entity.*;
import org.mapstruct.*;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring")
public interface MultimediaMapper {
    @Named("mapP")
    default Usuario mapP(Long id){
        if(id == null) return null;
        Usuario usuario = new Usuario();
        usuario.setId(id);
        return usuario;
    }
    @Named("mapT")
    default Inmueble mapT(Long id){
        if(id == null) return null;
        Inmueble inmueble = new Inmueble();
        inmueble.setId(id);
        return inmueble;
    }
    @Mapping(target="url",source="url")
    @Mapping(target = "tipo", source = "idTIpo", qualifiedByName = "mapT")
    @Mapping(target = "publicacion", source = "idPublicacion", qualifiedByName = "mapP")
    Multimedia toEntity(MultimediaDto multimediaDto);

    @Mapping(source = "url", target = "url")
    @Mapping(source = "tipo.id", target = "idTIpo")
    @Mapping(source = "publicacion.id", target = "idPublicacion")
    MultimediaDto toDto(Multimedia multimedia);

    default List<MultimediaDto> toDtoList(Iterable<Multimedia> multimedia) {
        return StreamSupport.stream(multimedia.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(MultimediaDto dto, @MappingTarget Multimedia entity);
}
