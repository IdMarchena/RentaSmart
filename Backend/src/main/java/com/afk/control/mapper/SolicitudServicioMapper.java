package com.afk.control.mapper;

import com.afk.control.dto.SolicitudDeServicioDto;
import com.afk.model.entity.*;
import org.mapstruct.*;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring",
        uses = {ServicioMapper.class,
                UsuarioMapper.class,
                InmuebleMapper.class,}
)
public interface SolicitudServicioMapper {

    @Named("solicitudDeServicioFromId")
    default SolicitudServicio solicitudDeServicioFromId(Long id){
        if(id == null) return null;
        SolicitudServicio s = new SolicitudServicio();
        s.setId(id);
        return s;
    }

    @Mapping(target = "servicio", source = "idServicio", qualifiedByName = "servicioFromId")
    @Mapping(target = "usuario", source = "idUsuario", qualifiedByName = "usuarioFromId")
    @Mapping(target = "inmueble", source = "idInmueble", qualifiedByName = "inmuebleFromId")
    SolicitudServicio toEntity(SolicitudDeServicioDto dto);

    @Mapping(source = "servicio.id", target = "idServicio")
    @Mapping(source = "usuario.id", target = "idUsuario")
    @Mapping(source = "inmueble.id", target = "idInmueble")
    SolicitudDeServicioDto toDto(SolicitudServicio solicitudServicio);

    @Named("solicitudDeServicioToDtoList")
    default List<SolicitudDeServicioDto> toDtoList(Iterable<SolicitudServicio> solicitudServicios) {
        return StreamSupport.stream(solicitudServicios.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Named("solicitudDeServicioToEntityList")
    default List<SolicitudServicio> toEntityList(Iterable<SolicitudDeServicioDto> solicitudDeServicioDtos) {
        return StreamSupport.stream(solicitudDeServicioDtos.spliterator(),false)
                .map(this::toEntity)
                .collect(Collectors.toList());
    }

    @Mapping(target = "servicio", source = "idServicio", qualifiedByName = "servicioFromId")
    @Mapping(target = "usuario", source = "idUsuario", qualifiedByName = "usuarioFromId")
    @Mapping(target = "inmueble", source = "idInmueble", qualifiedByName = "inmuebleFromId")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(SolicitudDeServicioDto dto, @MappingTarget SolicitudServicio entity);
}
