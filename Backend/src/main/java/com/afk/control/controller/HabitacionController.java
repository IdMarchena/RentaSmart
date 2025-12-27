package com.afk.control.controller;

import com.afk.control.dto.HabitacionDto;
import com.afk.control.service.HabitacionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.afk.control.dto.JsonResponse;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/habitacion")
public class HabitacionController {
    private final HabitacionService habitacionService;

    @PostMapping("/crear")
    public ResponseEntity<JsonResponse<HabitacionDto>> crearHabitacion(@RequestBody HabitacionDto habitacionDto) {
        HabitacionDto creado = habitacionService.createHabitacion(habitacionDto);
        if (creado==null) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "error al crear la habitacion", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "habitacion creada exitosamente",
                        creado,
                        201
                )
        );
    }

    @GetMapping("/ObtenerPorId/{id}")
    public ResponseEntity<JsonResponse<HabitacionDto>> obtenerHabitacionPorId(@PathVariable Long id) {
        HabitacionDto habitacion = habitacionService.getHabitacionById(id);
        if (habitacion==null) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "error al buscar la habitacion", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "habitacion obtenida por id exitosamente",
                        habitacion,
                        200
                )
        );
    }

    @GetMapping("/obtenerTodas")
    public ResponseEntity<JsonResponse<List<HabitacionDto>>> obtenerTodas() {
        List<HabitacionDto> lista = habitacionService.getAllHabitacion();
        if (lista.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "error al listar las habitaciones", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "habitaciones encontradas",
                        lista,
                        200
                )
        );
    }

    @DeleteMapping("/eliminar/{id}")
    public ResponseEntity<JsonResponse<Void>> eliminarHabitacion(@PathVariable Long id) {
        try{
            habitacionService.deleteHabitacion(id);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "habitacion eliminado exitosamente", null, 200)
            );
        }catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "habitacion no se pudo eliminar", null, 404)
            );
        }
    }

    @PutMapping("/actualizar")
    public ResponseEntity<JsonResponse<Void>> actualizarHabitacion(@RequestBody HabitacionDto habitacionDto) {
        try{
            habitacionService.updateHabitacion(habitacionDto);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "habitacion actualizada exitosamente", null, 200)
            );
        }catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "habitacion no se pudo actualizar", null, 404)
            );
        }
    }

}
