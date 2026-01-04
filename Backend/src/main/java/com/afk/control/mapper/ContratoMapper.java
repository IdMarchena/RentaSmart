package com.afk.control.mapper;
import com.afk.control.dto.ContratoDto;
import com.afk.model.entity.*;
import org.mapstruct.*;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring")
public interface ContratoMapper {

    @Named("contratoFromId")
    default Contrato contratoFromId(Long id) {
        if (id == null) return null;
        Contrato contrato = new Contrato();
        contrato.setId(id);
        return contrato;
    }

    @Mapping(target = "usuarioArrendatario", source = "idUsuarioArrendatario", qualifiedByName = "usuarioFromId")
    @Mapping(target = "usuarioArrendador", source = "idUsuarioArrendador", qualifiedByName = "usuarioFromId")
    @Mapping(target = "inmueble", source = "idInmueble", qualifiedByName = "inmuebleFromId")
    @Mapping(target = "financiacion", source = "idFinanciacion", qualifiedByName = "financiacionFromId")
    Contrato toEntity(ContratoDto contratoDto);


    @Mapping(target = "idUsuarioArrendatario",source = "usuario.id")
    @Mapping(target = "idUsuarioArrendador",source = "usuario.id")
    @Mapping(source = "inmueble.id", target = "idInmueble")
    @Mapping(source = "financiacion.id", target = "idFinanciacion")
    ContratoDto toDto(Contrato contrato);

    @Named("contratoToDtoList")
    default List<ContratoDto> toDtoList(Iterable<Contrato> contratos) {
        return StreamSupport.stream(contratos.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }

    @Named("contratoToEntityList")
    default List<Contrato> toEntityList(Iterable<ContratoDto> contratoDtos) {
        return StreamSupport.stream(contratoDtos.spliterator(),false)
                .map(this::toEntity)
                .collect(Collectors.toList());
    }

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(ContratoDto dto, @MappingTarget Contrato entity);
}
