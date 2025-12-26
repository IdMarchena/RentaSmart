package com.afk.model.repository;

import com.afk.model.entity.ReporteMantenimiento;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReporteMantenimientoRepository extends JpaRepository<ReporteMantenimiento, Long> {
    Page<ReporteMantenimiento> findByServicioId(Long servicioId, Pageable pageable);

    List<ReporteMantenimiento> findByFechaAfter(LocalDateTime fecha);

    @Query("SELECT COUNT(r) FROM ReporteMantenimiento r WHERE r.servicio.id = :servicioId")
    Long countByServicio(Long servicioId);

    @Query("SELECT COUNT(r) FROM ReporteMantenimiento r WHERE r.servicio.id = :servicioId AND r.estado = :estado")
    Long countByServicioAndEstadoResolucion(Long servicioId, String estado);

    @Query("SELECT COUNT(r) FROM ReporteMantenimiento r WHERE r.servicio.id = :servicioId AND r.fecha > :fecha")
    Long countByServicioAndFechaReporteAfter(Long servicioId, LocalDateTime fecha);

    @Query("SELECT r.tipoReporte, COUNT(r) FROM ReporteMantenimiento r WHERE r.servicio.id = :servicioId GROUP BY r.tipoReporte")
    List<ReporteMantenimiento> countByTipoReporteAndServicio(Long servicioId);

    @Query("SELECT r.severidad, COUNT(r) FROM ReporteMantenimiento r WHERE r.servicio.id = :servicioId GROUP BY r.severidad")
    List<ReporteMantenimiento> countBySeveridadAndServicio(Long servicioId);

    @Query("SELECT r.estado, COUNT(r) FROM ReporteMantenimiento r WHERE r.servicio.id = :servicioId GROUP BY r.estado")
    List<ReporteMantenimiento> countByEstadoResolucionAndServicio(Long servicioId);

    ReporteMantenimiento findByContratoId(Long idContrato);

    List<ReporteMantenimiento> findByServicioId(Long idServicio);
}
