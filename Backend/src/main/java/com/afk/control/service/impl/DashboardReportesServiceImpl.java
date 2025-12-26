package com.afk.control.service.impl;

import com.afk.backend.control.dto.DashboardReportesDto;
import com.afk.control.service.DashboardReportesService;
import com.afk.model.entity.ReporteFinanciero;
import com.afk.model.repository.ReporteFinancieroRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardReportesServiceImpl implements DashboardReportesService {

    private final ReporteFinancieroRepository reporteRepository;  // Cambié 'reporteRepository' por el repositorio correcto

    @Override
    @Transactional(readOnly = true)
    public DashboardReportesDto obtenerMetricasReportes(Long inmuebleId) {  // Cambié 'empresaId' por 'inmuebleId'
        Long totalReportes = reporteRepository.countByInmueble(inmuebleId);  // Cambié 'countByEmpresa' por 'countByInmueble'
        Long reportesAbiertos = reporteRepository.countByInmuebleAndEstadoResolucion(inmuebleId, "ABIERTO");  // Cambié 'countByEmpresaAndEstadoResolucion'
        Long reportesResueltos = reporteRepository.countByInmuebleAndEstadoResolucion(inmuebleId, "RESUELTO");  // Cambié 'countByEmpresaAndEstadoResolucion'
        Long reportesUltimoMes = reporteRepository.countByInmuebleAndFechaReporteAfter(inmuebleId, LocalDateTime.now().minusMonths(1));  // Cambié 'countByEmpresaAndFechaReporteAfter'

        Map<String, Long> reportesPorTipo = reporteRepository.countByTipoReporteAndInmueble(inmuebleId)  // Cambié 'countByTipoReporteAndEmpresa'
                .stream()
                .collect(Collectors.toMap(
                        arr -> (String) arr[0],
                        arr -> (Long) arr[1]
                ));

        Map<String, Long> reportesPorSeveridad = reporteRepository.countByEstadoResolucionAndInmueble(inmuebleId)  // Cambié 'countBySeveridadAndEmpresa'
                .stream()
                .collect(Collectors.toMap(
                        arr -> (String) arr[0],
                        arr -> (Long) arr[1]
                ));

        return new DashboardReportesDto(
                totalReportes,
                reportesAbiertos,
                reportesResueltos,
                reportesUltimoMes,
                reportesPorTipo,
                reportesPorSeveridad
        );
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Long> obtenerReportesPorTipo(Long inmuebleId) {  // Cambié 'empresaId' por 'inmuebleId'
        return reporteRepository.countByTipoReporteAndInmueble(inmuebleId)  // Cambié 'countByTipoReporteAndEmpresa' por 'countByTipoReporteAndInmueble'
                .stream()
                .collect(Collectors.toMap(
                        arr -> (String) arr[0],
                        arr -> (Long) arr[1]
                ));
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Long> obtenerReportesPorSeveridad(Long inmuebleId) {
        return reporteRepository.countByEstadoResolucionAndInmueble(inmuebleId)
                .stream()
                .collect(Collectors.toMap(
                        arr -> (String) arr[0],
                        arr -> (Long) arr[1]
                ));
    }

    @Override
    @Transactional(readOnly = true)
    public Map<String, Long> obtenerReportesPorEstado(Long inmuebleId) {
        return reporteRepository.countByEstadoResolucionAndInmueble(inmuebleId)
                .stream()
                .collect(Collectors.toMap(
                        arr -> (String) arr[0],
                        arr -> (Long) arr[1]
                ));
    }
}
