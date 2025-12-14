package com.afk.control.controller;

import com.afk.control.dto.UsuarioDto;
import com.afk.control.service.UsuarioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.afk.control.dto.JsonResponse;
import java.util.List;

@RestController
@RequestMapping("/api/usuarios")
@RequiredArgsConstructor
public class UsuarioController {

    private final UsuarioService usuarioService;

    @PostMapping
    public ResponseEntity<JsonResponse<UsuarioDto>> crearUsuario(
            @RequestBody UsuarioDto usuarioDto) {
        UsuarioDto creado = usuarioService.createUsuario(usuarioDto);
        return ResponseEntity.status(201).body(
                new JsonResponse<>(
                        true,
                        "Usuario creado correctamente",
                        creado,
                        201
                )
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<JsonResponse<UsuarioDto>> obtenerUsuarioPorId(@PathVariable Long id) {
        UsuarioDto usuario = usuarioService.findUsuarioById(id);
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "usuario obtenido",
                        usuario,
                        200

                )
        );
    }

    @GetMapping
    public ResponseEntity<JsonResponse<List<UsuarioDto>>> listarUsuarios() {
        List<UsuarioDto> usuarios = usuarioService.findAllUsuarios();
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "usuarios listados correctamente",
                        usuarios,
                        200
                )
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<JsonResponse<UsuarioDto>> actualizarUsuario(@PathVariable Long id, @RequestBody UsuarioDto usuarioDto) {
        UsuarioDto actualizado = usuarioService.updateUsuario(id, usuarioDto);
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "usuario actualizado exitosamente",
                        actualizado,
                        200
                )
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<JsonResponse<Void>> eliminarUsuario(@PathVariable Long id) {
        usuarioService.deleteUsuarioById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/correo")
    public ResponseEntity<JsonResponse<UsuarioDto>> obtenerUsuarioPorCorreo(@RequestParam String correo) {
        UsuarioDto usuario = usuarioService.findByCorreo(correo);
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                                "usuario obtenido por correo exitosamente",
                        usuario,
                        200
                )
        );
    }
}
