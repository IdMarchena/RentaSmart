package com.afk.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "financiaciones")
@Builder
@Getter
@Setter
public class Financiacion {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_financiacion")
    private Long id;

    @Column(name = "numero_cuotas",nullable = false)
    private Integer numeroCuotas;

    @Column(name = "valor_cuota",nullable = false)
    private Integer valorCuota;

    @Column(name = "monto_total",nullable = false)
    private Float montoTotal;

    @Column(name = "interes",nullable = false)
    private Float interes;
}
