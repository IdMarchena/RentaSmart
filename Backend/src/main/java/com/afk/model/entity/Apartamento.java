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

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_habitacion", nullable = false)
    private List<Habitacion> habitaciones;
}
