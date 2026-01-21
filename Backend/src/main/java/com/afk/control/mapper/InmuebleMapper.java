package com.afk.control.mapper;
import com.afk.control.dto.InmuebleDto;
import com.afk.model.entity.*;
import org.mapstruct.*;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;
@Mapper(componentModel = "spring",
uses = {
        UbicacionMapper.class,
        UsuarioMapper.class
})
public interface InmuebleMapper {

    @Named("inmuebleFromId")
    default Inmueble fromId(Long id) {
        if (id == null) return null;
        Inmueble inmueble = new Inmueble();
        inmueble.setId(id);
        return inmueble;
    }

    @Mapping(target = "ubicacion", source = "idUbicacion", qualifiedByName = "ubicacionFromId")
    @Mapping(target = "usuario", source = "idArrendatario", qualifiedByName = "usuarioFromId")
    Inmueble toEntity(InmuebleDto inmuebleDto);

    @Mapping(target = "idUbicacion", source = "ubicacion.id")
    @Mapping(target = "idArrendatario", source = "usuario.id")
    InmuebleDto toDto(Inmueble inmueble);

    @Named("inmuebleToDtoList")
    default List<InmuebleDto> toDtoList(Iterable<Inmueble> inmuebles) {
        return StreamSupport.stream(inmuebles.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Named("inmuebleToEntityList")
    default List<Inmueble> toEntityList(Iterable<InmuebleDto> inmuebles) {
        return StreamSupport.stream(inmuebles.spliterator(),false)
                .map(this::toEntity)
                .collect(Collectors.toList());
    }

    @Mapping(target = "ubicacion", source = "idUbicacion", qualifiedByName = "ubicacionFromId")
    @Mapping(target = "usuario", source = "idArrendatario", qualifiedByName = "usuarioFromId")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(InmuebleDto dto, @MappingTarget Inmueble entity);
}
