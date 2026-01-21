    package com.afk.client.external.config;

    import com.afk.backend.control.dto.JwtResponse;
    import com.afk.control.security.jwt.AuthTokenFilter;
    import com.afk.control.security.jwt.JwtProtocolConfig;
    import com.afk.control.security.jwt.JwtUtil;
    import com.afk.control.security.oauth2.CustomOAuth2UserService;
    import com.afk.control.security.service.UserDetailsServiceImpl;
    import com.afk.model.entity.Ubicacion;
    import com.afk.model.entity.UsuarioRegistrado;
    import com.afk.model.entity.enums.EstadoUsuarioRegistrado;
    import com.afk.model.entity.enums.Roles;
    import com.afk.model.repository.UbicacionRepository;
    import com.afk.model.repository.UsuarioRegistradoRepository;
    import com.fasterxml.jackson.databind.ObjectMapper;
    import jakarta.servlet.http.Cookie;
    import jakarta.servlet.http.HttpServletRequest;
    import jakarta.servlet.http.HttpServletResponse;
    import lombok.RequiredArgsConstructor;
    import lombok.extern.slf4j.Slf4j;
    import org.springframework.context.annotation.Bean;
    import org.springframework.context.annotation.Configuration;
    import org.springframework.http.MediaType;
    import org.springframework.security.authentication.AuthenticationManager;
    import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
    import org.springframework.security.config.Customizer;
    import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
    import org.springframework.security.config.annotation.web.builders.HttpSecurity;
    import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
    import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
    import org.springframework.security.config.http.SessionCreationPolicy;
    import org.springframework.security.core.Authentication;
    import org.springframework.security.core.context.SecurityContextHolder;
    import org.springframework.security.core.userdetails.UserDetails;
    import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
    import org.springframework.security.crypto.password.PasswordEncoder;
    import org.springframework.security.oauth2.core.user.OAuth2User;
    import org.springframework.security.web.SecurityFilterChain;
    import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

    import java.io.IOException;
    import java.time.LocalDateTime;
    import java.util.List;
    import java.util.Optional;

    @Configuration
    @RequiredArgsConstructor
    @EnableWebSecurity
    @Slf4j
    public class SecurityConfig {

        private final CustomOAuth2UserService customOAuth2UserService;
        private final AuthTokenFilter authTokenFilter;
        private final JwtUtil jwtUtil;
        private final UserDetailsServiceImpl userDetailsServiceImpl;
        private final UsuarioRegistradoRepository usuarioRegistradoRepository;
        private final UbicacionRepository ubicacionRepository;
        private final JwtProtocolConfig protocolConfig;

        @Bean
        public AuthenticationManager authenticationManager(AuthenticationConfiguration config) throws Exception {
            return config.getAuthenticationManager();
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder();
        }

        @Bean
        public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
            log.info("Configurando Security Filter Chain con protocolo JWT");
            http
                    .csrf(AbstractHttpConfigurer::disable)
                    .cors(cors -> cors.configurationSource(request -> {
                        var corsConfig = new org.springframework.web.cors.CorsConfiguration();
                        corsConfig.setAllowedOrigins(List.of("http://localhost:9000","http://localhost:5173"));
                        corsConfig.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                        corsConfig.setAllowedHeaders(List.of("*"));
                        corsConfig.setAllowCredentials(true);
                        return corsConfig;
                    }))
                    .authorizeHttpRequests(auth -> auth
                            .requestMatchers(
                                    "/api/v1/auth/**",
                                    "/oauth2/**",  // Add this line for OAuth2 callback
                                    "/login/oauth2/**",
                                    "/api/ubicaciones/**",
                                    "/hello",
                                    "/api/webhooks/stripe"
                            ).permitAll()
                            .anyRequest().authenticated()
                    )
                    .httpBasic(AbstractHttpConfigurer::disable)
                    .sessionManagement(session -> session
                            .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                    )
                    .oauth2Login(oauth2 -> oauth2

                            .userInfoEndpoint(userInfo -> userInfo
                                    .userService(customOAuth2UserService)
                            )
                            .successHandler(this::handleOAuth2Success)
                            .failureHandler(this::handleOAuth2Failure)
                    )
                    .formLogin(form -> form.disable())
                    .addFilterBefore(authTokenFilter, UsernamePasswordAuthenticationFilter.class)
                    .csrf(csrf -> csrf.disable())
                    .cors(Customizer.withDefaults());

            return http.build();
        }

        private void handleOAuth2Success(HttpServletRequest request,
                                         HttpServletResponse response,
                                         Authentication authentication) throws IOException {
            try {
                OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
                String email = oauth2User.getAttribute("email");
                String name = oauth2User.getAttribute("name");

                log.debug("Procesando OAuth2 success para email: {}", email);

                // --- SOLUCIÓN AQUÍ ---
                // 1. Verificar si existe, si no, CREARLO antes de cargar UserDetails
                Optional<UsuarioRegistrado> usuarioOpt = usuarioRegistradoRepository.findByCorreo(email);

                if (usuarioOpt.isEmpty()) {
                    log.info("Usuario nuevo de Google detectado. Registrando: {}", email);

                    Ubicacion ubicacionDefault = ubicacionRepository.findById(1L)
                            .orElseThrow(() -> new RuntimeException("Ubicación por defecto no encontrada"));

                    UsuarioRegistrado nuevoUsuario = UsuarioRegistrado.builder()
                            .nombre(name != null ? name : "Usuario Google")
                            .correo(email)
                            .clave("OAUTH2_USER") // Password dummy
                            .rol(Roles.ARRENDATARIO) // O un rol por defecto
                            .ubicacion(ubicacionDefault)
                            .fechaRegistro(LocalDateTime.now())
                            .estado(EstadoUsuarioRegistrado.ACTIVO)
                            .telefono("0000000000")
                            .cedula("PENDIENTE")
                            .build();

                    usuarioRegistradoRepository.save(nuevoUsuario);
                }

                // 2. Ahora que ya existe en la DB, ya podemos cargarlo sin que explote
                UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(email);

                // ... el resto de tu código de generación de JWT se mantiene igual ...
                UsernamePasswordAuthenticationToken newAuth = new UsernamePasswordAuthenticationToken(
                        userDetails, null, userDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(newAuth);
                String jwt = jwtUtil.generateJwtToken(newAuth);

                Cookie jwtCookie = new Cookie(JwtProtocolConfig.COOKIE_TOKEN_NAME, jwt);
                jwtCookie.setHttpOnly(true);
                jwtCookie.setSecure(false); // Ponlo en true cuando tengas HTTPS
                jwtCookie.setPath("/");
                jwtCookie.setMaxAge((int) (protocolConfig.getJwtExpirationMs() / 1000));
                response.addCookie(jwtCookie);

                log.info("JWT entregado vía Cookie para: {}", email);

                // Sugerencia: En OAuth2 es mejor redirigir al frontend con el token o guardarlo en cookie
                response.sendRedirect("http://localhost:9000/dashboard");

            } catch (Exception e) {
                log.error("Error en OAuth2 success handler: {}", e.getMessage());
                response.sendRedirect("http://localhost:9000/login?error=oauth2");
            }
        }

        private void handleOAuth2Failure(HttpServletRequest request,
                                         HttpServletResponse response,
                                         Exception exception) throws IOException {
            log.error("Fallo en autenticación OAuth2: {}", exception.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            response.getWriter().write("{\"error\":\"" + exception.getMessage() + "\"}");
        }
    }