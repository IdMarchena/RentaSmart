package com.afk.control.controller;

import com.afk.control.dto.ServicioDto;
import com.afk.control.service.ServicioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.afk.control.dto.JsonResponse;

import java.util.List;

@RestController
@RequestMapping("/api/servicios")
@RequiredArgsConstructor
public class ServicioController {

    private final ServicioService service;

    // ===================== CREAR =====================
    @PostMapping
    public ResponseEntity<JsonResponse<ServicioDto>> crearServicio(@RequestBody ServicioDto servicio) {
        ServicioDto creado = service.crearServicio(servicio);
        if (creado == null) {
            return ResponseEntity.status(400).body(
                    new JsonResponse<>(false, "El servicio no se pudo crear", null, 400)
            );
        }
        return ResponseEntity.status(201).body(
                new JsonResponse<>(true, "Servicio creado exitosamente", creado, 201)
        );
    }

    // ===================== OBTENER POR ID =====================
    @GetMapping("/{id}")
    public ResponseEntity<JsonResponse<ServicioDto>> getServicioById(@PathVariable Long id) {
        ServicioDto dto = service.getServicioById(id);
        if (dto == null) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "Servicio no encontrado", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Servicio encontrado", dto, 200)
        );
    }

    // ===================== OBTENER TODOS =====================
    @GetMapping
    public ResponseEntity<JsonResponse<List<ServicioDto>>> getAllServicios() {
        List<ServicioDto> lista = service.getAllServicios();
        if (lista.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron servicios", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Servicios obtenidos correctamente", lista, 200)
        );
    }

    // ===================== ACTUALIZAR =====================
    @PutMapping("/{id}")
    public ResponseEntity<JsonResponse<ServicioDto>> actualizarServicio(@PathVariable Long id,
                                                                        @RequestBody ServicioDto servicio) {
        try {
            ServicioDto actualizado = service.actualizarServicio(id, servicio);
            if (actualizado == null) {
                return ResponseEntity.status(404).body(
                        new JsonResponse<>(false, "Servicio no encontrado para actualizar", null, 404)
                );
            }
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Servicio actualizado exitosamente", actualizado, 200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    new JsonResponse<>(false, "Error al actualizar el servicio", null, 500)
            );
        }
    }

    // ===================== ELIMINAR =====================
    @DeleteMapping("/{id}")
    public ResponseEntity<JsonResponse<Void>> eliminarServicio(@PathVariable Long id) {
        try {
            boolean eliminado = service.eliminarServicio(id);
            if (!eliminado) {
                return ResponseEntity.status(404).body(
                        new JsonResponse<>(false, "Servicio no encontrado para eliminar", null, 404)
                );
            }
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Servicio eliminado exitosamente", null, 200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(500).body(
                    new JsonResponse<>(false, "Error al eliminar el servicio", null, 500)
            );
        }
    }

    // ===================== FILTROS =====================
    @GetMapping("/nombre/{nombre}")
    public ResponseEntity<JsonResponse<List<ServicioDto>>> buscarServicioPorNombre(@PathVariable String nombre) {
        List<ServicioDto> lista = service.buscarServicioPorNombre(nombre);
        if (lista.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron servicios por nombre", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Servicios encontrados por nombre", lista, 200)
        );
    }

    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<JsonResponse<List<ServicioDto>>> buscarServiciosPorTipo(@PathVariable String tipo) {
        List<ServicioDto> lista = service.buscarServiciosPorTipo(tipo);
        if (lista.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron servicios por tipo", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Servicios encontrados por tipo", lista, 200)
        );
    }

    @GetMapping("/estado/{estado}")
    public ResponseEntity<JsonResponse<List<ServicioDto>>> buscarServiciosPorEstado(@PathVariable String estado) {
        List<ServicioDto> lista = service.buscarServiciosPorEstado(estado);
        if (lista.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron servicios por estado", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Servicios encontrados por estado", lista, 200)
        );
    }

    @GetMapping("/nombre/precio")
    public ResponseEntity<JsonResponse<List<ServicioDto>>> buscarServiciosPorNombreYPrecio(@RequestParam String nombre,
                                                                                           @RequestParam Integer precio) {
        List<ServicioDto> lista = service.buscarServiciosPorNombreYPrecio(nombre, precio);
        if (lista.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron servicios por nombre y precio", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Servicios encontrados por nombre y precio", lista, 200)
        );
    }

    // ===================== CAMBIAR ESTADO =====================
    @PutMapping("/{id}/estado")
    public ResponseEntity<JsonResponse<Void>> cambiarEstadoServicioPorId(@PathVariable Long id, @RequestParam String estado) {
        try {
            service.cambiarEstadoServicioPorIdServicio(id, estado);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Estado de servicio actualizado exitosamente", null, 200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "Servicio no encontrado para cambiar el estado", null, 404)
            );
        }
    }
}