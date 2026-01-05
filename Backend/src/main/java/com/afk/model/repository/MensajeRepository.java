package com.afk.model.repository;

import com.afk.model.entity.Mensaje;
import com.afk.model.entity.enums.EstadoChat;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MensajeRepository extends JpaRepository<Mensaje, Long> {
        Page<Mensaje> findByChatIdOrderByFechaEnvioDesc(Long chatId, Pageable pageable);

        long countByChatIdAndEmisorIdNotAndEstadoNot(Long chatId, Long emisorId, EstadoChat estado);

        List<Mensaje> findByChatIdAndContenidoContainingIgnoreCase(Long chatId, String consulta);

        @Modifying
        @Query("UPDATE Mensaje m SET m.estado = :nuevoEstado WHERE m.chat.id = :chatId AND m.emisor.id != :usuarioId AND m.estado != :nuevoEstado")
        void marcarComoLeidos(@Param("chatId") Long chatId, @Param("usuarioId") Long usuarioId, @Param("nuevoEstado") EstadoChat nuevoEstado);
    }
