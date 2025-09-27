package com.afk.control.mapper;

import com.afk.control.dto.SancionDto;
import com.afk.control.service.dto.SolicitudServicioDto;
import com.afk.model.entity.*;
import org.mapstruct.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring")
public interface SolicitudServicioMapper {
    @Named("mapU")
    default Usuario mapU(Long id){
        if(id == null) return null;
        Usuario usuario = new Usuario();
        usuario.setId(id);
        return usuario;
    }

    @Named("mapS")
    default Servicio mapS(Long id){
        if(id == null) return null;
        Servicio servicio = new Servicio();
        servicio.setId(id);
        return servicio;
    }
    @Named("mapI")
    default Inmueble mapI(Long id){
        if(id == null) return null;
        Inmueble inmueble = new Inmueble();
        inmueble.setId(id);
        return inmueble;
    }
    default String parseFecha(LocalDateTime fecha) {
        return fecha != null ? fecha.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) : null;
    }

    default LocalDateTime parseFecha(String fecha) {
        return fecha != null ? LocalDateTime.parse(fecha, DateTimeFormatter.ISO_LOCAL_DATE_TIME) : null;
    }

    @Mapping(target = "servicio", source = "idServicio", qualifiedByName = "mapS")
    @Mapping(target = "usuario", source = "idUsuario", qualifiedByName = "mapU")
    @Mapping(target = "inmueble", source = "idInmueble", qualifiedByName = "mapI")
    @Mapping(target = "fecha", expression = "java(parseFecha(dto.fecha()))")
    @Mapping(target = "estado", source = "estado")
    SolicitudServicio toEntity(SolicitudServicioDto dto);

    @Mapping(source = "servicio.id", target = "idServicio")
    @Mapping(source = "usuario.id", target = "idUsuario")
    @Mapping(source = "inmueble.id", target = "idInmueble")
    @Mapping(source = "fecha", target = "fecha")
    @Mapping(source = "estado", target = "estado")
    SolicitudServicioDto toDto(SolicitudServicio solicitudServicio);

    default List<SolicitudServicioDto> toDtoList(Iterable<SolicitudServicio> solicitudServicios) {
        return StreamSupport.stream(solicitudServicios.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(SolicitudServicioDto dto, @MappingTarget SolicitudServicio entity);
}
