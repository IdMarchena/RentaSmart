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
    public ResponseEntity<Void> eliminarRequisito(@PathVariable Long id) {
        requisitoService.deleteRequisitoById(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/actualizar")
    public ResponseEntity<Void> actualizarRequisito(@RequestBody RequisitoDto dto) {
        requisitoService.updateRequisito(dto);
        return ResponseEntity.noContent().build();
    }
}
