package com.afk.control.mapper;

import com.afk.control.dto.MultimediaDto;
import com.afk.model.entity.*;
import org.mapstruct.*;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring",
        uses = {PublicacionMapper.class
                }
        )
public interface MultimediaMapper {

    @Named("multimediaFromId")
    default Multimedia multimediaFromId(Long id) {
        if (id == null) return null;
        Multimedia multimedia = new Multimedia();
        multimedia.setId(id);
        return multimedia;
    }

    @Named("calificacioFromId")
    default Multimedia fromId(Long id) {
        if (id == null) return null;
        Multimedia multimedia = new Multimedia();
        multimedia.setId(id);
        return multimedia;
    }

    @Named("multimediasFromIds")
    default List<Multimedia> multimediasFromIds(List<Long> ids) {
        if (ids == null) return null;
        return ids.stream().map(this::multimediaFromId).collect(Collectors.toList());
    }

    @Named("multimediasToIds")
    default List<Long> calificacionesToIds(List<Calificacion> calificaciones) {
        if (calificaciones == null) return List.of();
        return calificaciones.stream()
                .map(Calificacion::getId)
                .collect(Collectors.toList());
    }

    @Mapping(target = "publicacion", source = "idPublicacion", qualifiedByName = "publicacionFromId")
    Multimedia toEntity(MultimediaDto multimediaDto);

    @Mapping(target="idPublicacion",source="publicacion.id")
    MultimediaDto toDto(Multimedia multimedia);

    @Named("multimediToDtoList")
    default List<MultimediaDto> toDtoList(Iterable<Multimedia> multimedia) {
        return StreamSupport.stream(multimedia.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Named("multimediaToEntityList")
    default List<Multimedia> toEntityList(Iterable<MultimediaDto> multimedias) {
        return StreamSupport.stream(multimedias.spliterator(),false)
                .map(this::toEntity)
                .collect(Collectors.toList());
    }

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(MultimediaDto dto, @MappingTarget Multimedia entity);
}
