package com.afk.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "requisitos")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class Requisito {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_requisito")
    private Long id;

    @Column(name="descripcion_requisito",nullable = false,length = 250)
    private String descripcion;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_tipo_requisito")
    private TipoRequisito tipo;
}
