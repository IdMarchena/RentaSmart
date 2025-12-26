package com.afk.control.service;

import com.afk.backend.control.dto.DashboardReportesDto;
import java.util.Map;

public interface DashboardReportesService {
    DashboardReportesDto obtenerMetricasReportes(Long inmuebleId);
    Map<String, Long> obtenerReportesPorTipo(Long inmuebleId);
    Map<String, Long> obtenerReportesPorSeveridad(Long inmuebleId);
    Map<String, Long> obtenerReportesPorEstado(Long inmuebleId);
}
