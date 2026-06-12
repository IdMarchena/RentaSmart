package com.afk.model.entity;

import com.afk.model.entity.enums.EstadoUsuarioRegistrado;
import com.afk.model.entity.enums.Roles;
import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

import java.time.LocalDateTime;

@EqualsAndHashCode(callSuper = true)
@Getter
@Setter
@AllArgsConstructor
@SuperBuilder
@Entity
@NoArgsConstructor(access = AccessLevel.PUBLIC)
@Table(name = "usuarios-registrados")
@PrimaryKeyJoinColumn(name = "id_usuario")
public class UsuarioRegistrado extends Usuario {

    @Enumerated(EnumType.STRING)
    @Column(name="rol_usuario", nullable=false)
    private Roles rol;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_ubicacion")
    private Ubicacion ubicacion;

    @Column(name="fecha_registro",nullable = false)
    private LocalDateTime fechaRegistro;

    @Enumerated(EnumType.STRING)
    @Column(name="estado_usuario_registrado", nullable=false)
    private EstadoUsuarioRegistrado estado;

    @Column(name="telefono_usuario",nullable = false,length = 10)
    private String telefono;

    @Column(name="cedula",nullable = false,length = 10)
    private String cedula;
}

