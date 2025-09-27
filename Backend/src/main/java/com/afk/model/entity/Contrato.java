package com.afk.model.entity;

import com.afk.model.entity.enums.EstadoContrato;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "contratos")
@Builder
@Data
public class Contrato {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_contrato")
    private Long id;

    @Column(name = "contenido", nullable = false, length = 1000)
    private String contenido;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario_arrendatario", nullable = false)
    private Usuario usuarioArrendatario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario_arrendador", nullable = false)
    private Usuario usuarioArrendador;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_inmueble", nullable = false)
    private Inmueble inmueble;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_financiacion", nullable = true)
    private Financiacion financiacion;

    @Column(name = "fecha_inicio",nullable = false)
    private LocalDateTime fechaInicio;

    @Column(name = "fecha_finalizacion",nullable = true)
    private LocalDateTime fechaFinalizacion;

    @Column(name = "precio", nullable = false)
    private Integer precio;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_deposito", nullable = true)
    private Deposito deposito;

    @Enumerated(EnumType.STRING)
    @Column(name = "estado_contrato", nullable = false)
    private EstadoContrato estadoContrato;
}
