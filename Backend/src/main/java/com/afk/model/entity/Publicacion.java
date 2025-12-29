package com.afk.model.entity;

import com.afk.model.entity.enums.EstadoPublicacion;
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
@Table(name = "publicaciones")
@Builder
@Data
public class Publicacion {
    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    private Long id;

    @Column(name="titulo_publicacion", nullable = false,length = 100)
    private String titulo;

    @Column(name="descripion_publicacion", nullable = false,length = 1000)
    private String desripcion;

    @OneToOne(fetch =  FetchType.LAZY)
    @JoinColumn(name="id_vacante",nullable = false)
    private Inmueble inmueble;

    @Column(name="fecha_publicacion", nullable = false)
    private LocalDateTime fechaPublicacion;

    @Enumerated(EnumType.STRING)
    private EstadoPublicacion estadoPublicacion;

    @OneToMany(mappedBy = "publicacion", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Calificacion> calificaciones = new ArrayList<>();

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name="id_usuario",nullable = false)
    private Usuario usuario;

    @Column(name="precio",nullable = false)
    private Double precio;

    @OneToMany(mappedBy = "publicacion", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Multimedia> multimedia = new ArrayList<>();
}
