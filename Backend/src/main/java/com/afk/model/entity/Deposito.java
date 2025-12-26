package com.afk.model.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Table(name = "depositos")
@Builder
@Data
public class Deposito {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "id_deposito")
    private Long id;

    @Column(name = "monto_total")
    private Float montoTotal;
}
