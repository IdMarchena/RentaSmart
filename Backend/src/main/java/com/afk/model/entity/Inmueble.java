package com.afk.model.entity;

import com.afk.model.entity.enums.EstadoInmueble;
import com.afk.model.entity.enums.TipoInmueble;
import jakarta.persistence.*;
import lombok.*;
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

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_inmueble", nullable = false)
    private TipoInmueble tipo;

    @Column(name = "descripcion")
    private String descripcion;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_ubicacion", nullable = false)
    private Ubicacion ubicacion;

    @Column(name = "area_total", nullable = false)
    private Integer areaTotal;

    @Column(name = "numero_banos", nullable = false)
    private Integer numeroBanos;

    @Column(name = "numero_pisos", nullable = false)
    private Integer numeroPisos;

    @Column(name = "capacidad_personas", nullable = false)
    private Integer capacidadPersonas;

    @Column(name = "estrato_inmueble", nullable = false)
    private Integer estrato;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_inmueble", nullable = false)
    private EstadoInmueble estadoInmueble;

    @Column(name = "nombre", length = 150,unique=true)
    private String nombre;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name= "id_arrendatario")
    private Usuario usuario;

    @Column(name = "numero_habitaciones", nullable = false)
    private Integer numeroHabitaciones;
}

