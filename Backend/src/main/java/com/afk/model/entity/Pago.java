package com.afk.model.entity;

import com.afk.model.entity.enums.EstadoPago;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "pagos")
@Builder
public class Pago {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_pago")
    private Long id;

    @Column(name = "fecha",nullable = false)
    private LocalDateTime fecha;

    @Column(name = "monto",nullable = false)
    private Integer monto;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_tipo_pago", nullable = false)
    private TipoPago tipo;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_pago", nullable = false)
    private EstadoPago estado;

    @Column(name = "moneda")
    private String moneda;

    @Column(name = "stripeId")
    private String stripePaymentIntentId;

    @Column(name="origen_pago_id")
    private Long origenId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="id_usuario",nullable = false)
    private Usuario usuario;
}
