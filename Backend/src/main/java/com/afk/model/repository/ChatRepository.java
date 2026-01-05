package com.afk.model.repository;

import com.afk.model.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import java.util.Optional;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {

    Chat findByNombre(String nombre);

    @Query("SELECT c FROM Chat c WHERE " +
            "(c.usuarioa.id = :u1 AND c.usuariob.id = :u2) OR " +
            "(c.usuarioa.id = :u2 AND c.usuariob.id = :u1)")
    Optional<Chat> findByUsuarios(@Param("u1") Long idUsuarioA, @Param("u2") Long idUsuarioB);

}
