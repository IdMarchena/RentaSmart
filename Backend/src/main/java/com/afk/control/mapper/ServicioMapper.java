package com.afk.control.mapper;

import com.afk.control.dto.ServicioDto;
import com.afk.model.entity.*;
import org.mapstruct.*;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring",
uses = {UsuarioMapper.class,
        TipoServicioMapper.class})
public interface ServicioMapper {

    @Named("servicioFromId")
    default Servicio servicioToServicio(Long id) {
        if (id == null) return null;
        Servicio servicio = new Servicio();
        servicio.setId(id);
        return servicio;
    }


    @Mapping(target = "usuario", source = "idUsuario", qualifiedByName = "usuarioFromId")
    @Mapping(target = "tipo", source = "idTipo", qualifiedByName = "tipoServicioFromId")
    Servicio toEntity(ServicioDto dto);

    @Mapping(target = "usuario", source = "usuario.id")
    @Mapping(target = "tipo", source = "tipo.id")
    ServicioDto toDto(Servicio sancion);

    @Named("servicioToDtoList")
    default List<ServicioDto> toDtoList(Iterable<Servicio> servicios) {
        return StreamSupport.stream(servicios.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Named("servicioToEntityList")
    default List<Servicio> toEntityList(Iterable<ServicioDto> servicios) {
        return StreamSupport.stream(servicios.spliterator(),false)
                .map(this::toEntity)
                .collect(Collectors.toList());
    }

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(ServicioDto dto, @MappingTarget Servicio entity);
}
