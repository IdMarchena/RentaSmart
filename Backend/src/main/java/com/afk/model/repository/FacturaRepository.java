package com.afk.model.repository;

import com.afk.model.entity.Chat;
import com.afk.model.entity.Factura;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FacturaRepository extends JpaRepository<Factura, Long> {
    @Query("SELECT c FROM Factura c WHERE c.usuario.id = :userId OR c.usuario.id = :userId")
    List<Factura> findByUsuarioId(@Param("userId") Long userId);

    @Query("SELECT f FROM Factura f WHERE f.idOrigen = :idOrigen AND f.tipoFactura = :tipo")
    List<Factura> findByOrigen(@Param("idOrigen") Long idOrigen, @Param("tipo") com.afk.model.entity.enums.TipoFactura tipo);
}
