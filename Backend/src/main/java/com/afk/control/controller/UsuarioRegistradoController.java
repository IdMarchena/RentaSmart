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
        if (creado == null) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "Usuario no encontrado", null, 404)
            );
        }
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
        if (dto == null) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "Usuario no encontrado", null, 404)
            );
        }
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
        if (lista.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "Usuarios no encontrado", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "usuarios registrados encontrados exitosamente",
                        lista,
                        200
                )
        );
    }
    @GetMapping("/buscar")
    public ResponseEntity<JsonResponse<List<UsuarioRegistradoDto>>> buscarUsuarioRegistradosPorUbicacion(@RequestParam  String ubicacion) {
        List<UsuarioRegistradoDto> lista = usuarioRegistradoService.buscarTodosLosUsuarioRegistradosPorUbicacion(ubicacion);
        if (lista.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "Usuarios no encontrado", null, 404)
            );
        }else{
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Usuarios encontrados", lista, 200)
            );
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<JsonResponse<Void>> eliminarUsuarioRegistrado(@PathVariable Long id) {
        try {
            usuarioRegistradoService.deleteUsuarioRegistradoById(id);
            return ResponseEntity.ok(
                    new JsonResponse<>(
                            true,
                            "usuarios registrados encontrados exitosamente",
                            null,
                            200
                    )
            );

        } catch (Exception e) {
            return ResponseEntity.ok(
                    new JsonResponse<>(
                            false,
                            "usuarios registrados no encontrado",
                            null,
                            404
                    )
            );

        }
    }
}
