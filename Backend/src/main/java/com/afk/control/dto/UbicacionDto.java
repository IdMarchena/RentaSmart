package com.afk.control.dto;

import com.afk.model.entity.Ubicacion;
import com.afk.model.entity.enums.EstadoUbicacion;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UbicacionDto {
    private Long id;
    private Ubicacion padre;
    private String nombre;
    private Double latitud;
    private Double longitud;
    @Enumerated(EnumType.STRING)
    private EstadoUbicacion estado;
}
