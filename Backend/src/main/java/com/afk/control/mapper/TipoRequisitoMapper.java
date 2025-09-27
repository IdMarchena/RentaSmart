package com.afk.control.mapper;

import com.afk.control.dto.TipoReporteDto;
import com.afk.control.dto.TipoRequisitoDto;
import com.afk.model.entity.TipoReporte;
import com.afk.model.entity.TipoRequisito;
import org.mapstruct.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring")
public interface TipoRequisitoMapper {

    @Mapping(target = "nombre", source = "nombre")
    TipoRequisito toEntity(TipoRequisitoDto dto);

    @Mapping(source = "nombre", target = "nombre")
    TipoRequisitoDto toDto(TipoRequisito tipoRequisito);

    default List<TipoRequisitoDto> toDtoList(List<TipoRequisito> tiposRequisito) {
        return tiposRequisito.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(TipoRequisitoDto dto, @MappingTarget TipoRequisito entity);


}