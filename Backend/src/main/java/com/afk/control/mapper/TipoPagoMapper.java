package com.afk.control.mapper;
import com.afk.control.dto.TipoMultimediaDto;
import com.afk.control.dto.TipoPagoDto;
import com.afk.model.entity.TipoMultimedia;
import com.afk.model.entity.TipoPago;
import org.mapstruct.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring")
public interface TipoPagoMapper {
    @Mapping(target="id",source="id")
    @Mapping(target = "descripcion", source = "descripcion")
    TipoPago toEntity(TipoPagoDto tipo);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "descripcion", target = "descripcion")
    TipoPagoDto toDto(TipoPago TipoPago);

    default List<TipoPagoDto> toDtoList(Iterable<TipoPago> tiposPagos) {
        return StreamSupport.stream(tiposPagos.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(TipoPagoDto dto, @MappingTarget TipoPago entity);
}
