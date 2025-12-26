package com.afk.control.mapper;
import com.afk.control.dto.ContratoDto;
import com.afk.model.entity.*;
import org.mapstruct.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring")
public interface ContratoMapper {
    @Named("mapU")
    default Usuario mapU(Long id){
        if(id == null) return null;
        Usuario usuario = new Usuario();
        usuario.setId(id);
        return usuario;
    }
    @Named("mapI")
    default Inmueble mapI(Long id){
        if(id == null) return null;
        Inmueble inmueble = new Inmueble();
        inmueble.setId(id);
        return inmueble;
    }
    @Named("mapF")
    default Financiacion mapF(Long id){
        if(id == null) return null;
        Financiacion financiacion = new Financiacion();
        financiacion.setId(id);
        return financiacion;
    }
    @Named("mapD")
    default Deposito mapD(Long id){
        if(id == null) return null;
        Deposito deposito = new Deposito();
        deposito.setId(id);
        return deposito;
    }

    default String parseFecha(LocalDateTime fecha) {
        return fecha != null ? fecha.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) : null;
    }

    default LocalDateTime parseFecha(String fecha) {
        return fecha != null ? LocalDateTime.parse(fecha, DateTimeFormatter.ISO_LOCAL_DATE_TIME) : null;
    }
    @Mapping(target="contenido",source="contenido")
    @Mapping(target = "usuarioArrendatario", source = "idUsuarioArrendatario", qualifiedByName = "mapU")
    @Mapping(target = "usuarioArrendador", source = "idUsuarioArrendador", qualifiedByName = "mapU")
    @Mapping(target = "inmueble", source = "idInmueble", qualifiedByName = "mapI")
    @Mapping(target = "financiacion", source = "idFinanciacion", qualifiedByName = "mapF")
    @Mapping(target = "fechaInicio", expression = "java(parseFecha(dto.fechaInicio()))")
    @Mapping(target = "fechaFinalizacion", expression = "java(parseFecha(dto.fechaFinalizacion()))")
    @Mapping(target="precio",source="precio")
    @Mapping(target = "deposito",source="idDeposito",qualifiedByName = "mapD")
    @Mapping(source = "estadoContrato", target = "estadoContrato")
    Contrato toEntity(ContratoDto contratoDto);

    @Mapping(source = "contenido", target = "contenido")
    @Mapping(source = "usuario.id", target = "idUsuarioArrendatario")
    @Mapping(source = "usuario.id", target = "idUsuarioArrendador")
    @Mapping(source = "inmueble.id", target = "idInmueble")
    @Mapping(source = "financiacion.id", target = "idFinanciacion")
    @Mapping(source = "fechaInicio", target = "fechaInicio")
    @Mapping(source = "fechaFinalizacion", target = "fechaFinalizacion")
    @Mapping(source = "precio", target = "precio")
    @Mapping(source = "deposito.id", target = "idDepposito")
    @Mapping(source = "estadoContrato", target = "estadoContrato")
    ContratoDto toDto(Contrato contrato);

    default List<ContratoDto> toDtoList(Iterable<Contrato> contratos) {
        return StreamSupport.stream(contratos.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }



    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(ContratoDto dto, @MappingTarget Contrato entity);
}
