package com.afk.control.mapper;
import com.afk.control.dto.ApartamentoDto;
import com.afk.model.entity.Apartamento;
import org.mapstruct.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring",
        uses = {HabitacionMapper.class
        })
public interface ApartamentoMapper {
    default List<Apartamento> mapHabitaciones(List<Long> ids) {
        if (ids == null) return null;
        return ids.stream().map(id -> {
            Apartamento h = new Apartamento();
            h.setId(id);
            return h;
        }).collect(Collectors.toList());
    }
    @Mapping(target = "habitaciones", expression = "java(mapHabitaciones(dto.mapHabitaciones()))")
    Apartamento toEntity(ApartamentoDto dto);

    @Mapping(target = "idsHabitaciones", expression = "java(apartamento.getHabitaicon() != null ? apartamento.getHabitaicon().stream().map(e -> e.getId()).collect(java.util.stream.Collectors.toList()) : null)")
    ApartamentoDto toDto(Apartamento apartamento);

    default List<ApartamentoDto> toDtoList(Iterable<Apartamento> apartamentos) {
        return StreamSupport.stream(apartamentos.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "habitaciones", ignore = true)
    void updateEntityFromDto(@MappingTarget Apartamento entity, ApartamentoDto dto);

}
