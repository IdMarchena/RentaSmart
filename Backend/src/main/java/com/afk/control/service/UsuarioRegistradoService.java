package com.afk.control.service;

import com.afk.control.dto.UsuarioRegistradoDto;

import java.util.List;

public interface UsuarioRegistradoService {
    UsuarioRegistradoDto createUsuarioRegistrado(UsuarioRegistradoDto usuario);
    UsuarioRegistradoDto findUsuarioRegistradoById(Long id);
    List<UsuarioRegistradoDto> findAllUsuariosRegistrados();
    void deleteUsuarioRegistradoById(Long id);
    List<UsuarioRegistradoDto> buscarTodosLosUsuarioRegistradosPorUbicacion(String name);
}
