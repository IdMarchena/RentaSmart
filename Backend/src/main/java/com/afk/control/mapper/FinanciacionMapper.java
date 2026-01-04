package com.afk.control.mapper;
import com.afk.control.dto.FinanciacionDto;
import com.afk.model.entity.Financiacion;
import org.mapstruct.*;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring")
public interface FinanciacionMapper {

    @Named("financiacionFromId")
    default Financiacion financiacionFromId(Long id) {
        if (id == null) return null;
        Financiacion financiacion = new Financiacion();
        financiacion.setId(id);
        return financiacion;
    }

    Financiacion toEntity(FinanciacionDto financiacionDto);

    FinanciacionDto toDto(Financiacion financiacion);

    @Named("financiacionToDtoList")
    default List<FinanciacionDto> toDtoList(Iterable<Financiacion> financiacions) {
        return StreamSupport.stream(financiacions.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Named("financiacionToEntityList")
    default List<Financiacion> toEntityList(Iterable<FinanciacionDto> financiacionDtos) {
        return StreamSupport.stream(financiacionDtos.spliterator(),false)
                .map(this::toEntity)
                .collect(Collectors.toList());
    }

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(FinanciacionDto dto, @MappingTarget Financiacion entity);
}
