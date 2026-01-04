package com.afk.model.entity;

import com.afk.model.entity.enums.EstadoServicio;
import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "servicios")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Servicio {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_servicio")
    private Long id;

    @Column(name = "nombre",nullable = false,length = 255)
    private String nombre;

    @Column(name = "descripcion",nullable = false, length = 255)
    private String descripcion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_tipo_servicio", nullable = false)
    private TipoServicio tipo;

    @Column(name = "precio", nullable = false)
    private Integer precio;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_servicio", nullable = false)
    private EstadoServicio estado;

    @OneToMany(mappedBy = "servicio", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Calificacion> calificacion = new ArrayList<>();
}
