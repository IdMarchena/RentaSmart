package com.afk.control.mapper;

import com.afk.backend.control.dto.CalificacionDto;
import com.afk.model.entity.Calificacion;
import com.afk.model.entity.Publicacion;
import com.afk.model.entity.Usuario;
import org.mapstruct.*;
import org.springframework.stereotype.Component;

@Mapper(componentModel = "spring")
@Component
public interface CalificacionMapper {

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

    @Mapping(target = "usuario",source = "idUsuarioPostulante", qualifiedByName = "mapU")
    @Mapping(target = "publicacion",source = "idPublicacion", qualifiedByName = "mapP")
    Calificacion toEntity(CalificacionDto calificacionDto);

    @Mapping(source = "usuario.id", target = "idUsuarioPostulante")
    @Mapping(source = "publicacion.id", target = "idPublicacion")
    CalificacionDto toDto(Calificacion calificacion);




    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(CalificacionDto dto, @MappingTarget Calificacion entity);
}
