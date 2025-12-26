package com.afk.control.security.service;

import com.afk.model.entity.Rol;
import com.afk.model.entity.UsuarioRegistrado;
import com.afk.model.entity.UsuarioRol;
import com.afk.model.entity.enums.EstadoUsuarioRol;
import com.afk.model.repository.UsuarioRegistradoRepository;
import com.afk.model.repository.UsuarioRolRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;


import java.util.List;


@Service
@RequiredArgsConstructor
public class UserDetailsServiceImpl implements UserDetailsService {

    private final UsuarioRegistradoRepository usuarioRepository;
    private final UsuarioRolRepository usuarioRolRepository;


    @Override
    @Transactional
    public UserDetails loadUserByUsername(String correo) throws UsernameNotFoundException {
        UsuarioRegistrado user = usuarioRepository.findByCorreo(correo)
                .orElseThrow(() -> new UsernameNotFoundException("Usuario no encontrado con correo: " + correo));

        List<UsuarioRol> rolesActivos = usuarioRolRepository.findByUsuarioRegistradoAndEstadoUsuarioRol(
                user,
                EstadoUsuarioRol.ACTIVO
        ).stream().toList();

        List<Rol> roles = rolesActivos.stream()
                .map(UsuarioRol::getRol)
                .toList();

        return UserDetailsImpl.build(user, roles);
    }
}



