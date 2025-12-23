package com.afk.control.mapper;

import com.afk.control.dto.RequisitoDto;
import com.afk.model.entity.Requisito;
import org.mapstruct.*;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring",
        uses = {
                TipoRequisitoMapper.class
                }
        )
public interface RequisitoMapper {

    @Named("requisitoFromId")
    default Requisito requisitoFromId(Long id) {
        if (id == null) return null;
        Requisito requisito = new Requisito();
        requisito.setId(id);
        return requisito;
    }
    @Named("requisitoFromDto")
    default RequisitoDto requisitoFromDto(Requisito requisito) {
        if (requisito == null) return null;
        RequisitoDto requisitoDto = new RequisitoDto(
                requisito.getId(),
                requisito.getDescripcion(),
                requisito.getTipo().getId()
        );
        return requisitoDto;
    }

    @Mapping(target="tipo",source="idTipo",qualifiedByName = "TipoRequisitoFromId")
    Requisito toEntity(RequisitoDto dto);

    @Mapping(target = "tipo", source = "tipo.id")

    RequisitoDto toDto(Requisito requisito);

    @Named("requisitoToDtoList")
    default List<RequisitoDto> toDtoList(Iterable<Requisito> requisitos) {
        return StreamSupport.stream(requisitos.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }
    @Named("requisitoToEntityList")
    default List<Requisito> toEntityList(Iterable<RequisitoDto> requisitoDtos) {
        return StreamSupport.stream(requisitoDtos.spliterator(),false)
                .map(this::toEntity)
                .collect(Collectors.toList());
    }
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(RequisitoDto dto, @MappingTarget Requisito entity);
}
