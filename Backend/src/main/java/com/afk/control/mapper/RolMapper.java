package com.afk.control.mapper;

import com.afk.control.dto.RolDto;
import com.afk.model.entity.Rol;
import org.mapstruct.Mapper;
import org.mapstruct.Named;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface RolMapper {
    @Named("mapRol")
    default Rol map(Long id) {
        if (id == null) {
            return null;
        }
        Rol rol = new Rol();
        rol.setId(id);
        return rol;
    }

    @Named("mapDtoToRol")
    default Rol DtoToRol(RolDto rolDto) {
        if (rolDto == null) {
            return null;
        }
        Rol rol = new Rol();
        rol.setId(rolDto.id());
        rol.setRole(rolDto.role());
        return rol;
    }

    @Named("mapRolToDto")
    default RolDto toDto(Rol rol) {
        if (rol == null) {
            return null;
        }
        RolDto rolDto = new RolDto(
                rol.getId(),
                rol.getRole()
        );
        return rolDto;
    }

    @Named("mapRolDtoToListRol")
    default List<Rol> toList(List<RolDto> rolDtos) {
        if (rolDtos == null) {
            return null;
        }
        List<Rol> rols = new ArrayList<>();
        for (RolDto rolDto : rolDtos) {
            rols.add(DtoToRol(rolDto));
        }
        return rols;
    }

    @Named("mapRolToListRolDto")
    default List<RolDto> toListDto(List<Rol> rols) {
        if (rols == null) {
            return null;
        }
        List<RolDto> rolDtos = new ArrayList<>();
        for (Rol rol : rols) {
            rolDtos.add(toDto(rol));
        }
        return rolDtos;
    }
}
