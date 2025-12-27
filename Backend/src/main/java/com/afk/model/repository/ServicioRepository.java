package com.afk.model.repository;

import com.afk.model.entity.Servicio;
import com.afk.model.entity.enums.EstadoServicio;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServicioRepository extends JpaRepository<Servicio, Long> {
    List<Servicio> findByEstado(EstadoServicio estado);
    List<Servicio> findByNombre(String nombre);
}
