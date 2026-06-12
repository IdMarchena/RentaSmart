package com.afk.model.entity;

import com.afk.model.entity.enums.EstadoPago;
import com.afk.model.entity.enums.TipoFactura;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "facturas")
@Builder
public class Factura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_factura")
    private Long id;

    @Column(name = "fecha_emision", nullable = false)
    private LocalDateTime fechaEmision;

    @Column(name = "detalle", nullable = false,length = 1000)
    private String detalle;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_pago", nullable = false)
    private Pago pago;

    @Enumerated(EnumType.STRING)
    @Column(name="tipo_factura",nullable = false)
    private TipoFactura tipoFactura;

    @Column(name="origen_factura",nullable = false)
    private Long idOrigen;

    @Enumerated(EnumType.STRING)
    @Column(name="estado_factura",nullable = false)
    private EstadoPago estado;

}
