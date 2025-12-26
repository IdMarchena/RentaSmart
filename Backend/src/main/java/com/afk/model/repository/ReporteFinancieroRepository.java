package com.afk.model.repository;

import com.afk.model.entity.ReporteFinanciero;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ReporteFinancieroRepository extends JpaRepository<ReporteFinanciero, Long> {

    Page<ReporteFinanciero> findByInmuebleId(Long inmuebleId, Pageable pageable);

    List<ReporteFinanciero> findByFechaAfter(LocalDateTime fecha);

    @Query("SELECT COUNT(r) FROM ReporteFinanciero r WHERE r.inmueble.id = :inmuebleId")
    Long countByInmueble(Long inmuebleId);

    @Query("SELECT COUNT(r) FROM ReporteFinanciero r WHERE r.inmueble.id = :inmuebleId AND r.estado = :estado")
    Long countByInmuebleAndEstadoResolucion(Long inmuebleId, String estado);

    @Query("SELECT COUNT(r) FROM ReporteFinanciero r WHERE r.inmueble.id = :inmuebleId AND r.fecha > :fecha")
    Long countByInmuebleAndFechaReporteAfter(Long inmuebleId, LocalDateTime fecha);

    @Query("SELECT r.tipo, COUNT(r) FROM ReporteFinanciero r WHERE r.inmueble.id = :inmuebleId GROUP BY r.tipo")
    List<Object[]> countByTipoReporteAndInmueble(Long inmuebleId);

    @Query("SELECT r.estado, COUNT(r) FROM ReporteFinanciero r WHERE r.inmueble.id = :inmuebleId GROUP BY r.estado")
    List<Object[]> countByEstadoResolucionAndInmueble(Long inmuebleId);
}
