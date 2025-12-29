package com.afk.model.entity;

import com.afk.model.entity.enums.EstadoMultimedia;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "multimedias")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Multimedia {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_multimedia")
    private Long id;

    @Column(name = "url", nullable = false)
    private String url;


    @Column(name = "tipo", nullable = false)
    private EstadoMultimedia tipo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_publicacion", nullable = false)
    private Publicacion publicacion;

    @Column(nullable = false)
    private Integer orden;
}
