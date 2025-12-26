package com.afk.control.mapper;
import com.afk.client.external.dto.UbicacionDt;
import com.afk.control.dto.UbicacionDto;
import com.afk.model.entity.Ubicacion;
import org.mapstruct.*;
import java.util.List;

@Mapper(componentModel = "spring")
public interface UbicacionMapper {

    @Named("ubicacionFromId")
    default Ubicacion fromId(Long id) {
        if (id == null) {
            return null;
        }
        Ubicacion u = new Ubicacion();
        u.setId(id);
        return u;
    }
    @Named("UbicacionToUbicacionDto")
    @Mapping(target="padre",source="ubicacion.id")
    UbicacionDt toDto(Ubicacion ubicacion);

    @Named("UbicacionDtoToUbicacion")
    @Mapping(target = "padre",source="id_oadre",qualifiedByName = "ubicacionFromId")
    Ubicacion toEntity(UbicacionDt dto);

    @Named("listUbicacionToListUbicacionDto")
    List<UbicacionDto> toDtoList(List<Ubicacion> ubicaciones);

    @Named("listUbicacionDtoToListUbicacion")
    List<Ubicacion> toEntityList(List<UbicacionDt> dtos);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(UbicacionDt dto, @MappingTarget Ubicacion entity);
}
