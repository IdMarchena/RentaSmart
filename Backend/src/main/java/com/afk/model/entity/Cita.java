package com.afk.model.entity;

import com.afk.model.entity.enums.EstadoCita;
import jakarta.persistence.*;
import lombok.*;
import com.afk.model.entity.enums.Estado;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "citas")
@Builder
@Data
public class Cita {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name="fecha_cita",nullable = false)
    private LocalDate fecha ;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario_postulante",nullable = false)
    private Usuario usuario;

    @Enumerated(EnumType.STRING)
    private EstadoCita estado_cita;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_empresa",nullable = false)
    private Servicio servicio;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_solicitud_servicio", nullable = false)
    private SolicitudServicio solicitudServicio;

}
