package com.afk.control.mapper;

import com.afk.control.dto.HabitacionDto;
import com.afk.model.entity.Habitacion;
import org.mapstruct.*;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring")
public interface HabitacionMapper {

    @Named("habitacionFromId")
    default Habitacion habitacionFromId(Long id) {
        if (id == null) return null;
        Habitacion habitacion = new Habitacion();
        habitacion.setId(id);
        return habitacion;
    }

    @Named("habitacionesFromIds")
    default List<Habitacion> habitacionesFromIds(Collection<Long> ids) {
        if (ids == null || ids.isEmpty()) {
            return Collections.emptyList();
        }
        List<Habitacion> habitaciones = new ArrayList<>();
        return habitaciones.stream()
                .filter(habitacion -> ids.contains(habitacion.getId()))
                .collect(Collectors.toList());
    }
    @Named("habitacionesToIds")
    default List<Long> habitacionesToIds(List<Habitacion> habitaciones) {
        if (habitaciones == null) {
            return null;
        }
        return habitaciones.stream()
                .map(Habitacion::getId)  // Obtener el id de cada Habitacion
                .collect(Collectors.toList());
    }

    @Named("habitacionFromDto")
    default HabitacionDto habitacionFromDto(Habitacion habitacion) {
        if (habitacion == null) return null;
        HabitacionDto dto = new HabitacionDto(
                habitacion.getId(),
                habitacion.getCapacidad(),
                habitacion.getPrecio(),
                habitacion.getEstado()
        );
        return dto;
    }

    Habitacion toEntity(HabitacionDto chatRequest);

    HabitacionDto toDto(Habitacion chat);

    @Named("habitacionToDtoList")
    default List<HabitacionDto> toDtoList(Iterable<Habitacion> habitaciones) {
        return StreamSupport.stream(habitaciones.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Named("habitacionToEntityList")
    default List<Habitacion> toEntityList(Iterable<HabitacionDto> habitaciones) {
        return StreamSupport.stream(habitaciones.spliterator(),false)
                .map(this::toEntity)
                .collect(Collectors.toList());
    }

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "capacidad", ignore = true)
    @Mapping(target = "precio", ignore = true)
    @Mapping(target = "estado", ignore = true)
    void updateEntityFromDto(@MappingTarget Habitacion entity, HabitacionDto dto);
}
