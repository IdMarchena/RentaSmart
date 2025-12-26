package com.afk.control.mapper;
import com.afk.control.dto.InmuebleDto;
import com.afk.model.entity.*;
import org.mapstruct.*;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring")
public interface InmuebleMapper {
    @Named("mapU")
    default Ubicacion mapU(Long id){
        if(id == null) return null;
        Ubicacion ubicacion = new Ubicacion();
        ubicacion.setId(id);
        return ubicacion;
    }
    @Named("mapS")
    default Servicio mapS(Long id){
        if(id == null) return null;
        Servicio servicio = new Servicio();
        servicio.setId(id);
        return servicio;
    }


    @Mapping(target="descripcion",source="descripcion")
    @Mapping(target = "ubicacion", source = "idUbicaicon", qualifiedByName = "mapU")
    @Mapping(target = "areaTotal", source = "areaTotal")
    @Mapping(target = "estrato", source = "estrato")
    @Mapping(target = "nombre", source = "nombre")
    @Mapping(target = "servicio", source = "idServicio", qualifiedByName = "mapS")
    Inmueble toEntity(InmuebleDto inmuebleDto);

    @Mapping(source="descripcion",target="descripcion")
    @Mapping(source = "ubicacion.id", target = "idUbicaicon")
    @Mapping(source = "areaTotal", target = "areaTotal")
    @Mapping(source = "estrato", target = "estrato")
    @Mapping(source = "nombre", target = "nombre")
    @Mapping(source = "servicio.id", target = "idServicio")
    InmuebleDto toDto(Inmueble inmueble);

    default List<InmuebleDto> toDtoList(Iterable<Inmueble> inmuebles) {
        return StreamSupport.stream(inmuebles.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }



    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(InmuebleDto dto, @MappingTarget Inmueble entity);
}
