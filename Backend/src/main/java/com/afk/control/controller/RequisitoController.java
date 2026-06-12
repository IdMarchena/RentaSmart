package com.afk.control.controller;

import com.afk.control.dto.RequisitoDto;
import com.afk.control.service.RequisitoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.afk.control.dto.JsonResponse;

import java.util.List;

@RestController
@RequestMapping("/api/requisito")
@RequiredArgsConstructor
public class RequisitoController {

    private final RequisitoService requisitoService;

    // ===================== CREAR =====================
    @PostMapping
    public ResponseEntity<JsonResponse<RequisitoDto>> crearRequisito(@RequestBody RequisitoDto dto) {
        RequisitoDto creado = requisitoService.createRequisito(dto);
        if (creado == null) {
            return ResponseEntity.status(400).body(
                    new JsonResponse<>(false, "El requisito no se pudo crear", null, 400)
            );
        }
        return ResponseEntity.status(201).body(
                new JsonResponse<>(true, "Requisito creado exitosamente", creado, 201)
        );
    }

    // ===================== OBTENER POR ID =====================
    @GetMapping("/{id}")
    public ResponseEntity<JsonResponse<RequisitoDto>> obtenerRequisitoPorId(@PathVariable Long id) {
        RequisitoDto dto = requisitoService.findRequisitoById(id);
        if (dto == null) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontró el requisito", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Requisito obtenido exitosamente", dto, 200)
        );
    }

    // ===================== OBTENER TODOS =====================
    @GetMapping
    public ResponseEntity<JsonResponse<List<RequisitoDto>>> obtenerTodosLosRequisitos() {
        List<RequisitoDto> lista = requisitoService.findAllRequisitos();
        if (lista.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron requisitos", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Lista de requisitos obtenida exitosamente", lista, 200)
        );
    }

    // ===================== ACTUALIZAR =====================
    @PutMapping("/{id}")
    public ResponseEntity<JsonResponse<RequisitoDto>> actualizarRequisito(
            @PathVariable Long id,
            @RequestBody RequisitoDto dto) {
        try {
            RequisitoDto actualizado = requisitoService.updateRequisito(dto, id);
            if (actualizado == null) {
                return ResponseEntity.status(404).body(
                        new JsonResponse<>(false, "No se pudo actualizar el requisito", null, 404)
                );
            }
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Requisito actualizado exitosamente", actualizado, 200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    new JsonResponse<>(false, "Error al actualizar el requisito", null, 500)
            );
        }
    }

    // ===================== ELIMINAR =====================
    @DeleteMapping("/{id}")
    public ResponseEntity<JsonResponse<Void>> eliminarRequisito(@PathVariable Long id) {
        try {
            boolean eliminado = requisitoService.deleteRequisitoById(id);
            if (!eliminado) {
                return ResponseEntity.status(404).body(
                        new JsonResponse<>(false, "No se pudo eliminar el requisito", null, 404)
                );
            }
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Requisito eliminado exitosamente", null, 200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    new JsonResponse<>(false, "Error al eliminar el requisito", null, 500)
            );
        }
    }

}
