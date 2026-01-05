package com.afk.control.mapper;
import com.afk.control.dto.TipoMultimediaDto;
import com.afk.model.entity.TipoMultimedia;
import org.mapstruct.*;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring")
public interface TipoMultimediaMapper {

    @Named("tipoMultimediaFromId")
    default TipoMultimedia fromId(Long id) {
        if (id == null) return null;
        TipoMultimedia tipoMultimedia = new TipoMultimedia();
        tipoMultimedia.setId(id);
        return tipoMultimedia;
    }


    TipoMultimedia toEntity(TipoMultimediaDto tipo);


    TipoMultimediaDto toDto(TipoMultimedia tipoMultimedia);


    @Named("tipoMultimediaToDtoList")
    default List<TipoMultimediaDto> toDtoList(Iterable<TipoMultimedia> tiposmultimedia) {
        return StreamSupport.stream(tiposmultimedia.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Named("tipoMultimediaToEntityList")
    default List<TipoMultimedia> toEntityList(Iterable<TipoMultimediaDto> tiposmultimedia) {
        return StreamSupport.stream(tiposmultimedia.spliterator(), false)
                .map(this::toEntity)
                .collect(Collectors.toList());
    }


    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(TipoMultimediaDto dto, @MappingTarget TipoMultimedia entity);

}
