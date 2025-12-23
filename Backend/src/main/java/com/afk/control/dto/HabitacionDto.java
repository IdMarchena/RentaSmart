package com.afk.control.dto;

import com.afk.model.entity.enums.Estado;

public record HabitacionDto(
        Long id,
        Integer capacidad,
        Integer precio,
        Estado estado,
        Long idApartamento
) {
}
