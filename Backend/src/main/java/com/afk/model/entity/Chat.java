package com.afk.model.entity;

import com.afk.model.entity.enums.EstadoChat;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "chats")
@Builder
public class Chat {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario_a", nullable = false)
    private Usuario usuarioa;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario_b", nullable = false)
    private Usuario usuariob;

    @Builder.Default
    @OneToMany(mappedBy = "chat",fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Mensaje> mensajes = new ArrayList<>();

    @Enumerated(EnumType.STRING)
    private EstadoChat estado_chat;

    @Column(name = "fecha_creacion", nullable = false)
    private LocalDateTime fechaCreacion;
}
