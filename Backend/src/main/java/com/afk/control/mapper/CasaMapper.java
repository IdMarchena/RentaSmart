package com.afk.control.mapper;
import com.afk.control.dto.CasaDto;
import com.afk.model.entity.Casa;
import org.mapstruct.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring")
public interface CasaMapper {

    @Mapping(target = "numeroPisos",source = "numeroPisos")
    Casa toEntity(CasaDto casaDto);

    @Mapping(source = "numeroPisos",target = "numeroPisos")
    CasaDto toDto(Casa casa);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(CasaDto dto, @MappingTarget Casa entity);

    default List<CasaDto> toDtoList(Iterable<Casa> casas) {
        return StreamSupport.stream(casas.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "habitaciones", ignore = true)
    void updateEntityFromDto(@MappingTarget Casa entity, CasaDto dto);

}
