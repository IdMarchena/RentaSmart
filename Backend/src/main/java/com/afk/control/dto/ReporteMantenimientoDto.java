package com.afk.control.dto;

import com.afk.model.entity.enums.EstadoReporteMantenimiento;

import java.time.LocalDate;

public record ReporteMantenimientoDto(
        Long id,
        String descripcion,
        LocalDate fecha,
        Long idServicio,
        Long idUsuarioProfesional,
        Long idUsuarioGenerador,
        EstadoReporteMantenimiento estado,
        String severdidad,
        Long idTipo
) {
}
