package com.afk.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "apartamentos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@PrimaryKeyJoinColumn(name="id_inmueble")
public class Apartamento extends Inmueble {

    @OneToMany(mappedBy = "apartamento", fetch = FetchType.LAZY, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Habitacion> habitaciones;

    @Column(name="descripcion",nullable=false)
    private String descripcion;
}
