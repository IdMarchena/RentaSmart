package com.afk.control.mapper;
import com.afk.control.dto.FacturaDto;
import com.afk.model.entity.*;
import org.mapstruct.*;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring",
        uses = {UsuarioMapper.class,
                PagoMapper.class})
public interface FacturaMapper {

    @Named("facturaFromId")
    default Factura facturaFromId(Long id) {
        if (id == null) return null;
        Factura factura = new Factura();
        factura.setId(id);
        return factura;
    }


    @Mapping(target = "usuario", source = "idUsuario", qualifiedByName = "usuarioFromId")
    @Mapping(target = "pago", source = "idPago", qualifiedByName = "pagoFromId")
    Factura toEntity(FacturaDto facturaDto);

    @Mapping(target = "idUsuario", source = "usuario.id")
    @Mapping(target = "idPago", source = "pago.id")
    FacturaDto toDto(Factura factura);

    @Named("facturaToDtoList")
    default List<FacturaDto> toDtoList(Iterable<Factura> facturas) {
        return StreamSupport.stream(facturas.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Named("facturaToEntityList")
    default List<Factura> toEntityList(Iterable<FacturaDto> facturas) {
        return StreamSupport.stream(facturas.spliterator(),false)
                .map(this::toEntity)
                .collect(Collectors.toList());
    }

    @Mapping(target = "usuario", source = "idUsuario", qualifiedByName = "usuarioFromId")
    @Mapping(target = "pago", source = "idPago", qualifiedByName = "pagoFromId")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(FacturaDto dto, @MappingTarget Factura entity);
}
