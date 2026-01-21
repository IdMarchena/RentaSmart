package com.afk.control.mapper;
import com.afk.client.external.dto.UbicacionDt;
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

    @Mapping(target = "padre",source="id_padre",qualifiedByName = "ubicacionFromId")
    Ubicacion toEntity(UbicacionDt dto);

    @Mapping(target="id_padre",source="padre.id")
    UbicacionDt toDto(Ubicacion ubicacion);



    @Named("listUbicacionToListUbicacionDto")
    List<UbicacionDt> toDtoList(List<Ubicacion> ubicaciones);

    @Named("listUbicacionDtoToListUbicacion")
    List<Ubicacion> toEntityList(List<UbicacionDt> dtos);

    @Mapping(target = "padre",source="id_padre",qualifiedByName = "ubicacionFromId")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(UbicacionDt dto, @MappingTarget Ubicacion entity);
}
