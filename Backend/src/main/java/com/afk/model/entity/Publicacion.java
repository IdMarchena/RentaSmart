package com.afk.model.entity;

import com.afk.model.entity.enums.EstadoPublicacion;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "publicaciones")
@Builder
@Getter
@Setter
public class Publicacion {
    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    private Long id;

    @Column(name="titulo_publicacion", nullable = false,length = 100)
    private String titulo;

    @Column(name="descripcion_publicacion", nullable = false, length = 1000)
    private String descripcion;

    @OneToOne(fetch =  FetchType.LAZY)
    @JoinColumn(name="id_inmueble",nullable = false)
    private Inmueble inmueble;

    @Column(name="fecha_publicacion", nullable = false)
    private LocalDateTime fechaPublicacion;

    @Enumerated(EnumType.STRING)
    private EstadoPublicacion estadoPublicacion;

    @Builder.Default
    @OneToMany(mappedBy = "publicacion", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Calificacion> calificaciones = new LinkedHashSet<>();

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="id_usuario",nullable = false)
    private Usuario usuario;

    @Column(name="precio",nullable = false)
    private Double precio;

    @Builder.Default
    @OneToMany(mappedBy = "publicacion", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Multimedia> multimedia = new LinkedHashSet<>();
}
