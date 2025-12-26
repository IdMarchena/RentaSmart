package com.afk.model.repository;

import com.afk.model.entity.HistorialInquilino;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface HistorialInquilinoRepository extends JpaRepository<HistorialInquilino, Long> {

    @Query("SELECT u From Usuario u WHERE u.id= :userId OR u.id= :userId")
    List<HistorialInquilino> findByUserId(@Param("userId") Long userId);

    @Query("SELECT c From Contrato c WHERE c.id= :userId OR c.id= :contratoId")
    List<HistorialInquilino> findByContratoId(@Param("contratoId") Long contratoId);
}
