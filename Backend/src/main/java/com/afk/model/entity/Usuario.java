package com.afk.model.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@Inheritance(strategy = InheritanceType.JOINED)
@Getter
@Setter
@Entity
@Table(name = "usuarios")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SuperBuilder
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_usuario")
    private Long id;

    @Column(name = "nombre_usuario", length = 150, nullable = false)
    private String nombre;

    @Column(name = "correo_usuario", length = 150, nullable = false, unique = true)
    private String correo;

    @Column(name = "clave_usuario", length = 30, nullable = false)
    private String clave;
}
