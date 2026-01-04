package com.afk.control.mapper;

import com.afk.control.dto.TipoMultimediaDto;
import com.afk.model.entity.TipoMultimedia;
import org.mapstruct.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring")
public interface TipoMultimediaMapper {
    @Mapping(target="id",source="id")
    @Mapping(target = "tipo", source = "tipo")
    TipoMultimedia toEntity(TipoMultimediaDto tipo);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "descripcion", target = "descripcion")
    TipoMultimediaDto toDto(TipoMultimedia tipoMultimedia);

    default List<TipoMultimediaDto> toDtoList(Iterable<TipoMultimedia> tiposmultimedia) {
        return StreamSupport.stream(tiposmultimedia.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(TipoMultimediaDto dto, @MappingTarget TipoMultimedia entity);

}
