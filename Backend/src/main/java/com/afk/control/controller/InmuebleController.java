package com.afk.control.controller;

import com.afk.control.dto.InmuebleDto;
import com.afk.control.service.InmuebleService;
import com.afk.model.entity.enums.EstadoInmueble;
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

    @PostMapping("/crear")
    public ResponseEntity<JsonResponse<InmuebleDto>> createInmueble(@RequestBody InmuebleDto inmuebleDto) {
        InmuebleDto savedInmueble = inmuebleService.createInmueble(inmuebleDto);
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "inmueble creado exitosamente",
                        savedInmueble,
                        201
                )
        );
    }

    @GetMapping("/obtenerPorId/{id}")
    public ResponseEntity<JsonResponse<InmuebleDto>> getInmuebleById(@PathVariable Long id) {
        InmuebleDto inmuebleDto = inmuebleService.findInmuebleById(id);
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "inmueble obtenido exitosamente",
                        inmuebleDto,
                        200
                )
        );
    }

    @GetMapping("/listar")
    public ResponseEntity<JsonResponse<List<InmuebleDto>>> getAllInmuebles() {
        List<InmuebleDto> inmuebleDtos = inmuebleService.findAllInmuebles();
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "inmuebles obtenidos eitosamente",
                        inmuebleDtos,
                        200
                )
        );
    }

    @DeleteMapping("/eliminarPorId/{id}")
    public ResponseEntity<Void> deleteInmuebleById(@PathVariable Long id) {
        inmuebleService.deleteInmuebleById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/listarInmueblesPorUbicacionId/{ubicacionId}")
    public ResponseEntity<JsonResponse<List<InmuebleDto>>> getInmueblesByUbicacion(@PathVariable Long ubicacionId) {
        List<InmuebleDto> inmuebleDtos = inmuebleService.findInmueblesByUbicacion(ubicacionId);
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "inmuebles obtenidos eitosamente",
                        inmuebleDtos,
                        200
                )
        );
    }

    @GetMapping("/listarImueblesPorEstado")
    public ResponseEntity<JsonResponse<List<InmuebleDto>>> getInmueblesByEstado(@RequestParam String estado) {
        List<InmuebleDto> inmuebleDtos = inmuebleService.findInmueblesByEstado(estado);
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "inmuebles obtenidos eitosamente",
                        inmuebleDtos,
                        200
                )
        );
    }

    @GetMapping("/listarInmueblesPorUbicacionIdYEstado/{ubicacionId}")
    public ResponseEntity<JsonResponse<List<InmuebleDto>>> getInmueblesByUbicacionAndEstado(@PathVariable Long ubicacionId, @RequestParam String estado) {
        List<InmuebleDto> inmuebleDtos = inmuebleService.findInmueblesByUbicacionAndEstado(ubicacionId, estado);
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "inmuebles obtenidos eitosamente",
                        inmuebleDtos,
                        200
                )
        );
    }

    @GetMapping("/listarInmueblesPorNombreYEstrado")
    public ResponseEntity<JsonResponse<List<InmuebleDto>>> getInmueblesByNombreAndEstrato(@RequestParam String nombre, @RequestParam Integer estrato) {
        List<InmuebleDto> inmuebleDtos = inmuebleService.findInmueblesByNombreAndEstrato(nombre, estrato);
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "inmuebles obtenidos eitosamente",
                        inmuebleDtos,
                        200
                )
        );
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<InmuebleDto> updateInmueble(@PathVariable Long id, @RequestBody InmuebleDto inmuebleDto) {
        InmuebleDto updatedInmueble = inmuebleService.updateInmueble(id, inmuebleDto);
        return ResponseEntity.ok(updatedInmueble);
    }

    @GetMapping("/listarInmueblesPorNombre")
    public ResponseEntity<JsonResponse<List<InmuebleDto>>> getInmueblesByNombre(@RequestParam String nombre) {
        List<InmuebleDto> inmuebleDtos = inmuebleService.findInmueblesByNombre(nombre);
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "inmuebles listados por estrato exitosamente",
                        inmuebleDtos,
                        200
                )
        );
    }

    @GetMapping("/listarInmueblesPorEstrado")
    public ResponseEntity<JsonResponse<List<InmuebleDto>>> getInmueblesByEstrato(@RequestParam Integer estrato) {
        List<InmuebleDto> inmuebleDtos = inmuebleService.findInmueblesByEstrato(estrato);
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "inmuebles listados por estrato exitosamente",
                        inmuebleDtos,
                        200
                )
        );
    }
    @GetMapping("/listarInmueblesPorIdArrendatario/{id}")
    public ResponseEntity<JsonResponse<List<InmuebleDto>>> finInmueblesByIdArrendatario(@PathVariable Long idArrendario) {
        List<InmuebleDto> inmuebleDtos = inmuebleService.finInmueblesByIdArrendatario(idArrendario);
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "inmuebles listados por estrato exitosamente",
                        inmuebleDtos,
                        200
                )
        );
    }

    @PutMapping("/cambiarEstadoInmueblePorId/{id}")
    public ResponseEntity<Void> cambiarEstadoInmueble(@PathVariable Long id, @RequestParam String estado) {
        inmuebleService.cambiarEstadoInmueble(id, estado);
        return ResponseEntity.noContent().build();
    }

}
