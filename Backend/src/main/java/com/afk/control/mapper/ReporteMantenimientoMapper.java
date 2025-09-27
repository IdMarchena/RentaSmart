package com.afk.control.mapper;

import com.afk.control.dto.ContratoDto;
import com.afk.control.dto.ReporteMantenimientoDto;
import com.afk.control.dto.TipoReporteDto;
import com.afk.model.entity.*;
import org.mapstruct.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring")
public interface ReporteMantenimientoMapper {
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
    @Named("mapT")
    default TipoReporte mapT(Long id){
        if(id == null) return null;
        TipoReporte tipoReporte = new TipoReporte();
        tipoReporte.setId(id);
        return tipoReporte;
    }
    default String parseFecha(LocalDateTime fecha) {
        return fecha != null ? fecha.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) : null;
    }

    default LocalDateTime parseFecha(String fecha) {
        return fecha != null ? LocalDateTime.parse(fecha, DateTimeFormatter.ISO_LOCAL_DATE_TIME) : null;
    }
    @Mapping(target="descripcion", source="descripcion")
    @Mapping(target = "fecha", expression = "java(parseFecha(dto.fecha()))")
    @Mapping(target = "servicio", source = "idServicio", qualifiedByName = "mapS")
    @Mapping(target = "usuarioProfesional", source = "idUsuarioProfesional", qualifiedByName = "mapU")
    @Mapping(target = "usuarioGenerador", source = "idUsuarioGenerador", qualifiedByName = "mapU")
    @Mapping(target="estado",source="estado")
    @Mapping(target = "tipo", source = "idTipo", qualifiedByName = "mapT")
    ReporteMantenimiento toEntity(ReporteMantenimientoDto reporteMantenimientoDto);

    @Mapping(source="descripcion", target="descripcion")
    @Mapping(source = "fecha", target = "fecha")
    @Mapping(source = "servicio.id", target = "idServicio")
    @Mapping(source = "usuario.id", target = "idUsuarioProfesional")
    @Mapping(source = "usuario.id", target = "idUsuarioGenerador")
    @Mapping(source="estado",target="estado")
    @Mapping(source = "tipo.id", target = "idTipo")
    ReporteMantenimientoDto toDto(ReporteMantenimiento reporteMantenimiento);

    default List<ReporteMantenimientoDto> toDtoList(Iterable<ReporteMantenimiento> reporteMantenimientos) {
        return StreamSupport.stream(reporteMantenimientos.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(ReporteMantenimientoDto dto, @MappingTarget ReporteMantenimiento entity);
}
