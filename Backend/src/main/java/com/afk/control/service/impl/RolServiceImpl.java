package com.afk.control.service.impl;

import com.afk.control.dto.RolDto;
import com.afk.control.mapper.RolMapper;
import com.afk.control.service.RolService;
import com.afk.model.entity.Rol;
import com.afk.model.entity.enums.Roles;
import com.afk.model.repository.RolRepository;
import lombok.AllArgsConstructor;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor

public class RolServiceImpl implements RolService {
    private final RolRepository repo;
    private final RolMapper mapper;
    @Override
    public RolDto createRol(RolDto rol) {
        Optional<Rol> rName = repo.findByRole(rol.role());
        if (rName.isPresent()) {
            throw new IllegalArgumentException("Rol ya encontrado");
        }
        Rol rolM = mapper.DtoToRol(rol);
        repo.save(rolM);
        return mapper.toDto(rolM);
    }

    @Override
    public void guardarRol(RolDto rol) {
        Optional<Rol> rName = repo.findByRole(rol.role());
        if (rName.isPresent()) {
            throw new IllegalArgumentException("Rol ya encontrado");
        }
        Rol rolM = mapper.DtoToRol(rol);
        repo.save(rolM);
    }

    @Override
    public RolDto findRolById(Long id) {
        Optional<Rol> rol = repo.findById(id);
        if (!rol.isPresent()) {
            throw new IllegalArgumentException("Rol no encontrado");
        }
        return mapper.toDto(rol.get());
    }

    @Override
    public List<RolDto> findAllRoles() {
        List<Rol> rols = repo.findAll();
        if(rols.isEmpty()) {
            throw new IllegalArgumentException("No se encontro ningun rol");
        }
        return mapper.toListDto(rols);
    }

    @Override
    public void deleteRolById(Long id) {
        Rol rol = repo.findById(id).orElse(null);
        if(rol==null) {
            throw new IllegalArgumentException("Rol no encontrado");
        }
    }
    @Override
    public void actualizarRol(RolDto rolDto) {
        Rol rol = repo.findByRole(rolDto.role())
                .orElseThrow(() -> new IllegalArgumentException("Rol no encontrado"));
        rol.setRole(rolDto.role());
        repo.save(rol);
    }

    @Override
    public RolDto buscarRolPorNombre(String nombre){
        Roles role = Roles.valueOf(nombre);
        Rol rol= repo.findByRole(role).orElseThrow(() -> new IllegalArgumentException("Rol no encontrado"));
        return mapper.toDto(rol);
    }
}
