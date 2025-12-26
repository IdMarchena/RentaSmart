package com.afk.model.repository;

import com.afk.model.entity.UsuarioRegistrado;
import com.afk.model.entity.UsuarioRol;
import com.afk.model.entity.enums.EstadoUsuarioRol;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UsuarioRolRepository extends JpaRepository<UsuarioRol, Long> {
    List<UsuarioRol> findByUsuarioRegistradoIdOrderByFechaActivacionRolDesc(Long usuarioId);
    Optional<UsuarioRol> findByUsuarioRegistradoAndEstadoUsuarioRol(UsuarioRegistrado usuario, EstadoUsuarioRol estadoUsuarioRol);
    List<UsuarioRol> findByRolId(Long rolId);
    List<UsuarioRol> findAllByUsuarioRegistradoAndEstadoUsuarioRol(UsuarioRegistrado usuario, EstadoUsuarioRol estadoUsuarioRol);

}
