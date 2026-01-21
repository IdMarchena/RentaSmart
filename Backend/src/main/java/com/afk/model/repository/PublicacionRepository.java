package com.afk.model.repository;

import com.afk.model.entity.Publicacion;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PublicacionRepository extends JpaRepository<Publicacion, Long> {
    // Esto asegura que en un solo SELECT traigas todo lo necesario para el DTO
    @EntityGraph(attributePaths = {"multimedia", "inmueble", "usuario", "calificaciones"})
    List<Publicacion> findAll();

    @EntityGraph(attributePaths = {"multimedia", "inmueble", "usuario", "calificaciones"})
    Optional<Publicacion> findById(Long id);
}
