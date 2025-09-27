package com.afk.control.mapper;

import com.afk.control.dto.AlquilerDto;
import com.afk.model.entity.*;
import org.mapstruct.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring")
public interface AlquilerMapper {

    @Named("mapH")
    default List<HistorialInquilino> mapH(List<Long> ids) {
        if (ids == null) return null;
        return ids.stream().map(id -> {
            HistorialInquilino h = new HistorialInquilino();
            h.setId(id);
            return h;
        }).collect(Collectors.toList());
    }
    @Named("mapFc")
    default List<Factura> mapFc(List<Long> ids) {
        if (ids == null) return null;
        return ids.stream().map(id -> {
            Factura factura = new Factura();
            factura.setId(id);
            return factura;
        }).collect(Collectors.toList());
    }

    @Named("mapS")
    default List<Servicio> mapS(List<Long> ids) {
        if (ids == null) return null;
        return ids.stream().map(id -> {
            Servicio servicio = new Servicio();
            servicio.setId(id);
            return servicio;
        }).collect(Collectors.toList());
    }

    @Named("mapC")
    default List<Calificacion> mapC(List<Long> ids){
        if (ids == null) return null;
        return ids.stream().map(id -> {
            Calificacion c = new Calificacion();
            c.setId(id);
            return c;
        }).collect(Collectors.toList());
    }
    @Named("mapCi")
    default List<Cita> mapCi(List<Long> ids){
        if (ids == null) return null;
        return ids.stream().map(id -> {
            Cita cita = new Cita();
            cita.setId(id);
            return cita;
        }).collect(Collectors.toList());
    }

    @Named("mapF")
    default List<Favorito> mapF(List<Long> ids){
        if (ids == null) return null;
        return ids.stream().map(id -> {
            Favorito f = new Favorito();
            f.setId(id);
            return f;
        }).collect(Collectors.toList());
    }
    @Named("mapP")
    default List<Publicacion> mapP(List<Long> ids){
        if (ids == null) return null;
        return ids.stream().map(id -> {
            Publicacion p = new Publicacion();
            p.setId(id);
            return p;
        }).collect(Collectors.toList());
    }
    @Named("mapI")
    default List<Inmueble> mapE(List<Long> ids){
        if (ids == null) return null;
        return ids.stream().map(id -> {
            Inmueble inmueble = new Inmueble();
            inmueble.setId(id);
            return inmueble;
        }).collect(Collectors.toList());
    }
    @Named("mapSs")
    default List<SolicitudServicio> mapSs(List<Long> ids){
        if (ids == null) return null;
        return ids.stream().map(id -> {
            SolicitudServicio solicitudServicio = new SolicitudServicio();
            solicitudServicio.setId(id);
            return solicitudServicio;
        }).collect(Collectors.toList());
    }

    @Named("mapCh")
    default List<Chat> mapCh(List<Long> ids){
        if (ids == null) return null;
        return ids.stream().map(id -> {
            Chat chat = new Chat();
            chat.setId(id);
            return chat;
        }).collect(Collectors.toList());
    }

