package com.afk.control.mapper;
import com.afk.control.dto.PublicacionDto;
import com.afk.model.entity.Calificacion;
import com.afk.model.entity.Inmueble;
import com.afk.model.entity.Publicacion;
import org.mapstruct.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring")
public interface PublicacionMapper {
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

    @Mapping(target="titulo",source = "titulo")
    @Mapping(target="descripcion",source = "descripcion")
    @Mapping(target = "inmueble", source = "idInmueble", qualifiedByName = "mapI")
    @Mapping(target = "fechaPublicacion", expression = "java(parseFecha(dto.fechaPublicacion()))")
    @Mapping(target="estadoPublicacion",source = "estadoPublicacion")
    @Mapping(target = "calificaciones", ignore = true)
    Publicacion toEntity(PublicacionDto dto);

    @Mapping(source="titulo",target = "titulo")
    @Mapping(source="descripcion",target = "descripcion")
    @Mapping(source = "inmueble.id", target = "idInmueble")
    @Mapping(source = "estadoPublicacion", target = "estado_publiccaion")
    @Mapping(target = "calificacionesIds", expression = "java(mapCalificaciones(publicacion.getCalificaciones()))")
    PublicacionDto toDto(Publicacion publicacion);

    default List<PublicacionDto> toDtoList(Iterable<Publicacion> publicaciones) {
        return StreamSupport.stream(publicaciones.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    default List<Long> mapCalificaciones(List<Calificacion> calificaciones) {
        return calificaciones.stream()
                .map(Calificacion::getId)
                .collect(Collectors.toList());
    }
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "vacante", ignore = true)
    @Mapping(target = "calificaciones", ignore = true)
    void updateEntityFromDto(@MappingTarget Publicacion entity, PublicacionDto dto);


}