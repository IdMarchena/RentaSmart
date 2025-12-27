package com.afk.control.mapper;
import com.afk.control.dto.TipoServicioDto;
import com.afk.model.entity.TipoServicio;
import org.mapstruct.*;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring")
public interface TipoServicioMapper {

    @Named("tipoServicioFromId")
    default TipoServicio fromId(Long id) {
        if (id == null) return null;
        TipoServicio tipoServicio = new TipoServicio();
        tipoServicio.setId(id);
        return tipoServicio;
    }

    TipoServicio toEntity(TipoServicioDto tipo);

    TipoServicioDto toDto(TipoServicio TipoServicio);

    @Named("tipoServicioToDtoList")
    default List<TipoServicioDto> toDtoList(Iterable<TipoServicio> tiposServicio) {
        return StreamSupport.stream(tiposServicio.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Named("tipoServicioToEntityList")
    default List<TipoServicio> toEntityList(Iterable<TipoServicioDto> tiposServicioDto) {
        return StreamSupport.stream(tiposServicioDto.spliterator(),false)
                .map(this::toEntity)
                .collect(Collectors.toList());
    }

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(TipoServicioDto dto, @MappingTarget TipoServicio entity);
}
