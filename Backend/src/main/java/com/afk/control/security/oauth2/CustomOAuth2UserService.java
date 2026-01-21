package com.afk.control.security.oauth2;
import com.afk.control.security.service.UserDetailsImpl;
import com.afk.model.entity.Ubicacion;
import com.afk.model.entity.UsuarioRegistrado;
import com.afk.model.entity.enums.EstadoUsuarioRegistrado;
import com.afk.model.entity.enums.Roles;
import com.afk.model.repository.UbicacionRepository;
import com.afk.model.repository.UsuarioRegistradoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.*;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UsuarioRegistradoRepository usuarioRepository;
    private final UbicacionRepository ubicacionRepository;

    @Override
    @Transactional
    public OAuth2User loadUser(OAuth2UserRequest userRequest) {
        OAuth2User oAuth2User = super.loadUser(userRequest);
        Map<String, Object> attributes = oAuth2User.getAttributes();
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        log.debug("Procesando usuario OAuth2 desde: {}", registrationId);
        String correo = extractEmail(userRequest, attributes, registrationId);
        String nombre = extractName(attributes, registrationId);

        if (correo == null) {
            throw new RuntimeException("No se pudo obtener el correo del proveedor OAuth2: " + registrationId);
        }
        Map<String, Object> modifiedAttributes = new HashMap<>(attributes);
        modifiedAttributes.put("email", correo);
        UsuarioRegistrado user = findOrCreateUser(correo, nombre);
        List<SimpleGrantedAuthority> authorities = getUserAuthorities(user);

        log.info("Usuario OAuth2 procesado exitosamente: {}", correo);

        return UserDetailsImpl.build(user, authorities, modifiedAttributes);
    }

    private String extractEmail(OAuth2UserRequest userRequest, Map<String, Object> attributes, String registrationId) {
        String correo = null;

        if ("google".equals(registrationId)) {
            correo = (String) attributes.get("email");
        } else if ("github".equals(registrationId)) {
            correo = (String) attributes.get("email");
            if (correo == null) {
                correo = fetchGithubPrimaryEmail(userRequest);
                if (correo == null) {
                    throw new RuntimeException("⚠️ GitHub no retornó correo. Asegúrate de que el correo no sea privado y estés pidiendo el scope `user:email`.");
                }
            }
        }
        return correo;
    }

    private String extractName(Map<String, Object> attributes, String registrationId) {
        return (String) attributes.get("name");
    }

    private UsuarioRegistrado findOrCreateUser(String correo, String nombre) {
        Optional<UsuarioRegistrado> existente = usuarioRepository.findByCorreo(correo);

        if (existente.isPresent()) {
            log.debug("Usuario existente encontrado: {}", correo);
            return existente.get();
        }

        log.debug("Creando nuevo usuario OAuth2: {}", correo);
        return createNewUser(correo, nombre);
    }

    private UsuarioRegistrado createNewUser(String correo, String nombre) {
        List<Ubicacion> ubicacionDefault = ubicacionRepository.findByNombre("Santa Marta");
        if(ubicacionDefault.isEmpty()) throw new RuntimeException("No se pudo obtener el ubicacion default");
        UsuarioRegistrado user = UsuarioRegistrado.builder()
                .nombre(nombre != null ? nombre : "Usuario OAuth2")
                .correo(correo)
                .clave("OAUTH2") // placeholder
                .rol(Roles.ARRENDATARIO)
                .ubicacion(ubicacionDefault.get(1))
                .telefono("0000000000")
                .cedula("0000000000")
                .estado(EstadoUsuarioRegistrado.ACTIVO)
                .fechaRegistro(LocalDateTime.now())
                .build();

        log.info("Usuario OAuth2 creado: {}", correo);
        return usuarioRepository.save(user);

    }

    private List<SimpleGrantedAuthority> getUserAuthorities(UsuarioRegistrado user) {
        if (user.getRol() == null) {
            throw new RuntimeException("El usuario no tiene rol asignado");
        }
        return List.of(
                new SimpleGrantedAuthority(
                        user.getRol().name().toUpperCase()
                )
        );
    }

    private String fetchGithubPrimaryEmail(OAuth2UserRequest userRequest) {
        String token = userRequest.getAccessToken().getTokenValue();
        try {
            RestTemplate restTemplate = new RestTemplate();
            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "token " + token);
            headers.add("Accept", "application/vnd.github.v3+json");
            HttpEntity<Void> entity = new HttpEntity<>(headers);
            ResponseEntity<List<Map<String, Object>>> response = restTemplate.exchange(
                    "https://api.github.com/user/emails",
                    HttpMethod.GET,
                    entity,
                    (Class<List<Map<String, Object>>>) (Class<?>) List.class
            );
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                List<Map<String, Object>> emails = response.getBody();
                for (Map<String, Object> emailEntry : emails) {
                    Boolean primary = (Boolean) emailEntry.get("primary");
                    Boolean verified = (Boolean) emailEntry.get("verified");
                    String email = (String) emailEntry.get("email");
                    if (Boolean.TRUE.equals(primary) && Boolean.TRUE.equals(verified)) {
                        log.debug("Email primario de GitHub obtenido: {}", email);
                        return email;
                    }
                }
            }
            log.warn("No se encontró email primario verificado en GitHub");
            return null;
        } catch (Exception e) {
            log.error("Error al obtener email primario de GitHub: {}", e.getMessage());
            return null;
        }
    }

}
