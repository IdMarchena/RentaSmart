package com.afk.model.entity;

import com.afk.model.entity.enums.Estado;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "habitaciones")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Habitacion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_habitacion")
    private Long id;

    @Column(name = "capacidad", nullable = false)
    private Integer capacidad;

    @Column(name = "precio", nullable = false)
    private Integer precio;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_habitacion", nullable = false)
    private Estado estado;
}
