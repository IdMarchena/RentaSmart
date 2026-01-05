    package com.afk.control.dto;

    import com.afk.model.entity.enums.EstadoUsuarioRegistrado;
    import java.time.LocalDateTime;

    public record UsuarioRegistradoDto(
            Long id,
            String nombre,
            String correo,
            String clave,
            Long idRol,
            Long idUbicacion,
            LocalDateTime fechaRegistro,
            EstadoUsuarioRegistrado estado,
            String telefono,
            String cedula
    ) {}