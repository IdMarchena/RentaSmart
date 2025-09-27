package com.afk.model.repository;

import com.afk.model.entity.Chat;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ChatRepository extends JpaRepository<Chat, Long> {
    @Query("SELECT c FROM Chat c WHERE c.usuarioa.id = :userId OR c.usuariob.id = :userId")
    List<Chat> findByUsuarioId(@Param("userId") Long userId);

    @Query("SELECT c FROM Chat c WHERE (c.usuarioa.id = :user1 AND c.usuariob.id = :user2) " +
            "OR (c.usuarioa.id = :user2 AND c.usuariob.id = :user1)")
    List<Chat> findChatsBetweenUsers(@Param("user1") Long user1Id, @Param("user2") Long user2Id);
}
