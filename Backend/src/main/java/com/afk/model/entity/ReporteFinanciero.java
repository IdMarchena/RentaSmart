package com.afk.model.entity;

import com.afk.model.entity.enums.EstadoReporteFinanciero;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "reportes_financieros")
@Builder
@Data
public class ReporteFinanciero {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_reporte_financiero")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario", nullable = false)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_inmueble", nullable = false)
    private Inmueble inmueble;

    @Column(name = "contenido", nullable = false, length = 500)
    private String contenido;

    @Column(name = "fecha",nullable = false)
    private LocalDateTime fecha;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_tipo_reporte", nullable = false)
    private TipoReporte tipo;

    @Enumerated(EnumType.STRING)
    private EstadoReporteFinanciero estado;
}
