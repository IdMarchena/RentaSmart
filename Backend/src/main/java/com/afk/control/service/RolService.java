package com.afk.control.service;



import com.afk.control.dto.RolDto;

import java.util.List;

public interface RolService {
    RolDto createRol(RolDto rol);
    RolDto findRolById(Long id);
    List<RolDto> findAllRoles();
    void deleteRolById(Long id);
}
