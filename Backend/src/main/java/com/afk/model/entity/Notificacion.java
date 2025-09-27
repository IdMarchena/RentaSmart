package com.afk.model.entity;
import com.afk.model.entity.enums.EstadoNotificacion;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@SuperBuilder
@Getter
@Setter
@Inheritance(strategy = InheritanceType.JOINED)
@Entity
@Table(name = "notifiaciones")
public class Notificacion {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name="mensaje",nullable = false, length = 250)
    private String mensaje;

    @Column(name="fecha_notificacion",nullable = false, length = 250)
    private LocalDateTime fecha;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = true)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_empresa", nullable = true)
    private Servicio servicio;

    @Enumerated(EnumType.STRING)
    private EstadoNotificacion estado;
}
