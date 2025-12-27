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

    @PostMapping("/crear")
    public ResponseEntity<JsonResponse<ServicioDto>> crearServicio(@RequestBody ServicioDto servicio) {
        ServicioDto servicioDto = service.crearServicio(servicio);
        if (servicioDto==null) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "servicio no se pudo crear", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "Servicio creado exitosamente",
                        servicioDto,
                        201
                )
        );
    }

    @GetMapping("/obtenerPorId/{id}")
    public ResponseEntity<JsonResponse<ServicioDto>> getServicioById(@PathVariable Long id) {
        ServicioDto servicioDto = service.getServicioById(id);
        if (servicioDto != null) {
            return ResponseEntity.ok(
                    new JsonResponse<>(
                            true,
                            "Servicio encontrado",
                            servicioDto,
                            200
                    )
            );
        } else {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(
                            false,
                            "Servicio no encontrado",
                            null,
                            404
                    )
            );
        }
    }

    @GetMapping("/todos")
    public ResponseEntity<JsonResponse<List<ServicioDto>>> getAllServicios() {
        List<ServicioDto> servicios = service.getAllServicios();
        if (servicios.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "servicios no se pudieron obtener", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "Servicios obtenidos correctamente",
                        servicios,
                        200
                )
        );
    }

    @DeleteMapping("/eliminarPorId/{id}")
    public ResponseEntity<JsonResponse<Void>> eliminarServicio(@PathVariable Long id) {
        try {
            service.eliminarServicio(id);
            return ResponseEntity.ok(
                    new JsonResponse<>(
                            true,
                            "Servicio eliminado exitosamente",
                            null,
                            200
                    )
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(
                            false,
                            "Servicio no encontrado para eliminar",
                            null,
                            404
                    )
            );
        }
    }

    @PutMapping("/actualizarPorId/{id}")
    public ResponseEntity<JsonResponse<ServicioDto>> actualizarServicio(@PathVariable Long id, @RequestBody ServicioDto servicio) {
        try{
            service.actualizarServicio(id, servicio);
            return ResponseEntity.ok(
                    new JsonResponse<>(
                            true,
                            "Servicio actualizado exitosamente",
                            null,
                            200
                    )
            );
        }catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(
                            false,
                            "Servicio no encontrado para actualizar",
                            null,
                            404
                    )
            );
        }
    }
    @GetMapping("/buscarServiciosPorNombre/{nombre}")
    public ResponseEntity<JsonResponse<List<ServicioDto>>> buscarServicioPorNombre(@PathVariable String nombre) {
        List<ServicioDto> servicios = service.buscarServicioPorNombre(nombre);
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "Servicios encontrados por nombre",
                        servicios,
                        200
                )
        );
    }
    @GetMapping("/buscarServiciosPorTipo/{tipo}")
    public ResponseEntity<JsonResponse<List<ServicioDto>>> buscarServiciosPorTipo(@PathVariable String tipo) {
        List<ServicioDto> servicios = service.buscarServiciosPorTipo(tipo);
        if (servicios.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "servicio no se pudieron buscar por tipo", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "Servicios encontrados por tipo",
                        servicios,
                        200
                )
        );
    }
    @GetMapping("/buscarServiciosPorNombreYPrecios")
    public ResponseEntity<JsonResponse<List<ServicioDto>>> buscarServiciosPorNombreYPrecio(@RequestParam String nombre, @RequestParam Integer precio) {
        List<ServicioDto> servicios = service.buscarServiciosPorNombreYPrecio(nombre, precio);
        if (servicios.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "servicio no se pudieron buscar por nombre y precios", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "Servicios encontrados por nombre y precio",
                        servicios,
                        200
                )
        );
    }

    @PutMapping("/cambiarEstadoServicioPorId/{id}")
    public ResponseEntity<JsonResponse<Void>> cambiarEstadoServicioPorIdServicio(@PathVariable Long id, @RequestParam String estado) {
        try{
            service.cambiarEstadoServicioPorIdServicio(id, estado);
            return ResponseEntity.ok(
                    new JsonResponse<>(
                            true,
                            "Estado de servicio actualizado exitosamente",
                            null,
                            200
                    )
            );
        }catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(
                            false,
                            "Servicio no encontrado para cambiar el estado",
                            null,
                            404
                    )
            );
        }
    }
}
