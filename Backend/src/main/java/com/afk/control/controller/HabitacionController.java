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
    public ResponseEntity<Void> eliminarHabitacion(@PathVariable Long id) {
        habitacionService.deleteHabitacion(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/actualizar")
    public ResponseEntity<Void> actualizarHabitacion(@RequestBody HabitacionDto habitacionDto) {
        habitacionService.updateHabitacion(habitacionDto);
        return ResponseEntity.noContent().build();
    }

}
