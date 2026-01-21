package com.afk.model.repository;

import com.afk.model.entity.Ubicacion;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UbicacionRepository extends JpaRepository<Ubicacion, Long> {
    List<Ubicacion> findByNombre(String nombre);
    Optional<Ubicacion> findByNombreIgnoreCase(String nombre);
    Optional<Ubicacion> findByNombreAndLatitudAndLongitud(String nombre, Double latitud, Double longitud);

}
