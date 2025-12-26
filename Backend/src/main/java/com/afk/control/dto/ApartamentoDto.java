package com.afk.control.dto;

import java.util.List;

public record ApartamentoDto(
        Long id,
        List<Long> idsHabitaciones,
        String descripcion
) {
}
