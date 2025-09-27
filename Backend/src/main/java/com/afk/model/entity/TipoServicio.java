package com.afk.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tipos_servicio")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TipoServicio {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_tipo_servicio")
    private Long id;

    @Column(name = "descripcion",nullable = false,length = 250)
    private String descripcion;
}
