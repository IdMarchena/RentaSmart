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
        if (savedInmueble==null) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "inmueble no se pudo crear", null, 404)
            );
        }
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
        if (inmuebleDto==null) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "inmueble no se pudo obtener", null, 404)
            );
        }
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
        if (inmuebleDtos.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "inmueblse no se pudieron obtener", null, 404)
            );
        }
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
    public ResponseEntity<JsonResponse<Void>> deleteInmuebleById(@PathVariable Long id) {
        try{
            inmuebleService.deleteInmuebleById(id);
                return ResponseEntity.ok(
                        new JsonResponse<>(true, "inmueblse eliminado exitosamente", null, 200)
                );
        }catch (Exception e) {
                return ResponseEntity.status(404).body(
                        new JsonResponse<>(false, "inmueblse no se pudo eliminar", null, 404)
                );
        }
    }

    @GetMapping("/listarInmueblesPorUbicacionId/{ubicacionId}")
    public ResponseEntity<JsonResponse<List<InmuebleDto>>> getInmueblesByUbicacion(@PathVariable Long ubicacionId) {
        List<InmuebleDto> inmuebleDtos = inmuebleService.findInmueblesByUbicacion(ubicacionId);
        if (inmuebleDtos.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "inmueblse no se pudieron obtener por ubicacion", null, 404)
            );
        }
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
        if (inmuebleDtos.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "inmueblse no se pudieron obtener por estado", null, 404)
            );
        }
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
        if (inmuebleDtos.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "inmueblse no se pudieron obtener por ubicacion y por estado", null, 404)
            );
        }
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
        if (inmuebleDtos.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "inmueblse no se pudieron obtener por nombre y estrato", null, 404)
            );
        }
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
    public ResponseEntity<JsonResponse<InmuebleDto>> updateInmueble(@PathVariable Long id, @RequestBody InmuebleDto inmuebleDto) {
        InmuebleDto updatedInmueble = inmuebleService.updateInmueble(id, inmuebleDto);
        if(updatedInmueble == null) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "imueble no se pudo actualizar",null,404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(true, "imueble  se pudo actualizar",updatedInmueble,200)
        );
    }

    @GetMapping("/listarInmueblesPorNombre")
    public ResponseEntity<JsonResponse<List<InmuebleDto>>> getInmueblesByNombre(@RequestParam String nombre) {
        List<InmuebleDto> inmuebleDtos = inmuebleService.findInmueblesByNombre(nombre);
        if(inmuebleDtos.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false,"no se pudo obtener inmuebles por nombre",null,404)
            );
        }
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
        if(inmuebleDtos.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false,"no se pudo obtener inmuebles por estrato",null,404)
            );
        }
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
        if(inmuebleDtos.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false,"no se pudo obtener inmuebles por id arrendatario",null,404)
            );
        }
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
    public ResponseEntity<JsonResponse<Void>> cambiarEstadoInmueble(@PathVariable Long id, @RequestParam String estado) {
        try {
            inmuebleService.cambiarEstadoInmueble(id, estado);
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "error al cambiar el estado del inmueble por id",null,404)
            );
        } catch (Exception e) {
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "se pudo cambiar exitosamente el estado del inmueble",null,20)
            );
        }
    }

}
