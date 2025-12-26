package com.afk.model.entity;

import com.afk.model.entity.enums.EstadoChat;
import com.afk.model.entity.enums.EstadoInmueble;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Entity
@Table(name = "inmuebles")
@Inheritance(strategy = InheritanceType.JOINED)
@Data
@NoArgsConstructor
@AllArgsConstructor
@SuperBuilder
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

    @Column(name = "nombre", length = 150)
    private String nombre;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_servicio", nullable = true)
    private Servicio servicio;
}

