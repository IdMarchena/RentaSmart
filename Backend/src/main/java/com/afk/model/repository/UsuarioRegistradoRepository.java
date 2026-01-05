package com.afk.model.repository;

import com.afk.model.entity.UsuarioRegistrado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UsuarioRegistradoRepository extends JpaRepository<UsuarioRegistrado, Long> {

    @Query("SELECT u FROM UsuarioRegistrado u WHERE u.correo = :correo")
    Optional<UsuarioRegistrado> findByCorreo(@Param("correo") String correo);
    boolean existsByCorreo(String correo);
}
