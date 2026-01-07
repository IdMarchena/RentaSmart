package com.afk.model.repository;

import com.afk.model.entity.TipoPago;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoPagoRepository extends JpaRepository<TipoPago, Long> {
    TipoPago findByDescripcion(String descripcion);
}
