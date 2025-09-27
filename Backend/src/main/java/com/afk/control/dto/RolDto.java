package com.afk.control.dto;

import com.afk.model.entity.enums.Roles;

public record RolDto(
        Integer id,
        Roles role
) {}