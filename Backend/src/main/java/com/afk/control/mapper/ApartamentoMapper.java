package com.afk.control.mapper;
import com.afk.control.dto.ApartamentoDto;
import com.afk.model.entity.Apartamento;
import com.afk.model.entity.Habitacion;
import org.mapstruct.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring",
        uses = {HabitacionMapper.class
        })
public interface ApartamentoMapper {

    @Named("apartamentoFromId")
    default Apartamento apartamentoFromId(Long id) {
        if (id == null) return null;
        Apartamento apartamento = new Apartamento();
        apartamento.setId(id);
        return apartamento;
    }

    @Named("habitacionesIds")
    default List<Long> habitacionesIds(Apartamento a) {
        if (a == null) return null;
        List<Habitacion> h= a.getHabitaciones();
        return h.stream()
                .map(Habitacion::getId)
                .collect(Collectors.toList());
    }

    @Named("apartametoFromDto")
    default ApartamentoDto apartamentoToDto(Apartamento apartamento) {
        if (apartamento == null) return null;
        ApartamentoDto dto = new ApartamentoDto(
                apartamento.getId(),
                this.habitacionesIds(apartamento),
                apartamento.getDescripcion()

        );
        return dto;
    }

    default List<Apartamento> mapHabitaciones(List<Long> ids) {
        if (ids == null) return null;
        return ids.stream().map(id -> {
            Apartamento h = new Apartamento();
            h.setId(id);
            return h;
        }).collect(Collectors.toList());
    }
    @Mapping(target = "habitaciones", source = "idsHabitaciones",qualifiedByName = "habitacionesFromIds")
    Apartamento toEntity(ApartamentoDto dto);

    @Mapping(target = "idsHabitaciones", source = "habitaciones", qualifiedByName = "habitacionesToIds")
    ApartamentoDto toDto(Apartamento apartamento);


    @Named("habitacionToDtoList")
    default List<ApartamentoDto> toDtoList(Iterable<Apartamento> apartamentos) {
        return StreamSupport.stream(apartamentos.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }
    @Named("habitacionToEntityList")
    default List<Apartamento> toEntityList(Iterable<ApartamentoDto> apartamentos) {
        return StreamSupport.stream(apartamentos.spliterator(),false)
                .map(this::toEntity)
                .collect(Collectors.toList());
    }

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "habitaciones", ignore = true)
    void updateEntityFromDto(@MappingTarget Apartamento entity, ApartamentoDto dto);

}
