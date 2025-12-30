package com.afk.control.controller;

import com.afk.control.dto.SolicitudDeServicioDto;
import com.afk.control.service.SolicitudServicioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.afk.control.dto.JsonResponse;

import java.time.LocalDateTime;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/solicitudesServicio")
public class SolicitudServicioController {

    private final SolicitudServicioService service;

    @PostMapping("/crear")
    public ResponseEntity<JsonResponse<SolicitudDeServicioDto>> crearSolicitudServicio(@RequestBody SolicitudDeServicioDto solicitudServicio){
        try{
            return ResponseEntity.ok(
                    new JsonResponse<>( true,"solicitud de servicio creada exitosamente",service.crearSolicitudServicio(solicitudServicio),200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>( false,"fallo al crear solicitud de servicio",null,404)
            );
        }
    }

    @GetMapping("/obtenerPorId/{id}")
    public ResponseEntity<JsonResponse<SolicitudDeServicioDto>> findById(@PathVariable Long id) {
        try {
            SolicitudDeServicioDto solicitudDeServicio = service.findById(id);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Solicitud de servicio encontrada", solicitudDeServicio, 200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "Solicitud de servicio no encontrada", null, 404)
            );
        }
    }

    @PutMapping("/actualizarPorId/{id}")
    public ResponseEntity<JsonResponse<Void>> actualizarSolicitudServicio(@PathVariable Long id, @RequestBody SolicitudDeServicioDto solicitudServicio) {
        try {
            service.actualizarSolicitudServicio(id, solicitudServicio);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Solicitud de servicio actualizada exitosamente", null, 200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "Fallo al actualizar solicitud de servicio", null, 404)
            );
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<JsonResponse<List<SolicitudDeServicioDto>>> findAll() {
        try {
            List<SolicitudDeServicioDto> solicitudes = service.findAll();
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Solicitudes de servicio obtenidas exitosamente", solicitudes, 200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron solicitudes de servicio", null, 404)
            );
        }
    }

    @GetMapping("/obtenerPorIdusuario/{idUsuario}")
    public ResponseEntity<JsonResponse<List<SolicitudDeServicioDto>>> findByUsuario(@PathVariable Long idUsuario) {
        try {
            List<SolicitudDeServicioDto> solicitudes = service.findByUsuario(idUsuario);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Solicitudes de servicio encontradas", solicitudes, 200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron solicitudes de servicio para el usuario", null, 404)
            );
        }
    }

    @GetMapping("/obtenerPorEstado/{estado}")
    public ResponseEntity<JsonResponse<List<SolicitudDeServicioDto>>> findByEstado(@PathVariable String estado) {
        try {
            List<SolicitudDeServicioDto> solicitudes = service.findByEstado(estado);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Solicitudes de servicio filtradas por estado", solicitudes, 200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron solicitudes de servicio con ese estado", null, 404)
            );
        }
    }

    @GetMapping("/obtenerPorIdServicio/{idServicio}")
    public ResponseEntity<JsonResponse<List<SolicitudDeServicioDto>>> findByServicio(@PathVariable Long idServicio) {
        try {
            List<SolicitudDeServicioDto> solicitudes = service.findByServicio(idServicio);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Solicitudes de servicio filtradas por servicio", solicitudes, 200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron solicitudes de servicio con ese servicio", null, 404)
            );
        }
    }

    @GetMapping("/obtenerPoridInmueble/{idInmueble}")
    public ResponseEntity<JsonResponse<List<SolicitudDeServicioDto>>> findByInmueble(@PathVariable Long idInmueble) {
        try {
            List<SolicitudDeServicioDto> solicitudes = service.findByInmueble(idInmueble);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Solicitudes de servicio filtradas por inmueble", solicitudes, 200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron solicitudes de servicio con ese inmueble", null, 404)
            );
        }
    }

    @GetMapping("/filtrarSolicituesPorFechaInicioFechaFin")
    public ResponseEntity<JsonResponse<List<SolicitudDeServicioDto>>> findByFechaBetween(
            @RequestParam LocalDateTime startDate,
            @RequestParam LocalDateTime endDate) {
        try {
            List<SolicitudDeServicioDto> solicitudes = service.findByFechaBetween(startDate, endDate);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Solicitudes de servicio filtradas por fecha", solicitudes, 200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron solicitudes de servicio en el rango de fechas especificado", null, 404)
            );
        }
    }

    @DeleteMapping("/eliminarPor/{id}")
    public ResponseEntity<JsonResponse<Boolean>> deleteById(@PathVariable Long id) {
        try {
            service.deleteById(id);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Solicitud de servicio eliminada exitosamente", true, 200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontró solicitud de servicio para eliminar", false, 404)
            );
        }
    }
}
