package com.afk.model.entity;

import com.afk.model.entity.enums.EstadoChat;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "mensajes")
@Builder
public class Mensaje {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "conversacion_id")
    private Chat chat;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "emisor_id")
    private Usuario emisor;

    @Column(columnDefinition = "TEXT")
    private String contenido;

    @Enumerated(EnumType.STRING)
    private EstadoChat estado;

    @Column(name = "fechaEnvio")
    private LocalDateTime fechaEnvio;
}
