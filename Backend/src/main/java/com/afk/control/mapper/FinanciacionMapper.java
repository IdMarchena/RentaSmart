package com.afk.control.mapper;
import com.afk.control.dto.FinanciacionDto;
import com.afk.model.entity.Financiacion;
import org.mapstruct.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring")
public interface FinanciacionMapper {

    @Mapping(target="numeroCuotas",source="numeroCuotas")
    @Mapping(target="valorCuota",source="valorCuota")
    @Mapping(target="montoTotal",source="montoTotal")
    @Mapping(target="interes",source="interes")
    Financiacion toEntity(FinanciacionDto financiacionDto);

    @Mapping(source="numeroCuotas",target="numeroCuotas")
    @Mapping(source="valorCuota",target="valorCuota")
    @Mapping(source="montoTotal",target="montoTotal")
    @Mapping(source="interes",target="interes")
    FinanciacionDto toDto(Financiacion financiacion);

    default List<FinanciacionDto> toDtoList(Iterable<Financiacion> financiacions) {
        return StreamSupport.stream(financiacions.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }



    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(FinanciacionDto dto, @MappingTarget Financiacion entity);
}
