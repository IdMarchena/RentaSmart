package com.afk.control.mapper;

import com.afk.control.dto.TipoReporteDto;
import com.afk.control.dto.TipoRequisitoDto;
import com.afk.control.dto.TipoServicioDto;
import com.afk.model.entity.TipoReporte;
import com.afk.model.entity.TipoRequisito;
import com.afk.model.entity.TipoServicio;
import org.mapstruct.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring")
public interface TipoServicioMapper {


    @Mapping(target = "descripcion", source = "descripcion")
    TipoServicio toEntity(TipoServicioDto tipo);


    @Mapping(source = "descripcion", target = "descripcion")
    TipoServicioDto toDto(TipoServicio TipoServicio);

    default List<TipoServicioDto> toDtoList(Iterable<TipoServicio> tiposServicio) {
        return StreamSupport.stream(tiposServicio.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(TipoServicioDto dto, @MappingTarget TipoServicio entity);
}
