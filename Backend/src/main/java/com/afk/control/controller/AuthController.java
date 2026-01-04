package com.afk.control.controller;

import com.afk.backend.control.dto.JwtResponse;
import com.afk.backend.control.dto.LoginRequest;
import com.afk.control.dto.SignUpRequest;
import com.afk.control.security.jwt.JwtUtil;
import com.afk.model.entity.*;
import com.afk.model.entity.enums.EstadoUsuarioRegistrado;
import com.afk.model.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import com.afk.model.entity.Rol;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final RolRepository rolRepository;
    private final UsuarioRegistradoRepository usuarioRegistradoRepository;
    private final UbicacionRepository ubicacionRepository;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.username(),
                            loginRequest.password()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwtToken = jwtUtil.generateJwtToken(authentication);

            UsuarioRegistrado user = usuarioRegistradoRepository
                    .findByCorreo(loginRequest.username())
                    .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));

            String rol = user.getRol().getRole().name();

            return ResponseEntity.ok(
                    new JwtResponse(
                            jwtToken,
                            "Bearer",
                            user.getCorreo(),
                            List.of(rol)
                    )
            );

        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Error de autenticación: " + e.getMessage());
        }
    }


    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequest sRequest) {
        try {
            if (usuarioRegistradoRepository.existsByCorreo(sRequest.correo())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Error: El correo electrónico ya está en uso.");
            }

            Rol rol = rolRepository.findByRole(sRequest.rol())
                    .orElseThrow(() ->
                            new RuntimeException("Rol no encontrado: " + sRequest.rol()));

            Ubicacion ubicacion = ubicacionRepository.findById(1L)
                    .orElseThrow(() ->
                            new RuntimeException("Ubicación no encontrada"));

            UsuarioRegistrado nuevoUsuario = UsuarioRegistrado.builder()
                    .nombre(sRequest.nombre())
                    .correo(sRequest.correo())
                    .clave(passwordEncoder.encode(sRequest.contrasenia()))
                    .telefono(sRequest.cel())
                    .ubicacion(ubicacion)
                    .rol(rol)
                    .fechaRegistro(LocalDateTime.now())
                    .estado(EstadoUsuarioRegistrado.ACTIVO)
                    .build();

            usuarioRegistradoRepository.save(nuevoUsuario);

            return ResponseEntity.ok("Usuario registrado correctamente");

        } catch (RuntimeException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Error en el registro: " + e.getMessage());
        }
    }



    @GetMapping("/login")
    public ResponseEntity<String> loginGetFallback() {
        return ResponseEntity.status(HttpStatus.METHOD_NOT_ALLOWED)
                .body("Debes usar POST para iniciar sesión.");
    }


}

