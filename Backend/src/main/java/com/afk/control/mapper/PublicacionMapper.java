package com.afk.control.mapper;
import com.afk.control.dto.PublicacionDto;
import com.afk.model.entity.Calificacion;
import com.afk.model.entity.Publicacion;
import org.mapstruct.*;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring",
        uses = {InmuebleMapper.class,
                UsuarioMapper.class,
                CalificacionMapper.class,
                MultimediaMapper.class})  // Asegúrate de incluir MultimediaMapper
public interface PublicacionMapper {

    @Named("publicacionFromId")
    default Publicacion publicacionFromId(Long id) {
        if (id == null) return null;
        Publicacion publicacion = new Publicacion();
        publicacion.setId(id);
        return publicacion;
    }

    @Mapping(target = "inmueble", source = "idInmueble", qualifiedByName = "inmuebleFromId")
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
