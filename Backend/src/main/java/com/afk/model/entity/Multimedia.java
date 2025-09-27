package com.afk.model.entity;

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

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="id_tipo_multimedia", nullable = false)
    private TipoMultimedia tipo;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_publicacion", nullable = false)
    private Publicacion publicacion;
}
