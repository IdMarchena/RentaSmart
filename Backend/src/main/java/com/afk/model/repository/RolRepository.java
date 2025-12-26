package com.afk.model.repository;

import java.util.Optional;

import com.afk.model.entity.Rol;
import com.afk.model.entity.enums.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RolRepository extends JpaRepository<Rol, Long> {
    Optional<Rol> findByRole(Roles name);
}
