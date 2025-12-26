package com.afk.control.mapper;
import com.afk.control.dto.ReporteFinancieroDto;
import com.afk.model.entity.*;
import org.mapstruct.*;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring")
public interface ReporteFinancieroMapper {

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

    @Mapping(target = "usuario", source = "idUsuario", qualifiedByName = "mapU")
    @Mapping(target = "inmueble", source = "idInmueble", qualifiedByName = "mapI")
    @Mapping(target="contenido",source="contenido")
    @Mapping(target = "fecha", expression = "java(parseFecha(dto.fecha()))")
    @Mapping(target = "tipo", source = "idTipo", qualifiedByName = "mapT")
    @Mapping(target = "estado",source="estado")
    ReporteFinanciero toEntity(ReporteFinancieroDto reporteFinancieroDto);

    @Mapping(source = "usuario.id", target = "idUsuario")
    @Mapping(source = "inmueble.id", target = "idInmueble")
    @Mapping(source = "contenido", target = "contenido")
    @Mapping(source = "fechaInicio", target = "fechaInicio")
    @Mapping(source = "tipo.id", target = "idTipo")
    @Mapping(source="estado",target="estado")
    ReporteFinancieroDto toDto(ReporteFinanciero reporteFinanciero);

    default List<ReporteFinancieroDto> toDtoList(Iterable<ReporteFinanciero> reporteFinancieros) {
        return StreamSupport.stream(reporteFinancieros.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(ReporteFinancieroDto dto, @MappingTarget ReporteFinanciero entity);
}
