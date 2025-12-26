package com.afk.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "tipos_requisito")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Getter
@Setter
public class TipoRequisito {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_tipo_requisito")
    private Long id;

    @Column(name = "nombre",nullable = false,length = 100)
    private String nombre;
}
