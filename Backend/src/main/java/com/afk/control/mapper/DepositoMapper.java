package com.afk.control.mapper;
import com.afk.control.dto.DepositoDto;
import com.afk.model.entity.Deposito;
import org.mapstruct.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Mapper(componentModel = "spring")
public interface DepositoMapper {

    @Mapping(target="montoTotal",source="montoTotal")
    Deposito toEntity(DepositoDto depositoDto);

    @Mapping(source = "montoTotal", target = "montoTotal")
    DepositoDto toDto(Deposito contrato);

    default List<DepositoDto> toDtoList(Iterable<Deposito> depositos) {
        return StreamSupport.stream(depositos.spliterator(), false)
                .map(this::toDto)
                .collect(Collectors.toList());
    }



    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateEntityFromDto(DepositoDto dto, @MappingTarget Deposito entity);
}
