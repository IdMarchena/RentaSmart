package com.afk.control.service.impl;

import com.afk.control.dto.UsuarioRegistradoDto;
import com.afk.control.mapper.UsuarioRegistradoMapper;
import com.afk.control.service.UsuarioRegistradoService;
import com.afk.model.entity.*;
import com.afk.model.entity.enums.EstadoUsuarioRol;
import com.afk.model.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UsuarioRegistradoServiceImpl implements UsuarioRegistradoService {

    private final UsuarioRegistradoRepository usuarioRegistradoRepository;
    private final RolRepository rolRepository;
    private final UbicacionRepository ubicacionRepository;

    @Qualifier("usuarioRegistradoMapperImpl")
    private final UsuarioRegistradoMapper mapper;


    @Override
    @Transactional(readOnly = true)
    public List<UsuarioRegistradoDto> buscarTodosLosUsuarioRegistradosPorUbicacion(String name){
        List<UsuarioRegistrado> usuariosRegistrados = usuarioRegistradoRepository.findAll();
        return usuariosRegistrados.stream()
                .filter(u ->
                        u.getUbicacion() != null &&
                        u.getUbicacion().getNombre() != null &&
                        u.getUbicacion().getNombre().
                                equalsIgnoreCase(name)
                )
                .map(mapper::toDto)
                .toList();
    }

    @Override
    public UsuarioRegistradoDto createUsuarioRegistrado(UsuarioRegistradoDto usuarioDto) {
        if (usuarioDto.rol() != null) {
            Rol rol = rolRepository.findById(usuarioDto.rol())
                    .orElseThrow(() -> new RuntimeException("Rol no encontrado"));
        }
        Ubicacion ubicacion = ubicacionRepository.findById(usuarioDto.ubicacion())
                .orElseThrow(() -> new RuntimeException("Ubicación no encontrada"));
        UsuarioRegistrado usuario = mapper.toEntity(usuarioDto);
        usuario.setRol(rolRepository.getReferenceById(usuarioDto.rol()));
        usuario.setUbicacion(ubicacion);
        usuario.setFechaRegistro(LocalDateTime.now());
        usuario.setTelefono(usuarioDto.telefono());
        UsuarioRegistrado savedUsuario = usuarioRegistradoRepository.save(usuario);
        return mapper.toDto(savedUsuario);
    }

    @Override
    @Transactional(readOnly = true)
    public UsuarioRegistradoDto findUsuarioRegistradoById(Long id) {
        UsuarioRegistrado usuario = usuarioRegistradoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        return mapper.toDto(usuario);
    }

    @Override
    @Transactional(readOnly = true)
    public List<UsuarioRegistradoDto> findAllUsuariosRegistrados() {
        List<UsuarioRegistrado> usuarios = usuarioRegistradoRepository.findAll();
        return mapper.toDtoList(usuarios);
    }

    @Override
    public void deleteUsuarioRegistradoById(Long id) {
        if (!usuarioRegistradoRepository.existsById(id)) {
            throw new RuntimeException("Usuario no encontrado");
        }
        usuarioRegistradoRepository.deleteById(id);
    }
}