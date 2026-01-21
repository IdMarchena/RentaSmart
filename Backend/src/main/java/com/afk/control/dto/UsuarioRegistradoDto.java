    package com.afk.control.dto;

    import com.afk.model.entity.enums.EstadoUsuarioRegistrado;
    import com.afk.model.entity.enums.Roles;

    import java.time.LocalDateTime;

    public record UsuarioRegistradoDto(
            Long id,
            Roles rol,
            String nombre,
            String correo,
            String clave,
            Long idUbicacion,
            LocalDateTime fechaRegistro,
            EstadoUsuarioRegistrado estado,
            String telefono,
            String cedula
    ) {}