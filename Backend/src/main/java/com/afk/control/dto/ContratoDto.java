package com.afk.control.dto;
import com.afk.model.entity.enums.EstadoContrato;
import jakarta.persistence.Column;

import java.time.LocalDateTime;

public record ContratoDto(
        Long id,
        String contenido,
        Long idUsuarioArrendatario,
        Long idUsuarioArrendador,
        Long idInmueble,
        Long idFinanciacion,
        LocalDateTime fechaInicio,
        LocalDateTime fechaFinalizacion,
        Integer precio,
        EstadoContrato estadoContrato,
        Double deposito,
        String clausulasEspeciales,
        Integer diaDePago
) {
}
