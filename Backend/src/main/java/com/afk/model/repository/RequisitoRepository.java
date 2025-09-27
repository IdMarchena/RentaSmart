package com.afk.model.repository;

import com.afk.model.entity.Requisito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RequisitoRepository extends JpaRepository<Requisito, Long> {
    List<Requisito> findByVacanteId(Long idInmbuele);
}
