package com.afk.control.mapper;
import com.afk.control.dto.CitaDto;
import com.afk.model.entity.Cita;
import org.mapstruct.*;
import org.springframework.stereotype.Component;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring",
        uses = {UsuarioMapper.class,
                ServicioMapper.class,
                PublicacionMapper.class})
@Component
public interface CitaMapper {

    @Named("citaFromId")
    default Cita fromId(Long id) {
        if (id == null) return null;
        Cita cita = new Cita();
        cita.setId(id);
        return cita;
    }


    @Mapping(target = "usuario", source = "idUsuarioCita", qualifiedByName = "usuarioFromId")
    @Mapping(target = "usuarioRemitente", source = "idUsuarioRemitente", qualifiedByName = "usuarioFromId")
    @Mapping(target = "servicio", source = "idServicio", qualifiedByName = "servicioFromId")
    @Mapping(target = "publicacion", source = "idPublicacion", qualifiedByName = "publicacionFromId")
    Cita toEntity(CitaDto citaDto);

    @Mapping(target = "idUsuarioCita", source = "usuario.id")
    @Mapping(target = "idUsuarioRemitente", source = "usuarioRemitente.id")
    @Mapping(target = "idServicio", source = "servicio.id")
    @Mapping(target = "idPublicacion", source = "publicacion.id")
    CitaDto toDto(Cita cita);

    @Named("citaToDtoList")
    default List<CitaDto> toDtoList(Iterable<Cita> citas) {
        return StreamSupport.stream(citas.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Named("citaToEntityList")
    default List<Cita> toEntityList(Iterable<CitaDto> citasDto) {
        return StreamSupport.stream(citasDto.spliterator(),false)
                .map(this::toEntity)
                .collect(Collectors.toList());
    }

    @Mapping(target = "usuario", source = "idUsuarioCita", qualifiedByName = "usuarioFromId")
    @Mapping(target = "usuarioRemitente", source = "idUsuarioRemitente", qualifiedByName = "usuarioFromId")
    @Mapping(target = "servicio", source = "idServicio", qualifiedByName = "servicioFromId")
    @Mapping(target = "publicacion", source = "idPublicacion", qualifiedByName = "publicacionFromId")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(CitaDto dto, @MappingTarget Cita entity);
}
