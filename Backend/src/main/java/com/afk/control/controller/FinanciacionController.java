package com.afk.control.controller;


import com.afk.control.dto.FinanciacionDto;
import com.afk.control.service.FinanciacionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.afk.control.dto.JsonResponse;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/financiaciones")
public class FinanciacionController {

    private final FinanciacionService service;

    // ========================= CREATE =========================

    @PostMapping
    public ResponseEntity<JsonResponse<FinanciacionDto>> crearFinanciacion(
            @RequestBody FinanciacionDto financiacionDto) {

        FinanciacionDto creada = service.crearFinanciacion(financiacionDto);

        if (creada == null) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se pudo crear la financiación", null, 404)
            );
        }

        return ResponseEntity.status(201).body(
                new JsonResponse<>(true, "Financiación creada exitosamente", creada, 201)
        );
    }

    // ========================= UPDATE =========================

    @PutMapping("/{id}")
    public ResponseEntity<JsonResponse<Void>> actualizarFinanciacion(
            @PathVariable Long id,
            @RequestBody FinanciacionDto financiacionDto) {

        try {
            service.actualizarFinanciacion(id, financiacionDto);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Financiación actualizada exitosamente", null, 200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se pudo actualizar la financiación", null, 404)
            );
        }
    }

    // ========================= DELETE =========================

    @DeleteMapping("/{id}")
    public ResponseEntity<JsonResponse<Void>> eliminarFinanciacion(@PathVariable Long id) {
        try {
            service.eliminarFinanciacion(id);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Financiación eliminada exitosamente", null, 200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se pudo eliminar la financiación", null, 404)
            );
        }
    }

    // ========================= READ =========================

    @GetMapping
    public ResponseEntity<JsonResponse<List<FinanciacionDto>>> listarFinanciaciones() {
        List<FinanciacionDto> lista = service.listarFinanciaciones();

        if (lista.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron financiaciones", null, 404)
            );
        }

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Financiaciones encontradas exitosamente", lista, 200)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<JsonResponse<FinanciacionDto>> buscarFinanciacion(@PathVariable Long id) {
        FinanciacionDto financiacion = service.buscarFinanciacion(id);

        if (financiacion == null) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "Financiación no encontrada", null, 404)
            );
        }

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Financiación encontrada exitosamente", financiacion, 200)
        );
    }

    // ========================= PLANES DE PAGO =========================

    @PostMapping("/{financiacionId}/plan-pagos")
    public ResponseEntity<JsonResponse<List<FinanciacionDto>>> generarPlanDePagos(
            @PathVariable Long financiacionId) {

        List<FinanciacionDto> lista = service.generarPlanDePagos(financiacionId);

        if (lista.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se pudo generar el plan de pagos", null, 404)
            );
        }

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Plan de pagos generado exitosamente", lista, 200)
        );
    }

    @GetMapping("/simular")
    public ResponseEntity<JsonResponse<List<FinanciacionDto>>> simularPlanDePagos(
            @RequestParam Integer numeroCuotas,
            @RequestParam Float montoTotal,
            @RequestParam Float interes) {

        List<FinanciacionDto> lista =
                service.simularPlanDePagos(numeroCuotas, montoTotal, interes);

        if (lista.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se pudo generar la simulación", null, 404)
            );
        }

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Simulación de pagos generada exitosamente", lista, 200)
        );
    }

    // ========================= VALIDACIÓN =========================

    @GetMapping("/{financiacionId}/validar")
    public ResponseEntity<JsonResponse<Boolean>> esFinanciacionValida(
            @PathVariable Long financiacionId) {

        boolean valida = service.esFinanciacionValida(financiacionId);

        if (!valida) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "La financiación no es válida", false, 404)
            );
        }

        return ResponseEntity.ok(
                new JsonResponse<>(true, "La financiación es válida", true, 200)
        );
    }
}
