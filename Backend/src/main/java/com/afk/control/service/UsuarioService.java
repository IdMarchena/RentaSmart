package com.afk.control.service;

import com.afk.control.dto.UsuarioDto;

import java.util.List;

public interface UsuarioService {
    UsuarioDto createUsuario(UsuarioDto usuario);
    UsuarioDto findUsuarioById(Long id);
    List<UsuarioDto> findAllUsuarios();
    UsuarioDto updateUsuario(Long id, UsuarioDto usuario);
    void deleteUsuarioById(Long id);
    UsuarioDto findByCorreo(String correo);
}
