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

    @PostMapping("/crear")
    public ResponseEntity<JsonResponse<RequisitoDto>> crearRequisito(@RequestBody RequisitoDto dto) {
        RequisitoDto creado = requisitoService.createRequisito(dto);
        if (creado==null) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "requisito no se pudo crear", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "Requisito creado exitosamente",
                        creado,
                        201
                )
        );
    }

    @GetMapping("/ObtenerPorId/{id}")
    public ResponseEntity<JsonResponse<RequisitoDto>> obtenerRequisitoPorId(@PathVariable Long id) {
        RequisitoDto dto = requisitoService.findRequisitoById(id);
        if (dto==null) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "requisito no se pudo obtener", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "Requisito obtenido exitosamente",
                        dto,
                        200
                )
        );
    }

    @GetMapping("/obtenerTodos")
    public ResponseEntity<JsonResponse<List<RequisitoDto>>> obtenerTodosLosRequisitos() {
        List<RequisitoDto> lista = requisitoService.findAllRequisitos();
        if (lista.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "requisito no se pudieron obtener", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "lista de requisitos obtenida exitosamente",
                        lista,
                        200
                )
        );
    }

    @DeleteMapping("/eliminarPorId/{id}")
    public ResponseEntity<JsonResponse<Void>> eliminarRequisito(@PathVariable Long id) {
        try{
            requisitoService.deleteRequisitoById(id);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "requisito eliminado exitosamente", null, 200)
            );
        }catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "requisito no se pudo eliminar", null, 404)
            );
        }
    }

    @PutMapping("/actualizar")
    public ResponseEntity<JsonResponse<Void>> actualizarRequisito(@RequestBody RequisitoDto dto) {
        try{
            requisitoService.updateRequisito(dto);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "requisito actualizado exitosamente", null, 200)
            );
        }catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "requisito no se pudo actualizar", null, 404)
            );
        }
    }
}
