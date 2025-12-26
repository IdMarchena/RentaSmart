package com.afk.model.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;

@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "casas")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@SuperBuilder
public class Casa extends Inmueble {

    @Column(name = "numero_pisos")
    private Integer numeroPisos;
}
