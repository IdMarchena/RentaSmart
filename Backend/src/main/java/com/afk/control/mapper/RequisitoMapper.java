package com.afk.control.mapper;

import com.afk.control.dto.ReporteMantenimientoDto;
import com.afk.control.dto.RequisitoDto;
import com.afk.model.entity.Inmueble;
import com.afk.model.entity.ReporteMantenimiento;
import com.afk.model.entity.Requisito;
import com.afk.model.entity.TipoRequisito;
import org.mapstruct.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring")
public interface RequisitoMapper {

    @Named("mapI")
    default Inmueble mapI(Long id) {
        if (id == null) return null;
        Inmueble inmueble = new Inmueble();
        inmueble.setId(id);
        return inmueble;
    }

    @Named("mapT")
    default TipoRequisito mapT(Long id) {
        if (id == null) return null;
        TipoRequisito tipo = new TipoRequisito();
        tipo.setId(id);
        return tipo;
    }

    @Mapping(target="descripcion", source = "descripcion")
    @Mapping(target="inmueble",source="idInmueble",qualifiedByName ="mapI" )
    @Mapping(target="tipo",source="idTipo",qualifiedByName = "mapT")
    Requisito toEntity(RequisitoDto dto);

    @Mapping(source="descripcion", target = "descripcion")
    @Mapping(source = "inmueble.id", target = "inmueble")
    @Mapping(source = "tipo.id", target = "tipo")

    RequisitoDto toDto(Requisito requisito);

    default List<RequisitoDto> toDtoList(Iterable<Requisito> requisitos) {
        return StreamSupport.stream(requisitos.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(RequisitoDto dto, @MappingTarget Requisito entity);
}
