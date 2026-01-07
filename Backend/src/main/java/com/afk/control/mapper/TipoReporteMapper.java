package com.afk.control.mapper;

import com.afk.control.dto.TipoReporteDto;
import com.afk.model.entity.TipoReporte;
import org.mapstruct.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring")
public interface TipoReporteMapper {
    @Mapping(target="id",source="id")
    @Mapping(target = "descripcion", source = "descripcion")
    @Mapping(target = "tipo", source = "tipo")
    TipoReporte toEntity(TipoReporteDto tipo);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "descripcion", target = "descripcion")
    @Mapping(source = "tipo", target = "tipo")
    TipoReporteDto toDto(TipoReporte TipoReporte);

    default List<TipoReporteDto> toDtoList(Iterable<TipoReporte> tiposReportes) {
        return StreamSupport.stream(tiposReportes.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(TipoReporteDto dto, @MappingTarget TipoReporte entity);
}
