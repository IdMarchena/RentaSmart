package com.afk.model.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "calificaciones")
@Builder
@Getter
@Setter
public class Calificacion {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column(name = "puntaje_calificacion", nullable = false)
    private Integer puntaje;

    @Column(name="comentario_calificacion",nullable = false,length = 100)
    private String comentario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario_postulante",nullable = false)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_Publicacion")
    private Publicacion publicacion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="id_servicios")
    private Servicio servicio;

    @Column(name="fecha_creacion",nullable = false)
    private LocalDateTime fecha;
}