    default String parseFecha(LocalDateTime fecha) {
        return fecha != null ? fecha.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) : null;
    }

    default LocalDateTime parseFecha(String fecha) {
        return fecha != null ? LocalDateTime.parse(fecha, DateTimeFormatter.ISO_LOCAL_DATE_TIME) : null;
    }

    @Mapping(target = "fechaInicio", expression = "java(parseFecha(dto.fechaInicio()))")
    @Mapping(target = "fechaFin", expression = "java(parseFecha(dto.fechaFin()))")
    @Mapping(target = "historialInquilinos", expression = "java(mapH(dto.idsHistorialInquilino()))")
    @Mapping(target = "facturas", expression = "java(mapFc(dto.idsFacturas()))")
    @Mapping(target = "calificacion", expression = "java(mapC(dto.idsCalificaciones()))")
    @Mapping(target = "citas", expression = "java(mapCi(dto.idsCitas()))")
    @Mapping(target = "favorito", expression = "java(mapF(dto.idsFavoritos()))")
    @Mapping(target = "publicacions", expression = "java(mapP(dto.idsPublicaciones()))")
    @Mapping(target = "inmuebles", expression = "java(mapI(dto.idsInmuebles()))")
    @Mapping(target = "solicitudServicios", expression = "java(mapSs(dto.idsSolicitudesServicio()))")
    @Mapping(target = "chats", expression = "java(mapCh(dto.idsChats()))")
    Alquiler toEntity(AlquilerDto dto);

    @Mapping(source = "fechaInicio", target = "fechaInicio")
    @Mapping(source = "fechaFin", target = "fechaFin")
    @Mapping(target = "idsHistorialInquilino", expression = "java(alquiler.getHistorialInquilinos() != null ? alquiler.getHistorialInquilinos().stream().map(h -> h.getId()).collect(java.util.stream.Collectors.toList()) : null)")
    @Mapping(target = "idsFacturas", expression = "java(alquiler.getFactura() != null ? alquiler.getFactura().stream().map(f -> f.getId()).collect(java.util.stream.Collectors.toList()) : null)")
    @Mapping(target = "idsServicios", expression = "java(alquiler.getServicios() != null ? alquiler.getServicios().stream().map(s -> s.getId()).collect(java.util.stream.Collectors.toList()) : null)")
    @Mapping(target = "idsCalificaciones", expression = "java(alquiler.getCalificacion() != null ? alquiler.getCalificacion().stream().map(c -> c.getId()).collect(java.util.stream.Collectors.toList()) : null)")
    @Mapping(target = "idsCitas", expression = "java(alquiler.getCitas() != null ? alquiler.getCitas().stream().map(c -> c.getId()).collect(java.util.stream.Collectors.toList()) : null)")
    @Mapping(target = "idsFavoritos", expression = "java(alquiler.getFavorito() != null ? alquiler.getFavorito().stream().map(f -> f.getId()).collect(java.util.stream.Collectors.toList()) : null)")
    @Mapping(target = "idsPublicaciones", expression = "java(alquiler.getPublicacions() != null ? alquiler.getPublicacions().stream().map(p -> p.getId()).collect(java.util.stream.Collectors.toList()) : null)")
    @Mapping(target = "idsInmuebles", expression = "java(alquiler.getInmuebles() != null ? alquiler.getInmuebles().stream().map(i -> i.getId()).collect(java.util.stream.Collectors.toList()) : null)")
    @Mapping(target = "idsSolicitudesServicio", expression = "java(alquiler.getSolicitudServicios() != null ? alquiler.getSolicitudServicios().stream().map(s -> s.getId()).collect(java.util.stream.Collectors.toList()) : null)")
    @Mapping(target = "idsChats", expression = "java(alquiler.getChats() != null ? alquiler.getChats().stream().map(c -> c.getId()).collect(java.util.stream.Collectors.toList()) : null)")
    AlquilerDto toDto(Alquiler alquiler);


    default List<AlquilerDto> toDtoList(Iterable<Alquiler> alquilers) {
        return StreamSupport.stream(alquilers.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "historialInquilinos", ignore = true)
    @Mapping(target = "factura", ignore = true)
    @Mapping(target = "servicios", ignore = true)
    @Mapping(target = "calificacion", ignore = true)
    @Mapping(target = "citas", ignore = true)
    @Mapping(target = "favorito", ignore = true)
    @Mapping(target = "publicacions", ignore = true)
    @Mapping(target = "inmuebles", ignore = true)
    @Mapping(target = "solicitudServicios", ignore = true)
    @Mapping(target = "chats", ignore = true)
    void updateEntityFromDto(@MappingTarget Alquiler entity, AlquilerDto dto);

}
