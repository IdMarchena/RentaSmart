package com.afk.control.mapper;

import com.afk.control.dto.FacturaDto;
import com.afk.model.entity.*;
import org.mapstruct.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring")
public interface FacturaMapper {

    @Named("mapU")
    default Usuario mapU(Long id){
        if(id == null) return null;
        Usuario usuario = new Usuario();
        usuario.setId(id);
        return usuario;
    }
    @Named("mapP")
    default Pago mapP(Long id){
        if(id == null) return null;
        Pago pago = new Pago();
        pago.setId(id);
        return pago;
    }
    @Named("mapC")
    default Contrato mapC(Long id){
        if(id == null) return null;
        Contrato contrato = new Contrato();
        contrato.setId(id);
        return contrato;
    }
    @Named("mapS")
    default Servicio mapS(Long id){
        if(id == null) return null;
        Servicio servicio = new Servicio();
        servicio.setId(id);
        return servicio;
    }

    default String parseFecha(LocalDateTime fecha) {
        return fecha != null ? fecha.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) : null;
    }

    default LocalDateTime parseFecha(String fecha) {
        return fecha != null ? LocalDateTime.parse(fecha, DateTimeFormatter.ISO_LOCAL_DATE_TIME) : null;
    }
    @Mapping(target = "fechaEmision", expression = "java(parseFecha(dto.fechaEmision()))")
    @Mapping(target="detalle",source="detalle")
    @Mapping(target = "usuario", source = "idUsuario", qualifiedByName = "mapU")
    @Mapping(target = "reporteMantenimiento", source = "idReporteMantenimiento", qualifiedByName = "mapR")
    @Mapping(target = "pago", source = "idPago", qualifiedByName = "mapP")
    @Mapping(target = "contrato", source = "idContrato", qualifiedByName = "mapC")
    @Mapping(target = "servicio", source = "idServicio", qualifiedByName = "mapS")
    Factura toEntity(FacturaDto facturaDto);

    @Mapping(source = "fechaInicio", target = "fechaInicio")
    @Mapping(source="detalle",target="detalle")
    @Mapping(source = "usuario.id", target = "idUsuario")
    @Mapping(source = "reporteMantenimiento.id", target = "idReporteMantenimiento")
    @Mapping(source = "pago.id", target = "idPago")
    @Mapping(source = "contrato.id", target = "idContrato")
    @Mapping(source = "servicio.id", target = "idServicio")
    FacturaDto toDto(Factura factura);

    default List<FacturaDto> toDtoList(Iterable<Factura> facturas) {
        return StreamSupport.stream(facturas.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }



    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(FacturaDto dto, @MappingTarget Factura entity);
}
