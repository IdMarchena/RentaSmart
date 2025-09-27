package com.afk.control.mapper;


import com.afk.client.external.dto.UbicacionDt;
import com.afk.control.dto.TipoServicioDto;
import com.afk.model.entity.TipoServicio;
import com.afk.model.entity.Ubicacion;
import org.mapstruct.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring")
public interface UbicacionMapper {

    @Mapping(source = "id", target = "id_ubicacion")
    @Mapping(target = "id_padre", expression = "java(ubicacion.getPadre() != null ? ubicacion.getPadre().getId() : null)")
    UbicacionDt toDto(Ubicacion ubicacion);

    @Mapping(source = "id_ubicacion", target = "id")
    @Mapping(target = "padre", expression = "java(dto.id_padre() != null ? new Ubicacion(dto.id_padre(), null, null, null, null, null) : null)")
    Ubicacion toEntity(UbicacionDt dto);

    default List<UbicacionDt> toDtoList(Iterable<Ubicacion> ubicacions) {
        return StreamSupport.stream(ubicacions.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(UbicacionDt dto, @MappingTarget Ubicacion entity);

    List<Ubicacion> toEntities(List<UbicacionDt> ubicacionDtos);
}
