package com.afk.control.mapper;
import com.afk.control.dto.CitaDto;
import com.afk.model.entity.Cita;
import com.afk.model.entity.Servicio;
import com.afk.model.entity.SolicitudServicio;
import com.afk.model.entity.Usuario;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring")
@Component
public interface CitaMapper {

    @Named("mapU")
    default Usuario mapU(Long id){
        if(id == null) return null;
        Usuario usuario = new Usuario();
        usuario.setId(id);
        return usuario;
    }
    @Named("mapS")
    default Servicio mapP(Long id){
        if(id == null) return null;
        Servicio postulacion = new Servicio();
        postulacion.setId(id);
        return postulacion;
    }
    @Named("mapSs")
    default SolicitudServicio mapE(Long id){
        if(id == null) return null;
        SolicitudServicio empresa = new SolicitudServicio();
        empresa.setId(id);
        return empresa;
    }
    default String parseFecha(LocalDateTime fecha) {
        return fecha != null ? fecha.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) : null;
    }

    default LocalDateTime parseFecha(String fecha) {
        return fecha != null ? LocalDateTime.parse(fecha, DateTimeFormatter.ISO_LOCAL_DATE_TIME) : null;
    }



    @Mapping(target = "fecha", expression = "java(parseFecha(dto.fecha()))")
    @Mapping(target = "usuario", source = "idUsuario", qualifiedByName = "mapU")
    @Mapping(target = "estado_cita", source = "estadoCita")
    @Mapping(target = "servicio", source = "idServicio", qualifiedByName = "mapS")
    @Mapping(target = "solicitudServicio", source = "idSolicitudServicio", qualifiedByName = "mapS")
    Cita toEntity(CitaDto citaDto);

    @Mapping(source = "fecha", target = "fecha")
    @Mapping(source = "usuario.id", target = "idUsuarioPostulante")
    @Mapping(source = "estado_cita", target = "estadoCita")
    @Mapping(source = "servicio.id", target = "idServicio")
    @Mapping(source = "solicitudServicio.id", target = "idSolicitudServicio")
    CitaDto toDto(Cita cita);

    default List<CitaDto> toDtoList(Iterable<Cita> citas) {
        return StreamSupport.stream(citas.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }



    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(CitaDto dto, @MappingTarget Cita entity);
}
