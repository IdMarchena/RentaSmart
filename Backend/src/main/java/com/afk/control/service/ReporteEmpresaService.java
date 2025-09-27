package com.afk.backend.control.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import java.util.List;

public interface ReporteEmpresaService {
    ReporteEmpresaDto createReporte(ReporteEmpresaDto reporte);
    ReporteEmpresaDto findReporteById(Long id);
    List<ReporteEmpresaDto> findAllReportes();
    Page<ReporteEmpresaDto> findReportesByEmpresa(Long empresaId, Pageable pageable);
    List<ReporteEmpresaDto> findReportesRecientes(int dias);
    void deleteReporteById(Long id);
}