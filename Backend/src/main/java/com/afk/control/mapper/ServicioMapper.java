package com.afk.control.mapper;
import com.afk.control.service.dto.ServicioDto;
import com.afk.model.entity.*;
import org.mapstruct.*;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring")
public interface ServicioMapper {

    @Named("mapU")
    default Usuario mapU(Long id){
        if(id == null) return null;
        Usuario usuario = new Usuario();
        usuario.setId(id);
        return usuario;
    }

    @Named("mapT")
    default TipoServicio mapT(Long id){
        if(id == null) return null;
        TipoServicio tipoServicio = new TipoServicio();
        tipoServicio.setId(id);
        return tipoServicio;
    }

    @Mapping(target="nombre",source="nombre")
    @Mapping(target="descripcion",source="descripcion")
    @Mapping(target = "usuario", source = "idUsuario", qualifiedByName = "mapU")
    @Mapping(target = "tipo", source = "idTipo", qualifiedByName = "mapT")
    @Mapping(target = "estado", source = "estado")
    Servicio toEntity(ServicioDto dto);

    @Mapping(source="nombre",target="nombre")
    @Mapping(source = "descripcion", target = "descripcion")
    @Mapping(source = "usuario.id", target = "idUsuario")
    @Mapping(source = "tipo.id", target = "idTipo")
    @Mapping(source = "estado", target = "estado")
    ServicioDto toDto(Servicio sancion);

    default List<ServicioDto> toDtoList(Iterable<Servicio> servicios) {
        return StreamSupport.stream(servicios.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(ServicioDto dto, @MappingTarget Servicio entity);
}
