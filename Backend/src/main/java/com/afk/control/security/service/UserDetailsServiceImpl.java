package com.afk.control.security.service;
import com.afk.model.entity.UsuarioRegistrado;
import com.afk.model.repository.UsuarioRegistradoRepository;
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
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String correo) throws UsernameNotFoundException {
        UsuarioRegistrado user = usuarioRepository.findByCorreo(correo)
                .orElseThrow(() ->
                        new UsernameNotFoundException(
                                "Usuario no encontrado con correo: " + correo
                        )
                );
        if (user.getRol() == null) {
            throw new UsernameNotFoundException(
                    "El usuario no tiene un rol asignado"
            );
        }
        return UserDetailsImpl.build(
                user,
                List.of(user.getRol())
        );
    }
}



