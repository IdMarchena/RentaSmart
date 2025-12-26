package com.afk.bootstrap;

import com.afk.model.entity.Rol;
import com.afk.model.entity.Ubicacion;
import com.afk.model.entity.enums.EstadoUbicacion;
import com.afk.model.entity.enums.Roles;
import com.afk.model.repository.RolRepository;
import com.afk.model.repository.UbicacionRepository;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer {

    private final RolRepository rolRepository;
    private final UbicacionRepository ubicacionRepository;

    @PostConstruct
    public void initData() {
        initRoles();
        initDefaultUbicacion();
    }

    private void initRoles() {
        for (Roles role : Roles.values()) {
            if (rolRepository.findByRole(role).isEmpty()) {
                Rol nuevo = new Rol();
                nuevo.setRole(role);
                rolRepository.save(nuevo);
                System.out.println("✅ Rol creado: " + role.name());
            }
        }
    }

    private void initDefaultUbicacion() {
        String DEFAULT_UBICACION_NOMBRE="Santa Marta";
        if (ubicacionRepository.findByNombre(DEFAULT_UBICACION_NOMBRE).isEmpty()) {
            Ubicacion ubicacionDefault = Ubicacion.builder()
                    .nombre(DEFAULT_UBICACION_NOMBRE)
                    .latitud(11.2407)
                    .longitud(-74.1990)
                    .estado(EstadoUbicacion.ACTIVA)
                    .build();

            ubicacionRepository.save(ubicacionDefault);
            System.out.println("✅ Ubicación por defecto creada: {}"+ DEFAULT_UBICACION_NOMBRE);
        }
    }
}
