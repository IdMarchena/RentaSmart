package com.afk.control.controller;

import com.afk.control.dto.MultimediaDto;
import com.afk.control.service.MultimediaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.afk.control.dto.JsonResponse;
import java.util.List;

@RestController
@RequestMapping("/api/v1/multimedias")
@RequiredArgsConstructor
public class MultimediaController {

    private final MultimediaService multimediaService;

    // ========================= CREAR =========================
    @PostMapping
    public ResponseEntity<JsonResponse<MultimediaDto>> createMultimedia(@RequestBody MultimediaDto multimediaDto) {
        MultimediaDto created = multimediaService.createMultimedia(multimediaDto);

        if (created == null) {
            return ResponseEntity.status(404)
                    .body(new JsonResponse<>(false, "No se pudo crear la multimedia", null, 404));
        }

        return ResponseEntity.status(201)
                .body(new JsonResponse<>(true, "Multimedia creada exitosamente", created, 201));
    }

    // ========================= OBTENER =========================
    @GetMapping("/{id}")
    public ResponseEntity<JsonResponse<MultimediaDto>> getMultimediaById(@PathVariable Long id) {
        MultimediaDto multimedia = multimediaService.findMultimediaById(id);

        if (multimedia == null) {
            return ResponseEntity.status(404)
                    .body(new JsonResponse<>(false, "Multimedia no encontrada", null, 404));
        }

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Multimedia obtenida exitosamente", multimedia, 200));
    }

    @GetMapping
    public ResponseEntity<JsonResponse<List<MultimediaDto>>> getAllMultimedias() {
        List<MultimediaDto> list = multimediaService.findAllMultimedias();

        if (list.isEmpty()) {
            return ResponseEntity.status(404)
                    .body(new JsonResponse<>(false, "No se encontraron multimedias", null, 404));
        }

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Multimedias obtenidas exitosamente", list, 200));
    }

    @GetMapping("/publicacion/{publicacionId}")
    public ResponseEntity<JsonResponse<List<MultimediaDto>>> getMultimediasByPublicacion(@PathVariable Long publicacionId) {
        List<MultimediaDto> list = multimediaService.findMultimediasByPublicacion(publicacionId);

        if (list.isEmpty()) {
            return ResponseEntity.status(200)
                    .body(new JsonResponse<>(false, "No se encontraron multimedias para la publicación", null, 200));
        }

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Multimedias obtenidas por publicación exitosamente", list, 200));
    }

    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<JsonResponse<List<MultimediaDto>>> getMultimediasByTipo(@PathVariable String tipo) {
        List<MultimediaDto> list = multimediaService.findMultimediasByTipo(tipo);

        if (list.isEmpty()) {
            return ResponseEntity.status(404)
                    .body(new JsonResponse<>(false, "No se encontraron multimedias por tipo", null, 404));
        }

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Multimedias obtenidas por tipo exitosamente", list, 200));
    }

    // ========================= ACTUALIZAR =========================
    @PutMapping("/{id}")
    public ResponseEntity<JsonResponse<MultimediaDto>> updateMultimedia(@PathVariable Long id, @RequestBody MultimediaDto dto) {
        MultimediaDto updated = multimediaService.updateMultimedia(id, dto);

        if (updated == null) {
            return ResponseEntity.status(404)
                    .body(new JsonResponse<>(false, "No se pudo actualizar la multimedia", null, 404));
        }

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Multimedia actualizada exitosamente", updated, 200));
    }

    // ========================= ELIMINAR =========================
    @DeleteMapping("/{id}")
    public ResponseEntity<JsonResponse<Void>> deleteMultimediaById(@PathVariable Long id) {
        try {
            multimediaService.deleteMultimediaById(id);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Multimedia eliminada exitosamente", null, 200));
        } catch (Exception e) {
            return ResponseEntity.status(404)
                    .body(new JsonResponse<>(false, "No se pudo eliminar la multimedia", null, 404));
        }
    }
}