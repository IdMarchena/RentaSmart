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
    @Named("TipoRequisitoFromId")
    default TipoRequisito fromId(Long id){
        if(id == null) return null;
        TipoRequisito tipoRequisito = new TipoRequisito();
        tipoRequisito.setId(id);
        return tipoRequisito;
    }

    @Named("mapTipoRequisitodto")
    default TipoRequisitoDto fromDto(TipoRequisito tipoRequisito){
        if(tipoRequisito == null) return null;
        TipoRequisitoDto tipoRequisitoDto = new TipoRequisitoDto(
                tipoRequisito.getId(),
                tipoRequisito.getNombre()
        );
        return tipoRequisitoDto;
    }

    TipoRequisito toEntity(TipoRequisitoDto dto);


    TipoRequisitoDto toDto(TipoRequisito tipoRequisito);

    @Named("mapToDtoTipoRequisitoList")
    default List<TipoRequisitoDto> toDtoList(List<TipoRequisito> tiposRequisito) {
        return tiposRequisito.stream()
                .map(this::toDto)
                .collect(Collectors.toList());
    }
    @Named("mapToEntityTipoRequisitoList")
    default List<TipoRequisito> toEntityList(List<TipoRequisitoDto> tiposRequisitoDto) {
        return tiposRequisitoDto.stream()
                .map(this::toEntity)
                .collect(Collectors.toList());
    }

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(TipoRequisitoDto dto, @MappingTarget TipoRequisito entity);


}