package com.afk.model.entity;

import com.afk.model.entity.enums.EstadoInmueble;
import jakarta.persistence.*;
import lombok.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "inmuebles")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Inmueble {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_inmueble")
    private Long id;

    @Column(name = "descripcion")
    private String descripcion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_ubicacion", nullable = false)
    private Ubicacion ubicacion;

    @Column(name = "area_total", nullable = false)
    private Integer areaTotal;

    @Column(name = "estrato_inmueble", nullable = false)
    private Integer estrato;

    @Enumerated(EnumType.STRING)
    private EstadoInmueble estadoInmueble;

    @Column(name = "nombre", length = 150,unique=true)
    private String nombre;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_servicio")
    private Servicio servicio;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name= "id_arrendatario")
    private Usuario usuario;

    @Builder.Default
    @OneToMany(mappedBy = "inmueble", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Habitacion> habitaciones = new ArrayList<>();
}

