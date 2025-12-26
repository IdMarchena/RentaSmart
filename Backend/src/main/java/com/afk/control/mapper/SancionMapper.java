package com.afk.control.mapper;
import com.afk.control.dto.SancionDto;
import com.afk.model.entity.Publicacion;
import com.afk.model.entity.Sancion;
import com.afk.model.entity.Usuario;
import org.mapstruct.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring")
public interface SancionMapper {

    @Named("mapU")
    default Usuario mapU(Long id){
        if(id == null) return null;
        Usuario usuario = new Usuario();
        usuario.setId(id);
        return usuario;
    }

    @Named("mapP")
    default Publicacion mapP(Long id){
        if(id == null) return null;
        Publicacion publicacion = new Publicacion();
        publicacion.setId(id);
        return publicacion;
    }
    default String parseFecha(LocalDateTime fecha) {
        return fecha != null ? fecha.format(DateTimeFormatter.ISO_LOCAL_DATE_TIME) : null;
    }

    default LocalDateTime parseFecha(String fecha) {
        return fecha != null ? LocalDateTime.parse(fecha, DateTimeFormatter.ISO_LOCAL_DATE_TIME) : null;
    }

    @Mapping(target="descripcion",source="descripcion")
    @Mapping(target = "usuario", source = "idUsuario", qualifiedByName = "mapU")
    @Mapping(target = "publicacion", source = "idPublicacion", qualifiedByName = "mapP")
    @Mapping(target = "fecha", expression = "java(parseFecha(dto.fecha()))")
    @Mapping(target = "estado", source = "estado")
    Sancion toEntity(SancionDto dto);

    @Mapping(source = "descripcion", target = "descripcion")
    @Mapping(source = "usuario.id", target = "idUsuario")
    @Mapping(source = "publicacion.id", target = "idPublicacion")
    @Mapping(source = "fecha", target = "fecha")
    @Mapping(source = "estado", target = "estado")
    SancionDto toDto(Sancion sancion);

    default List<SancionDto> toDtoList(Iterable<Sancion> sanciones) {
        return StreamSupport.stream(sanciones.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(SancionDto dto, @MappingTarget Sancion entity);
}