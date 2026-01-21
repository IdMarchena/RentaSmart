package com.afk.control.controller;

import com.afk.control.dto.InmuebleDto;
import com.afk.control.service.InmuebleService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.afk.control.dto.JsonResponse;
import java.util.List;

@RestController
@RequestMapping("/api/v1/inmuebles")
@RequiredArgsConstructor
public class InmuebleController {

    private final InmuebleService inmuebleService;

    // ========================= CRUD =========================

    @PostMapping
    public ResponseEntity<JsonResponse<InmuebleDto>> createInmueble(@RequestBody InmuebleDto dto) {
        InmuebleDto saved = inmuebleService.createInmueble(dto);

        if (saved == null) {
            return ResponseEntity.status(404)
                    .body(new JsonResponse<>(false, "No se pudo crear el inmueble", null, 404));
        }

        return ResponseEntity.status(201)
                .body(new JsonResponse<>(true, "Inmueble creado exitosamente", saved, 201));
    }

    @GetMapping("/{id}")
    public ResponseEntity<JsonResponse<InmuebleDto>> getById(@PathVariable Long id) {
        InmuebleDto inmueble = inmuebleService.findInmuebleById(id);

        if (inmueble == null) {
            return ResponseEntity.status(404)
                    .body(new JsonResponse<>(false, "Inmueble no encontrado", null, 404));
        }

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Inmueble encontrado", inmueble, 200));
    }

    @GetMapping
    public ResponseEntity<JsonResponse<List<InmuebleDto>>> getAll() {
        List<InmuebleDto> lista = inmuebleService.findAllInmuebles();

        if (lista.isEmpty()) {
            return ResponseEntity.status(404)
                    .body(new JsonResponse<>(false, "No hay inmuebles", null, 404));
        }

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Inmuebles listados", lista, 200));
    }

    @PutMapping("/{id}")
    public ResponseEntity<JsonResponse<InmuebleDto>> update(
            @PathVariable Long id,
            @RequestBody InmuebleDto dto) {

        InmuebleDto updated = inmuebleService.updateInmueble(id, dto);

        if (updated == null) {
            return ResponseEntity.status(404)
                    .body(new JsonResponse<>(false, "No se pudo actualizar el inmueble", null, 404));
        }

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Inmueble actualizado", updated, 200));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<JsonResponse<Void>> delete(@PathVariable Long id) {
        try {
            inmuebleService.deleteInmuebleById(id);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Inmueble eliminado", null, 200));
        } catch (Exception e) {
            return ResponseEntity.status(404)
                    .body(new JsonResponse<>(false, "No se pudo eliminar el inmueble", null, 404));
        }
    }

    // ========================= FILTROS =========================

    @GetMapping("/ubicacion/{id}")
    public ResponseEntity<JsonResponse<List<InmuebleDto>>> porUbicacion(@PathVariable Long id) {
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Inmuebles por ubicación",
                        inmuebleService.findInmueblesByUbicacion(id), 200));
    }

    @GetMapping("/estado")
    public ResponseEntity<JsonResponse<List<InmuebleDto>>> porEstado(@RequestParam String estado) {
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Inmuebles por estado",
                        inmuebleService.findInmueblesByEstado(estado), 200));
    }

    @GetMapping("/nombre")
    public ResponseEntity<JsonResponse<List<InmuebleDto>>> porNombre(@RequestParam String nombre) {
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Inmuebles por nombre",
                        inmuebleService.findInmueblesByNombre(nombre), 200));
    }

    @GetMapping("/estrato")
    public ResponseEntity<JsonResponse<List<InmuebleDto>>> porEstrato(@RequestParam Integer estrato) {
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Inmuebles por estrato",
                        inmuebleService.findInmueblesByEstrato(estrato), 200));
    }

    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<JsonResponse<List<InmuebleDto>>> porTipo(@PathVariable String tipo) {
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Inmuebles por tipo",
                        inmuebleService.findInmuebleByTipo(tipo), 200));
    }

    // ========================= ESTADO =========================

    @PutMapping("/{id}/estado")
    public ResponseEntity<JsonResponse<Void>> cambiarEstado(
            @PathVariable Long id,
            @RequestParam String estado) {

        try {
            inmuebleService.cambiarEstadoInmueble(id, estado);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Estado actualizado", null, 200));
        } catch (Exception e) {
            return ResponseEntity.status(404)
                    .body(new JsonResponse<>(false, "No se pudo cambiar el estado", null, 404));
        }
    }
}