package com.afk.control.dto;

import java.time.LocalDateTime;
import java.util.List;

public record AlquilerDto(
        Long id,
        LocalDateTime fechaInicio,
        LocalDateTime fechaFin,
        List<Long> idsHistorialInquilino,
        List<Long> idsFacturas,
        List<Long> idsServicios,
        List<Long> idsCalificaciones,
        List<Long> idsCitas,
        List<Long> idsFavoritos,
        List<Long> idsPublicaciones,
        List<Long> idsInmuebles,
        List<Long> idsSolicitudesServicio,
        List<Long> idsChats

) {
}
