package com.afk.control.controller;

import com.afk.backend.control.dto.JwtResponse;
import com.afk.control.security.service.UserDetailsImpl;
import com.afk.model.entity.*;
import com.afk.model.entity.enums.EstadoUsuarioRegistrado;
import com.afk.model.entity.enums.Roles;
import com.afk.model.repository.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.Optional;

@Controller
@RequiredArgsConstructor
public class OAuth2SuccessController {

    private final UsuarioRegistradoRepository usuarioRegistradoRepository;
    private final RolRepository rolRepository;
    private final UbicacionRepository ubicacionRepository;

    @GetMapping("/loginSuccess")
    @ResponseBody
    public ResponseEntity<?> loginSuccess(
            HttpServletRequest request,
            @AuthenticationPrincipal UserDetailsImpl principal
    ) {

        if (principal == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("No autenticado");
        }

        String jwt = null;
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("token".equals(cookie.getName())) {
                    jwt = cookie.getValue();
                    break;
                }
            }
        }

        if (jwt == null) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("JWT no encontrado en cookies");
        }

        String email = principal.getUsername();
        String nombre = principal.getName();

        Optional<UsuarioRegistrado> existente =
                usuarioRegistradoRepository.findByCorreo(email);

        UsuarioRegistrado usuario;

        if (existente.isPresent()) {
            usuario = existente.get();
        } else {

            Rol rol = rolRepository.findByRole(Roles.USER)
                    .orElseThrow(() -> new RuntimeException("Rol USER no encontrado"));

            Ubicacion ubicacion = ubicacionRepository.findById(1L)
                    .orElseThrow(() -> new RuntimeException("Ubicación por defecto no encontrada"));

            usuario = UsuarioRegistrado.builder()
                    .nombre(nombre)
                    .correo(email)
                    .clave("OAUTH2") // dummy, NO se usa
                    .rol(rol)
                    .ubicacion(ubicacion)
                    .telefono("0000000000")
                    .cedula("0000000000")
                    .estado(EstadoUsuarioRegistrado.ACTIVO)
                    .fechaRegistro(LocalDateTime.now())
                    .build();

            usuario = usuarioRegistradoRepository.save(usuario);
        }

        return ResponseEntity.ok(
                new JwtResponse(
                        jwt,
                        "Bearer",
                        usuario.getCorreo(),
                        Collections.singletonList(usuario.getRol().getRole().name())
                )
        );
    }
}

