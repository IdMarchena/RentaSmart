package com.afk.control.mapper;
import com.afk.control.dto.CasaDto;
import com.afk.model.entity.Casa;
import org.mapstruct.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring")
public interface CasaMapper {

    @Named("casFromId")
    default Casa fromId(Long id) {
        if (id == null) return null;
        Casa casa = new Casa();
        casa.setId(id);
        return casa;
    }

    Casa toEntity(CasaDto casaDto);

    CasaDto toDto(Casa casa);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(CasaDto dto, @MappingTarget Casa entity);

    @Named("casasToDtoList")
    default List<CasaDto> toDtoList(Iterable<Casa> casas) {
        return StreamSupport.stream(casas.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }
    @Named("casasToDtoEntity")
    default List<Casa> toEntityList(Iterable<CasaDto> casasDtos) {
        return StreamSupport.stream(casasDtos.spliterator(),false)
                .map(this::toEntity)
                .collect(Collectors.toList());
    }
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "habitaciones", ignore = true)
    void updateEntityFromDto(@MappingTarget Casa entity, CasaDto dto);

}
