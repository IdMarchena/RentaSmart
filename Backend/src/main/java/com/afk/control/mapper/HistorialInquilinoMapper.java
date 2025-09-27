package com.afk.control.mapper;
import com.afk.control.dto.HistorialInquilinoDto;
import com.afk.model.entity.Contrato;
import com.afk.model.entity.HistorialInquilino;
import com.afk.model.entity.Usuario;
import org.mapstruct.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
@Mapper(componentModel = "spring")
public interface HistorialInquilinoMapper {

    @Named("mapU")
    default Usuario mapU(Long id){
        if(id == null) return null;
        Usuario usuario = new Usuario();
        usuario.setId(id);
        return usuario;
    }
    @Named("mapC")
    default Contrato mapC(Long id){
        if(id == null) return null;
        Contrato contrato = new Contrato();
        contrato.setId(id);
        return contrato;
    }

    default String parseFecha(LocalDateTime fecha) {
        return fecha != null ? fecha.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) : null;
    }

    default LocalDateTime parseFecha(String fecha) {
        return fecha != null ? LocalDateTime.parse(fecha, DateTimeFormatter.ISO_LOCAL_DATE_TIME) : null;
    }
    @Mapping(target = "fecha_historial_postulante", expression = "java(parseFecha(dto.fecha_historial_postulante()))")
    @Mapping(target = "usuario", source = "idUsuario", qualifiedByName = "mapU")
    @Mapping(target = "contrato", source = "idContrato", qualifiedByName = "mapC")
    HistorialInquilino toEntity(HistorialInquilinoDto historialInquilinoDto);

    @Mapping(source = "fecha_historial_postulante", target = "contenido")
    @Mapping(source = "usuario.id", target = "idUsuarioArrendatario")
    @Mapping(source = "contrato.id", target = "idContrato")
    HistorialInquilinoDto toDto(HistorialInquilino historialInquilino);

    default List<HistorialInquilinoDto> toDtoList(Iterable<HistorialInquilino> historialInquilinos) {
        return StreamSupport.stream(historialInquilinos.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }



    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(HistorialInquilinoDto dto, @MappingTarget HistorialInquilino entity);
}
