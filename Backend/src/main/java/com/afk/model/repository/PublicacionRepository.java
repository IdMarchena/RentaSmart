package com.afk.model.repository;

import com.afk.model.entity.Publicacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PublicacionRepository extends JpaRepository<Publicacion, Long> {

    @Query("SELECT p FROM Publicacion p WHERE p.inmueble.id = :idVacante")
    List<Publicacion> findByVacanteId(Long idVacante);

    @Query("SELECT p FROM Publicacion p WHERE p.inmueble.servicio.id = :idEmpresa")
    List<Publicacion> findByVacanteEmpresaId(Long idEmpresa);
}
