package com.afk.model.repository;

import com.afk.model.entity.UsuarioRegistrado;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface UsuarioRegistradoRepository extends JpaRepository<UsuarioRegistrado, Long> {

    Optional<UsuarioRegistrado> findByCorreo(String correo);
    boolean existsByCorreo(String correo);
}
