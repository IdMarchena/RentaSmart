package com.afk.control.controller;

import com.afk.control.dto.SolicitudDeServicioDto;
import com.afk.control.service.SolicitudServicioService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
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

    // ===================== CREAR =====================
    @PostMapping
    public ResponseEntity<JsonResponse<SolicitudDeServicioDto>> crearSolicitudServicio(@RequestBody SolicitudDeServicioDto solicitudServicio){
        try {
            SolicitudDeServicioDto creado = service.crearSolicitudServicio(solicitudServicio);
            if (creado == null) {
                return ResponseEntity.status(400).body(
                        new JsonResponse<>(false, "No se pudo crear la solicitud de servicio", null, 400)
                );
            }
            return ResponseEntity.status(201).body(
                    new JsonResponse<>(true, "Solicitud de servicio creada exitosamente", creado, 201)
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    new JsonResponse<>(false, "Error interno al crear la solicitud de servicio", null, 500)
            );
        }
    }

    // ===================== OBTENER POR ID =====================
    @GetMapping("/{id}")
    public ResponseEntity<JsonResponse<SolicitudDeServicioDto>> findById(@PathVariable Long id) {
        SolicitudDeServicioDto dto = service.findById(id);
        if (dto == null) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "Solicitud de servicio no encontrada", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Solicitud de servicio encontrada", dto, 200)
        );
    }

    // ===================== ACTUALIZAR =====================
    @PutMapping("/{id}")
    public ResponseEntity<JsonResponse<SolicitudDeServicioDto>> actualizarSolicitudServicio(
            @PathVariable Long id,
            @RequestBody SolicitudDeServicioDto solicitudServicio) {
        try {
            SolicitudDeServicioDto actualizado = service.actualizarSolicitudServicio(id, solicitudServicio);
            if (actualizado == null) {
                return ResponseEntity.status(404).body(
                        new JsonResponse<>(false, "Solicitud de servicio no encontrada para actualizar", null, 404)
                );
            }
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Solicitud de servicio actualizada exitosamente", actualizado, 200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    new JsonResponse<>(false, "Error interno al actualizar la solicitud de servicio", null, 500)
            );
        }
    }

    // ===================== OBTENER TODOS =====================
    @GetMapping
    public ResponseEntity<JsonResponse<List<SolicitudDeServicioDto>>> findAll() {
        List<SolicitudDeServicioDto> lista = service.findAll();
        if (lista.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron solicitudes de servicio", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Solicitudes de servicio obtenidas exitosamente", lista, 200)
        );
    }

    // ===================== FILTROS =====================
    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<JsonResponse<List<SolicitudDeServicioDto>>> findByUsuario(@PathVariable Long idUsuario) {
        List<SolicitudDeServicioDto> lista = service.findByUsuario(idUsuario);
        if (lista.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron solicitudes de servicio para el usuario", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Solicitudes de servicio encontradas para el usuario", lista, 200)
        );
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<JsonResponse<List<SolicitudDeServicioDto>>> findByEstado(@PathVariable String estado) {
        List<SolicitudDeServicioDto> lista = service.findByEstado(estado);
        if (lista.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron solicitudes de servicio con ese estado", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Solicitudes de servicio filtradas por estado", lista, 200)
        );
    }

    @GetMapping("/servicio/{idServicio}")
    public ResponseEntity<JsonResponse<List<SolicitudDeServicioDto>>> findByServicio(@PathVariable Long idServicio) {
        List<SolicitudDeServicioDto> lista = service.findByServicio(idServicio);
        if (lista.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron solicitudes de servicio con ese servicio", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Solicitudes de servicio filtradas por servicio", lista, 200)
        );
    }

    @GetMapping("/inmueble/{idInmueble}")
    public ResponseEntity<JsonResponse<List<SolicitudDeServicioDto>>> findByInmueble(@PathVariable Long idInmueble) {
        List<SolicitudDeServicioDto> lista = service.findByInmueble(idInmueble);
        if (lista.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron solicitudes de servicio con ese inmueble", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Solicitudes de servicio filtradas por inmueble", lista, 200)
        );
    }

    @GetMapping("/fecha")
    public ResponseEntity<JsonResponse<List<SolicitudDeServicioDto>>> findByFechaBetween(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        List<SolicitudDeServicioDto> lista = service.findByFechaBetween(startDate, endDate);
        if (lista.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron solicitudes de servicio en el rango de fechas especificado", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Solicitudes de servicio filtradas por fecha", lista, 200)
        );
    }

    // ===================== ELIMINAR =====================
    @DeleteMapping("/{id}")
    public ResponseEntity<JsonResponse<Void>> deleteById(@PathVariable Long id) {
        boolean eliminado = service.deleteById(id);
        if (!eliminado) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontró solicitud de servicio para eliminar", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Solicitud de servicio eliminada exitosamente", null, 200)
        );
    }
}
