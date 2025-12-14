package com.afk.control.dto;

import com.afk.model.entity.enums.Roles;

public record RolDto(
        Long id,
        Roles role
) {}