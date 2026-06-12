package com.afk.control.mapper;
import com.afk.control.dto.PagoDto;
import com.afk.model.entity.*;
import org.mapstruct.*;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring",uses = {UsuarioMapper.class})
public interface PagoMapper {

    @Named("pagoFromId")
    default Pago pagoFromId(Long id) {
        if (id == null) return null;
        Pago pago = new Pago();
        pago.setId(id);
        return pago;
    }

    @Mapping(target = "usuario", source = "idUsuario", qualifiedByName = "usuarioFromId")
    Pago toEntity(PagoDto pagoDto);

    @Mapping(target = "idUsuario", source = "usuario.id")
    PagoDto toDto(Pago pago);


    @Named("pagoToDtoList")
    default List<PagoDto> toDtoList(Iterable<Pago> pagos) {
        return StreamSupport.stream(pagos.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Named("pagoToEntityList")
    default List<Pago> toEntityList(Iterable<PagoDto> pagos) {
        return StreamSupport.stream(pagos.spliterator(), false)
                .map(this::toEntity)
                .collect(Collectors.toList());
    }

    @Mapping(target = "usuario", source = "idUsuario", qualifiedByName = "usuarioFromId")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(PagoDto dto, @MappingTarget Pago entity);
}
