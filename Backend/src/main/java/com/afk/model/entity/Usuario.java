    package com.afk.model.entity;

    import jakarta.persistence.*;
    import lombok.*;
    import lombok.experimental.SuperBuilder;

    @Inheritance(strategy = InheritanceType.JOINED)
    @Entity
    @Table(name = "usuarios")
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
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

        @Column(name = "clave_usuario", length = 70, nullable = false)
        private String clave;
    }
