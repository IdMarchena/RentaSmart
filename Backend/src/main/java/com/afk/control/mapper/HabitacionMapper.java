package com.afk.control.mapper;

import com.afk.control.dto.HabitacionDto;
import com.afk.model.entity.Habitacion;
import org.mapstruct.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring")
public interface HabitacionMapper {

    @Mapping(target = "capacidad", source = "capacidad")
    @Mapping(target = "precio", source = "precio")
    @Mapping(target = "estado", source = "estado")
    Habitacion toEntity(HabitacionDto chatRequest);

    @Mapping(source = "capacidad", target = "capacidad")
    @Mapping(source = "precio", target = "precio")
    @Mapping(source = "estado", target = "estado")
    HabitacionDto toDto(Habitacion chat);

    default List<HabitacionDto> toDtoList(Iterable<Habitacion> habitaciones) {
        return StreamSupport.stream(habitaciones.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "capacidad", ignore = true)
    @Mapping(target = "precio", ignore = true)
    @Mapping(target = "estado", ignore = true)
    void updateEntityFromDto(@MappingTarget Habitacion entity, HabitacionDto dto);
}
