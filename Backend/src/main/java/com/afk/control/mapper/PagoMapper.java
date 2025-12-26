package com.afk.control.mapper;
import com.afk.control.dto.PagoDto;
import com.afk.model.entity.*;
import org.mapstruct.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring")
public interface PagoMapper {
    @Named("mapT")
    default TipoPago mapT(Long id){
        if(id == null) return null;
        TipoPago tipoPago = new TipoPago();
        tipoPago.setId(id);
        return tipoPago;
    }
    default String parseFecha(LocalDateTime fecha) {
        return fecha != null ? fecha.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) : null;
    }

    default LocalDateTime parseFecha(String fecha) {
        return fecha != null ? LocalDateTime.parse(fecha, DateTimeFormatter.ISO_LOCAL_DATE_TIME) : null;
    }

    @Mapping(target = "fecha", expression = "java(parseFecha(dto.fecha()))")
    @Mapping(target="monto",source="monto")
    @Mapping(target = "tipo", source = "idTipo", qualifiedByName = "mapT")
    @Mapping(target="estado",source="estado")
    Pago toEntity(PagoDto pagoDto);

    @Mapping(source = "fecha", target = "fecha")
    @Mapping(source="monto",target="monto")
    @Mapping(source = "tipo.id", target = "idTipo")
    @Mapping(source="estado",target="estado")
    PagoDto toDto(Pago pago);

    default List<PagoDto> toDtoList(Iterable<Pago> pagos) {
        return StreamSupport.stream(pagos.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(PagoDto dto, @MappingTarget Pago entity);
}
