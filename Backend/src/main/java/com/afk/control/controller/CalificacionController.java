package com.afk.control.controller;

import com.afk.control.service.CalificacionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.afk.control.dto.CalificacionDto;
import java.util.List;
import com.afk.control.dto.JsonResponse;

@RestController
@RequestMapping("/api/calificaciones")
@RequiredArgsConstructor
public class CalificacionController {

    private final CalificacionService calificacionService;

    @PostMapping("/crear")
    public ResponseEntity<JsonResponse<CalificacionDto>> crearCalificacion(@RequestBody CalificacionDto calificacionDto) {
        CalificacionDto creada = calificacionService.createCalificacion(calificacionDto);
        if(creada==null) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false,"calificacion no pudo ser creada",null,404)
            );
        }else{
            return ResponseEntity.ok(
                    new JsonResponse<>(true,"calificacion creada exitosamente",creada,200)
            );
        }
    }

    @GetMapping("/obtenerPorId/{id}")
    public ResponseEntity<JsonResponse<CalificacionDto>> obtenerPorId(@PathVariable Long id) {
        CalificacionDto calificacion = calificacionService.findCalificacionById(id);
        if(calificacion==null) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false,"calificacion no pudo ser obtenida por id",null,404)
            );
        }else{
            return ResponseEntity.ok(
                    new JsonResponse<>(true,"calificacion obtenida exitosamente",calificacion,200)
            );
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<JsonResponse<List<CalificacionDto>>> listarTodas() {
        List<CalificacionDto> calificaciones = calificacionService.findAllCalificaciones();
        if(calificaciones.isEmpty()){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false,"error al intentar encontrar las calificaciones",null,404)
            );
        }else{
            return ResponseEntity.ok(
                    new JsonResponse<>(true,"calificaciones obtenidas exitosamente",calificaciones,200)
            );
        }
    }

    @PutMapping("/actualizarPorId/{id}")
    public ResponseEntity<JsonResponse<CalificacionDto>> actualizarCalificacion(@PathVariable Long id, @RequestBody CalificacionDto dto) {
        CalificacionDto actualizada = calificacionService.updateCalificacion(id, dto);
        if(actualizada==null) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false,"calificacion no pudo ser actualizada por id",null,404)
            );
        }else{
            return ResponseEntity.ok(
                    new JsonResponse<>(true,"calificacion actualizada exitosamente",actualizada,200)
            );
        }
    }

    @DeleteMapping("/eliminarPorId/{id}")
    public ResponseEntity<JsonResponse<Void>> eliminarCalificacion(@PathVariable Long id) {
        try{
            calificacionService.deleteCalificacionById(id);
            return ResponseEntity.ok(
                    new JsonResponse<>(true,"calificacion eliminada exitosamente",null,200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(4044).body(
                    new JsonResponse<>(true,"calificacion eliminada exitosamente",null,404)
            );
        }
    }

    @GetMapping("/encontrarCalificacionesPorServicioId/{idServicio}")
    public ResponseEntity<JsonResponse<List<CalificacionDto>>> encontrarCalificacionesPorServicioId(@PathVariable Long idServicio) {
        List<CalificacionDto> calificaciones = calificacionService.encontrarCalificacionesPorServicioId(idServicio);
        if(calificaciones.isEmpty()){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false,"error al intentar encontrar las calificaciones",null,404)
            );
        }else{
            return ResponseEntity.ok(
                    new JsonResponse<>(true,"calificaciones obtenidas exitosamente",calificaciones,200)
            );
        }
    }
    @GetMapping("/encontrarCalificacionesPorPublicacionId/{idPublicacion}")
    public ResponseEntity<JsonResponse<List<CalificacionDto>>> encontrarCalificacionesPorPublicacionId(@PathVariable Long idPublicacion) {
        List<CalificacionDto> calificaciones = calificacionService.encontrarCalificacionesPorPublicacionId(idPublicacion);
        if(calificaciones.isEmpty()){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false,"error al intentar encontrar las calificaciones",null,404)
            );
        }else{
            return ResponseEntity.ok(
                    new JsonResponse<>(true,"calificaciones obtenidas exitosamente",calificaciones,200)
            );
        }
    }


}
