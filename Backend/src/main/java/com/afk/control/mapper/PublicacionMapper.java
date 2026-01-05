package com.afk.control.mapper;
import com.afk.control.dto.PublicacionDto;
import com.afk.model.entity.Calificacion;
import com.afk.model.entity.Inmueble;
import com.afk.model.entity.Publicacion;
import org.mapstruct.*;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring",
        uses = {UsuarioMapper.class,
                MultimediaMapper.class})
public interface PublicacionMapper {

    @Named("publicacionFromId")
    default Publicacion publicacionFromId(Long id) {
        if (id == null) return null;
        Publicacion publicacion = new Publicacion();
        publicacion.setId(id);
        return publicacion;
    }
    @Named("mapInmueble")
    default Inmueble mapInmueble(Long id) {
        if (id == null) return null;
        Inmueble i = new Inmueble();
        i.setId(id);
        return i;
    }
    @Named("calificacionesFromIds")
    default List<Calificacion> calificacionesFromIds(List<Long> ids) {
        if (ids == null) return null;
        return ids.stream().map(id -> {
            Calificacion c = new Calificacion();
            c.setId(id);
            return c;
        }).collect(Collectors.toList());
    }

    @Named("calificacionesToIds")
    default List<Long> calificacionesToIds(List<Calificacion> calificaciones) {
        if (calificaciones == null) return List.of();
        return calificaciones.stream()
                .map(Calificacion::getId)
                .collect(Collectors.toList());
    }

    @Mapping(target = "inmueble", source = "idInmueble", qualifiedByName = "mapInmueble")
    @Mapping(target = "calificaciones", source = "calificacionesIds", qualifiedByName = "calificacionesFromIds")
    @Mapping(target = "usuario", source = "idUsuario", qualifiedByName = "usuarioFromId")
    @Mapping(target = "multimedia", source = "multimediaIds", qualifiedByName = "multimediasFromIds")
    Publicacion toEntity(PublicacionDto dto);

    @Mapping(target = "idInmueble", source = "inmueble.id")
    @Mapping(target = "calificacionesIds", source = "calificaciones", qualifiedByName = "calificacionesToIds")
    @Mapping(target = "idUsuario", source = "usuario.id")
    @Mapping(target = "multimediaIds", source = "multimedia", qualifiedByName = "multimediasToIds")
    PublicacionDto toDto(Publicacion publicacion);

    @Named("publicacionToDtoList")
    default List<PublicacionDto> toDtoList(Iterable<Publicacion> publicaciones) {
        return StreamSupport.stream(publicaciones.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Named("publicacionToEntityList")
    default List<Publicacion> toEntityList(Iterable<PublicacionDto> publicacionesDto) {
        return StreamSupport.stream(publicacionesDto.spliterator(), false)
                .map(this::toEntity)
                .collect(Collectors.toList());
    }

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "inmueble", ignore = true)
    @Mapping(target = "calificaciones", ignore = true)
    @Mapping(target = "usuario", ignore = true)
    @Mapping(target = "multimedia", ignore = true)
    void updateEntityFromDto(@MappingTarget Publicacion entity, PublicacionDto dto);
}
