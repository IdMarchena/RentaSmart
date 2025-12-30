package com.afk.model.repository;

import com.afk.model.entity.Cita;
import com.afk.model.entity.Publicacion;
import com.afk.model.entity.Servicio;
import com.afk.model.entity.Usuario;
import com.afk.model.entity.enums.EstadoCita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface CitaRepository  extends JpaRepository<Cita, Long> {

    boolean existsByUsuarioAndFechaAndEstadoIn(
            Usuario usuario,
            LocalDateTime fecha,
            List<EstadoCita> estados
    );

    boolean existsByServicioAndFechaAndEstadoIn(
            Servicio servicio,
            LocalDateTime fecha,
            List<EstadoCita> estados
    );

    boolean existsByPublicacionAndFechaAndEstadoIn(
            Publicacion publicacion,
            LocalDateTime fecha,
            List<EstadoCita> estados
    );

}
