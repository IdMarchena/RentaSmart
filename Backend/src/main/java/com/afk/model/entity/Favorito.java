package com.afk.model.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(
        name = "favoritos",
        uniqueConstraints = {
                @UniqueConstraint(columnNames = {"id_usuario", "id_publicacion"})
        }
)
@Builder
public class Favorito {
    @Id
    @GeneratedValue(strategy =  GenerationType.AUTO)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_usuario")
    private Usuario usuario;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "id_publicacion")
    private Publicacion publicacion;


    @Column(name="fecha_favorito",nullable = false)
    private LocalDateTime fecha;
}
