package com.afk.control.security.jwt;

import io.micrometer.common.lang.NonNull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;

@Component
@RequiredArgsConstructor
@Slf4j
public class AuthTokenFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserDetailsService userDetailsService;

    @Override
    protected void doFilterInternal(@NonNull HttpServletRequest request,
                                    @NonNull HttpServletResponse response,
                                    @NonNull FilterChain filterChain) throws ServletException, IOException {

        String requestPath = request.getRequestURI();
        String method = request.getMethod();

        try {
            if ("OPTIONS".equals(method)) {
                filterChain.doFilter(request, response);
                return;
            }

            // IMPORTANTE: Siempre procesamos la autenticación.
            // No hacemos 'return' aunque sea público para que el SecurityContext tenga al usuario si el token existe.
            processJwtAuthentication(request);

        } catch (Exception e) {
            log.error("Error en JWT filter para {}: {}", requestPath, e.getMessage());
        }

        filterChain.doFilter(request, response);
    }

    private void processJwtAuthentication(HttpServletRequest request) {
        String requestUri = request.getRequestURI();

        // Excluir rutas de login/oauth para evitar bucles de validación en el apretón de manos
        if (requestUri.startsWith("/oauth2/") || requestUri.startsWith("/login/oauth2/")) {
            return;
        }

        String authHeader = request.getHeader(JwtProtocolConfig.HEADER_AUTHORIZATION);
        String cookieToken = extractTokenFromCookie(request);

        // El util debe ser capaz de decidir cuál tomar
        String token = jwtUtil.extractTokenFromRequest(authHeader, cookieToken);

        if (token != null) {
            JwtValidationResult validationResult = jwtUtil.validateAndParseToken(token);

            if (validationResult.isValid()) {
                String username = validationResult.getUsername();
                if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    authenticateUser(request, username);
                }
            } else {
                log.debug("Token detectado pero inválido: {}", validationResult.getErrorMessage());
            }
        }
    }

    private void authenticateUser(HttpServletRequest request, String username) {
        try {
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);
            UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                    userDetails, null, userDetails.getAuthorities());
            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            log.debug("Usuario autenticado vía JWT: {}", username);
        } catch (Exception e) {
            log.error("Fallo al cargar UserDetails para: {}", username);
        }
    }

    private String extractTokenFromCookie(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if (JwtProtocolConfig.COOKIE_TOKEN_NAME.equals(cookie.getName()) || "token".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }
}