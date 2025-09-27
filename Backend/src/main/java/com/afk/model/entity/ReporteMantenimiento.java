package com.afk.model.entity;

import com.afk.model.entity.enums.EstadoReporteMantenimiento;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "reportes_mantenimiento")
@Builder
@Data
public class ReporteMantenimiento {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_reporte_mantenimiento")
    private Long id;

    @Column(name = "descripcion",nullable = false,length = 100)
    private String descripcion;

    @Column(name = "fecha",nullable = false)
    private LocalDateTime fecha;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_servicio", nullable = false)
    private Servicio servicio;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario_profesional", nullable = false)
    private Usuario usuarioProfesional;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_ususario_generador_reporte", nullable = false)
    private Usuario ususarioGenerador;

    @Enumerated(EnumType.STRING)
    private EstadoReporteMantenimiento estado;

    @Column(name="severidad_reporte_empresa", nullable = false,length = 1000)
    private String severidad;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="id_tipo_reporte",nullable = false)
    private TipoReporte tipoReporte;
}
