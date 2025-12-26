package com.afk.model.repository;

import com.afk.model.entity.Financiacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FinanciacionRepository extends JpaRepository<Financiacion, Long> {
}
