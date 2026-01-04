package com.afk.control.controller;

import com.afk.control.dto.CitaDto;
import com.afk.control.service.CitaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import com.afk.control.dto.JsonResponse;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/citas")
public class CitaController {

    private final CitaService service;


    @PostMapping("/crear")
    public ResponseEntity<JsonResponse<CitaDto>> createCita(CitaDto cita){
        try{
            CitaDto citaDto = service.createCita(cita);
            return ResponseEntity.ok(
                    new JsonResponse<>(true,"cita creada exitosamente",citaDto,200)
            );

        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false,"error al crear la cita",null,404)
            );
        }
    }


    @GetMapping("/obtenerPorId/{id}")
    public ResponseEntity<JsonResponse<CitaDto>> findCitaById(@PathVariable Long id) {
        try {
            CitaDto citaDto = service.findCitaById(id);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Cita encontrada", citaDto, 200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "Cita no encontrada", null, 404)
            );
        }
    }

    @GetMapping("/todas")
    public ResponseEntity<JsonResponse<List<CitaDto>>> findAllCitas() {
        try {
            List<CitaDto> citas = service.findAllCitas();
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Citas encontradas", citas, 200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron citas", null, 404)
            );
        }
    }

    @PutMapping("/actualizarPorId/{id}")
    public ResponseEntity<JsonResponse<CitaDto>> updateCita(@PathVariable Long id, @RequestBody CitaDto cita) {
        try {
            CitaDto citaDto = service.updateCita(id, cita);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Cita actualizada exitosamente", citaDto, 200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "Error al actualizar la cita", null, 404)
            );
        }
    }

    @DeleteMapping("/eliminarPorId/{id}")
    public ResponseEntity<JsonResponse<Void>> deleteCitaById(@PathVariable Long id) {
        try {
            service.deleteCitaById(id);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Cita eliminada exitosamente", null, 200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "Error al eliminar la cita", null, 404)
            );
        }
    }

    @GetMapping("/listarCitasIdUsuario/{idUsuario}")
    public ResponseEntity<JsonResponse<List<CitaDto>>> findCitasByUsuario(@PathVariable Long idUsuario) {
        try {
            List<CitaDto> citas = service.findCitasByUsuario(idUsuario);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Citas de usuario encontradas", citas, 200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron citas para el usuario", null, 404)
            );
        }
    }


    @GetMapping("/listarPorIdServicio/{idServicio}")
    public ResponseEntity<JsonResponse<List<CitaDto>>> listarCitasPorIDServicio(@PathVariable Long idServicio) {
        try {
            List<CitaDto> citas = service.listarCitasPorIDServicio(idServicio);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Citas de servicio encontradas", citas, 200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron citas para el servicio", null, 404)
            );
        }
    }

    @GetMapping("/listarPorIdPublicacion/{idPublicacion}")
    public ResponseEntity<JsonResponse<List<CitaDto>>> listarCitasPorIDPublicacion(@PathVariable Long idPublicacion) {
        try {
            List<CitaDto> citas = service.listarCitasPorIDPublicacion(idPublicacion);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Citas de publicación encontradas", citas, 200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron citas para la publicación", null, 404)
            );
        }
    }

    @GetMapping("/listarPorEstado/{estado}")
    public ResponseEntity<JsonResponse<List<CitaDto>>> listarCitasPorEstado(@PathVariable String estado) {
        try {
            List<CitaDto> citas = service.listarCitasPorEstado(estado);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Citas por estado encontradas", citas, 200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron citas con ese estado", null, 404)
            );
        }
    }

    @GetMapping("/listarPorFecha/{fecha}")
    public ResponseEntity<JsonResponse<List<CitaDto>>> listarCitasPorFecha(@PathVariable String fecha) {
        try {
            LocalDateTime fechaParsed = LocalDateTime.parse(fecha);  // Parseamos la fecha
            List<CitaDto> citas = service.listarCitasPorFecha(fechaParsed);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Citas por fecha encontradas", citas, 200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron citas para la fecha", null, 404)
            );
        }
    }
}
