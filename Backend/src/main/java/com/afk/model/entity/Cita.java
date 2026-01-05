package com.afk.model.entity;
import com.afk.model.entity.enums.EstadoCita;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "citas")
@Builder
public class Cita {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name="fecha_cita", nullable = false)
    private LocalDateTime fecha;


    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario_cita", nullable = false)
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_usuario_remitente", nullable = false)
    private Usuario usuarioRemitente;

    @Enumerated(EnumType.STRING)
    private EstadoCita estado;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_servicio")
    private Servicio servicio;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_publicacion")
    private Publicacion publicacion;
}
