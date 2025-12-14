package com.afk.control.service.impl;
import com.afk.control.dto.UsuarioDto;
import com.afk.control.mapper.UsuarioMapper;
import com.afk.control.service.UsuarioService;
import com.afk.model.entity.Usuario;
import com.afk.model.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
@Service
@RequiredArgsConstructor
public class UsuarioServiceImpl implements UsuarioService {

    private final UsuarioRepository usuarioRepository;
    private final UsuarioMapper usuarioMapper;

    @Override
    public UsuarioDto createUsuario(UsuarioDto usuarioDto) {
        if (usuarioRepository.findByCorreo(usuarioDto.correo()).isPresent()) {
            throw new RuntimeException("El correo ya está registrado");
        }
        Usuario usuario = new Usuario();
        usuario.setId(usuarioDto.id());
        usuario.setNombre(usuarioDto.nombre());
        usuario.setCorreo(usuarioDto.correo());
        usuario.setClave(usuarioDto.contrasenia());
        Usuario savedUsuario = usuarioRepository.save(usuario);
        return mapToDto(savedUsuario);
    }

    @Override
    @Transactional(readOnly = true)
    public UsuarioDto findUsuarioById(Long id) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return mapToDto(usuario);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UsuarioDto> findAllUsuarios() {
        return usuarioRepository.findAll().stream()
                .map(usuarioMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public UsuarioDto updateUsuario(Long id, UsuarioDto usuarioDto) {
        Usuario usuario = usuarioRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        if (!usuario.getCorreo().equals(usuarioDto.correo())) {
            Optional<Usuario> usuarioConCorreo = usuarioRepository.findByCorreo(usuarioDto.correo());
            if (usuarioConCorreo.isPresent() && !usuarioConCorreo.get().getId().equals(id)) {
                throw new RuntimeException("El correo ya está en uso por otro usuario");
            }
        }
        usuario.setNombre(usuarioDto.nombre());
        usuario.setCorreo(usuarioDto.correo());
        if (usuarioDto.contrasenia() != null && !usuarioDto.contrasenia().isEmpty()) {
            usuario.setClave(usuarioDto.contrasenia());
        }
        Usuario updatedUsuario = usuarioRepository.save(usuario);
        return mapToDto(updatedUsuario);
    }
    @Override
    @Transactional(readOnly = true)
    public void deleteUsuarioById(Long id) {
        if (!usuarioRepository.existsById(id)) {
            throw new RuntimeException("Usuario no encontrado");
        }
        usuarioRepository.deleteById(id);
    }
    @Override
    @Transactional(readOnly = true)
    public UsuarioDto findByCorreo(String correo) {
        Usuario usuario = usuarioRepository.findByCorreo(correo)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return mapToDto(usuario);
    }
    private UsuarioDto mapToDto(Usuario usuario) {
        return new UsuarioDto(
                usuario.getId(),
                usuario.getNombre(),
                usuario.getCorreo(),
                null
        );
    }
}