package com.afk.control.mapper;
import com.afk.control.dto.CalificacionDto;
import com.afk.model.entity.Calificacion;
import com.afk.model.entity.Publicacion;
import com.afk.model.entity.Servicio;
import com.afk.model.entity.Usuario;
import org.mapstruct.*;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring")
public interface CalificacionMapper {


    @Named("calificacioFromId")
    default Calificacion calificacioFromId(Long id) {
        if (id == null) return null;
        Calificacion calificacion = new Calificacion();
        calificacion.setId(id);
        return calificacion;
    }

    @Named("calificacionesFromIds")
    default List<Calificacion> calificacionesFromIds(List<Long> ids) {
        if (ids == null) return null;
        return ids.stream().map(this::calificacioFromId).collect(Collectors.toList());
    }

    @Named("calificacionesToIds")
    default List<Long> calificacionesToIds(List<Calificacion> calificaciones) {
        if (calificaciones == null) return List.of();
        return calificaciones.stream()
                .map(Calificacion::getId)
                .collect(Collectors.toList());
    }

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

    @Named("mapP")
    default Publicacion mapP(Long id){
        if(id == null) return null;
        Publicacion publicacion = new Publicacion();
        publicacion.setId(id);
        return publicacion;
    }

    @Mapping(target = "usuario",source = "idUsuarioPostulante", qualifiedByName = "mapU")
    @Mapping(target = "publicacion",source = "idPublicacion", qualifiedByName = "mapP")
    @Mapping(target = "servicio",source = "idServicio", qualifiedByName = "mapS")
    Calificacion toEntity(CalificacionDto calificacionDto);

    @Mapping(target = "idUsuarioPostulante", source = "usuario.id")
    @Mapping(target = "idPublicacion", source = "publicacion.id")
    @Mapping(target = "idServicio", source = "servicio.id")
    CalificacionDto toDto(Calificacion calificacion);

    @Named("calificacionToDtoList")
    default List<CalificacionDto> toDtoList(Iterable<Calificacion> calificaciones) {
        if (calificaciones == null) return null;
        return StreamSupport.stream(calificaciones.spliterator(),false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Named("calificacionToEntityList")
    default List<Calificacion> toEntityList(Iterable<CalificacionDto> calificacionDtos) {
        if (calificacionDtos == null) return null;
        return StreamSupport.stream(calificacionDtos.spliterator(),false)
                .map(this::toEntity)
                .collect(Collectors.toList());

    }

    @Mapping(target = "usuario",source = "idUsuarioPostulante", qualifiedByName = "mapU")
    @Mapping(target = "publicacion",source = "idPublicacion", qualifiedByName = "mapP")
    @Mapping(target = "servicio",source = "idServicio", qualifiedByName = "mapS")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(CalificacionDto dto, @MappingTarget Calificacion entity);

}
