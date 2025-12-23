package com.afk.control.controller;

import com.afk.control.dto.JsonResponse;
import com.afk.control.dto.UsuarioRegistradoDto;
import com.afk.control.service.UsuarioRegistradoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/usuarios-registrados")
@RequiredArgsConstructor
public class UsuarioRegistradoController {

    private final UsuarioRegistradoService usuarioRegistradoService;

    @PostMapping
    public ResponseEntity<JsonResponse<UsuarioRegistradoDto>> crearUsuarioRegistrado(@RequestBody UsuarioRegistradoDto dto) {
        UsuarioRegistradoDto creado = usuarioRegistradoService.createUsuarioRegistrado(dto);
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "usuario registrado exitosamente",
                        creado,
                        200
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<JsonResponse<UsuarioRegistradoDto>> obtenerUsuarioRegistradoPorId(@PathVariable Long id) {
        UsuarioRegistradoDto dto = usuarioRegistradoService.findUsuarioRegistradoById(id);
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "usuario obtenido por id exitosamente",
                        dto,
                        200
                )
        );
    }

    @GetMapping
    public ResponseEntity<JsonResponse<List<UsuarioRegistradoDto>>> listarUsuariosRegistrados() {
        List<UsuarioRegistradoDto> lista = usuarioRegistradoService.findAllUsuariosRegistrados();
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "usuarios registrados encontrados exitosamente",
                        lista,
                        200
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<JsonResponse<Void>> eliminarUsuarioRegistrado(@PathVariable Long id) {
        usuarioRegistradoService.deleteUsuarioRegistradoById(id);
        return ResponseEntity.noContent().build();
    }
}
