package com.afk.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

import com.afk.model.entity.Factura;

@Entity
@Table(name = "alquileres")
@Data
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Alquiler {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "fecha_inicio", nullable = false)
    private LocalDateTime fechaInicio;

    @Column(name = "fecha_fin", nullable = false)
    private LocalDateTime fechaFin;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn (name="id_historial_inquilino", nullable = false)
    private List<HistorialInquilino> historialInquilinos;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn (name="idFactura", nullable = false)
    private List<Factura> factura;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_servicio", nullable = false)
    private List<Servicio> servicios;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_calificacion", nullable = false)
    private List<Calificacion> calificacion;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_cita", nullable = false)
    private List<Cita> citas;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_favorito", nullable = false)
    private List<Favorito> favorito;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_publicacion", nullable = false)
    private List<Publicacion> publicacions;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_inmueble", nullable = false)
    private List<Inmueble> inmuebles;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_solicitud_servicio", nullable = false)
    private List<SolicitudServicio> solicitudServicios;

    @OneToMany(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_chats", nullable = false)
    private List<Chat> chats;
}
