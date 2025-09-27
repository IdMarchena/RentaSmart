package com.afk.model.repository;

import com.afk.model.entity.TipoRequisito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TipoRequisitoRepository extends JpaRepository<TipoRequisito, Long> {
}
