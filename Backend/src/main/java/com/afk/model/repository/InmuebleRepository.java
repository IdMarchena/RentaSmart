package com.afk.model.repository;

import com.afk.model.entity.Inmueble;
import com.afk.model.entity.enums.EstadoInmueble;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;
@Repository
public interface InmuebleRepository extends JpaRepository<Inmueble, Long> {

    List<Inmueble> findByUbicacionId(Long ubicacionId);

    List<Inmueble> findByEstadoInmueble(EstadoInmueble estadoInmueble);

    List<Inmueble> findByNombre(String nombre);

    List<Inmueble> findByEstrato(Integer estrato);


    @Query("SELECT i FROM Inmueble i WHERE i.nombre LIKE %:nombre% AND i.estrato = :estrato")
    List<Inmueble> findByNombreAndEstrato(@Param("nombre") String nombre, @Param("estrato") Integer estrato);

    @Query("SELECT i FROM Inmueble i WHERE i.ubicacion.id = :ubicacionId AND i.estadoInmueble = :estadoInmueble")
    List<Inmueble> findByUbicacionAndEstado(@Param("ubicacionId") Long ubicacionId,
                                            @Param("estadoInmueble") EstadoInmueble estadoInmueble);
}
