package com.afk.control.controller;
import com.afk.backend.control.dto.LoginRequest;
import com.afk.control.dto.SignUpRequest;
import com.afk.control.dto.UsuarioRegistradoDto;
import com.afk.control.security.jwt.JwtProtocolConfig;
import com.afk.control.security.jwt.JwtUtil;
import com.afk.control.security.service.UserDetailsImpl;
import com.afk.model.entity.*;
import com.afk.model.entity.enums.EstadoUsuarioRegistrado;
import com.afk.model.entity.enums.Roles;
import com.afk.model.repository.*;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
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

import java.time.LocalDateTime;
import com.afk.control.dto.JsonResponse;
@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Slf4j
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final PasswordEncoder passwordEncoder;
    private final UsuarioRegistradoRepository usuarioRegistradoRepository;
    private final UbicacionRepository ubicacionRepository;
    private final JwtProtocolConfig protocolConfig;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest, HttpServletResponse response) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.username(),
                            loginRequest.password()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);
            String jwtToken = jwtUtil.generateJwtToken(authentication);

            Cookie jwtCookie = new Cookie(JwtProtocolConfig.COOKIE_TOKEN_NAME, jwtToken);
            jwtCookie.setHttpOnly(true);
            jwtCookie.setPath("/");
            jwtCookie.setMaxAge((int) (protocolConfig.getJwtExpirationMs() / 1000));
            response.addCookie(jwtCookie);

            UsuarioRegistrado user = usuarioRegistradoRepository
                    .findByCorreo(loginRequest.username())
                    .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
            // 2. IMPORTANTE: Convertimos a DTO (esto evita el error de Jackson con Lazy Loading)
            UsuarioRegistradoDto userDto = new UsuarioRegistradoDto(
                    user.getId(),
                    user.getRol(),
                    user.getNombre(),
                    user.getCorreo(),
                    null, // No enviamos la clave al frontend por seguridad
                    user.getUbicacion().getId(), // Accedemos solo al ID
                    user.getFechaRegistro(),
                    user.getEstado(),
                    user.getTelefono(),
                    user.getCedula()
            );

            return ResponseEntity.ok(new JsonResponse<>(true, "Login exitoso", userDto, 200));
        } catch (Exception e) {
            log.error("Error detallado en inicio de sesion: ", e);
            return ResponseEntity.status(401).body("Error: " + e.getMessage());
        }
    }


    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignUpRequest sRequest) {
        try {
            if (usuarioRegistradoRepository.existsByCorreo(sRequest.correo())) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                        .body("Error: El correo electrónico ya está en uso.");
            }

            Roles rol = Roles.valueOf(sRequest.rol().name().toUpperCase());


            Ubicacion ubicacion = ubicacionRepository.findById(1L)
                    .orElseThrow(() ->
                            new RuntimeException("Ubicación no encontrada"));

            UsuarioRegistrado nuevoUsuario = new UsuarioRegistrado();
            nuevoUsuario.setNombre(sRequest.nombre());
            nuevoUsuario.setCorreo(sRequest.correo());
            nuevoUsuario.setClave(passwordEncoder.encode(sRequest.contrasenia())); // BCrypt
            nuevoUsuario.setTelefono(sRequest.cel());
            nuevoUsuario.setCedula(sRequest.cedula() != null ? sRequest.cedula() : "PENDIENTE"); // Asegurar que no sea null
            nuevoUsuario.setUbicacion(ubicacion);
            nuevoUsuario.setRol(rol);
            nuevoUsuario.setFechaRegistro(LocalDateTime.now());
            nuevoUsuario.setEstado(EstadoUsuarioRegistrado.ACTIVO);

            usuarioRegistradoRepository.save(nuevoUsuario);

            return ResponseEntity.ok(new JsonResponse<>(true, "Usuario registrado correctamente", null, 200));

        } catch (RuntimeException e) {
            log.error("Error detallado en registro: ", e);
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

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpServletResponse response) {
        // 1. Borrar la cookie principal definida en config
        Cookie jwtCookie = new Cookie(JwtProtocolConfig.COOKIE_TOKEN_NAME, null);
        jwtCookie.setHttpOnly(true);
        jwtCookie.setPath("/"); // DEBE coincidir con el path del login
        jwtCookie.setMaxAge(0);  // 0 indica al navegador borrarla inmediatamente
        jwtCookie.setSecure(false); // Ponlo en true si usas HTTPS
        response.addCookie(jwtCookie);
        // 2. Borrar la cookie "token" legacy (por si acaso existe)
        Cookie legacyCookie = new Cookie("token", null);
        legacyCookie.setHttpOnly(true);
        legacyCookie.setPath("/");
        legacyCookie.setMaxAge(0);
        response.addCookie(legacyCookie);
        // 3. Limpiar el contexto de seguridad de Spring en el servidor
        SecurityContextHolder.clearContext();
        return ResponseEntity.ok(new JsonResponse<>(true, "Sesión cerrada exitosamente", null, 200));
    }

    @GetMapping("/me")
    public ResponseEntity<?> getActualUsuario() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || !authentication.isAuthenticated() ||
                authentication.getPrincipal().equals("anonymousUser")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(new JsonResponse<>(false, "No hay sesión activa", null, 401));
        }

        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();

        UsuarioRegistrado user = usuarioRegistradoRepository.findByCorreo(userDetails.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado"));
        UsuarioRegistradoDto response = new UsuarioRegistradoDto(
                user.getId(),
                user.getRol(),
                user.getNombre(),
                user.getCorreo(),
                user.getClave(),
                user.getUbicacion().getId(),
                user.getFechaRegistro(),
                user.getEstado(),
                user.getTelefono(),
                user.getCedula()
        );


        return ResponseEntity.ok(new JsonResponse<>(true, "Usuario recuperado", response, 200));
    }


}

