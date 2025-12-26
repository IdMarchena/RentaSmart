package com.afk.control.dto;

public record FinanciacionDto(
        Long id,
        Integer numeroCuotas,
        Integer valorCuota,
        Float montoTotal,
        Float interes
) {
}
