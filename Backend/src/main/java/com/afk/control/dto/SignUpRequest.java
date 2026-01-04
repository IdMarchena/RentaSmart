package com.afk.control.dto;
import com.afk.model.entity.enums.Roles;

public record SignUpRequest(String nombre,
                            String apellido,
                            String dirección,
                            String cel,
                            String correo,
                            String contrasenia,
                            String codigo,
                            Roles rol) {
}
