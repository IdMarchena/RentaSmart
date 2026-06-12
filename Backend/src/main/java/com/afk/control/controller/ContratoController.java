package com.afk.control.controller;

import com.afk.control.dto.ContratoDto;
import com.afk.control.service.ContratoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.afk.control.dto.JsonResponse;

import java.time.YearMonth;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/contratos")
public class ContratoController {

    private final ContratoService service;

    // ========================= CRUD =========================

    @PostMapping
    public ResponseEntity<JsonResponse<ContratoDto>> createContrato(
            @RequestBody ContratoDto contrato) {

        ContratoDto creado = service.createContrato(contrato);

        if (creado == null) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "Contrato no pudo ser creado", null, 404)
            );
        }

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Contrato creado exitosamente", creado, 200)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<JsonResponse<ContratoDto>> findContratoById(@PathVariable Long id) {
        ContratoDto contrato = service.findContratoById(id);

        if (contrato == null) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "Contrato no encontrado", null, 404)
            );
        }

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Contrato encontrado", contrato, 200)
        );
    }

    @GetMapping
    public ResponseEntity<JsonResponse<List<ContratoDto>>> findAllContratos() {
        List<ContratoDto> contratos = service.findAllContratos();

        if (contratos.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No existen contratos", null, 404)
            );
        }

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Lista de contratos", contratos, 200)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<JsonResponse<ContratoDto>> updateContrato(
            @PathVariable Long id,
            @RequestBody ContratoDto contrato) {

        ContratoDto actualizado = service.updateContrato(id, contrato);

        if (actualizado == null) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "Contrato no pudo ser actualizado", null, 404)
            );
        }

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Contrato actualizado", actualizado, 200)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<JsonResponse<Void>> deleteContratoById(@PathVariable Long id) {
        try {
            service.deleteContratoById(id);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Contrato eliminado", null, 200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "Contrato no pudo ser eliminado", null, 404)
            );
        }
    }

    // ========================= POR USUARIO =========================

    @GetMapping("/arrendador/{idArrendador}")
    public ResponseEntity<JsonResponse<List<ContratoDto>>> contratosComoArrendador(
            @PathVariable Long idArrendador) {

        List<ContratoDto> contratos = service.findContratosComoArrendador(idArrendador);

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Contratos como arrendador", contratos, 200)
        );
    }

    @GetMapping("/arrendatario/{idArrendatario}")
    public ResponseEntity<JsonResponse<List<ContratoDto>>> contratosComoArrendatario(
            @PathVariable Long idArrendatario) {

        List<ContratoDto> contratos = service.findContratosComoArrendatario(idArrendatario);

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Contratos como arrendatario", contratos, 200)
        );
    }

    // ========================= POR INMUEBLE =========================

    @GetMapping("/inmueble/{idInmueble}")
    public ResponseEntity<JsonResponse<List<ContratoDto>>> contratosPorInmueble(
            @PathVariable Long idInmueble) {

        List<ContratoDto> contratos = service.findContratosByInmueble(idInmueble);

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Contratos por inmueble", contratos, 200)
        );
    }

    @GetMapping("/inmueble/{idInmueble}/activo")
    public ResponseEntity<JsonResponse<Boolean>> inmuebleTieneContratoActivo(
            @PathVariable Long idInmueble) {

        boolean estadoActivo = service.inmuebleTieneContratoActivo(idInmueble);

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Estado del contrato del inmueble", estadoActivo, 200)
        );
    }

    // ========================= ESTADO =========================

    @GetMapping("/arrendador/{idArrendador}/activos")
    public ResponseEntity<JsonResponse<List<ContratoDto>>> contratosActivosComoArrendador(
            @PathVariable Long idArrendador) {

        List<ContratoDto> contratosActivos = service.findContratosActivosComoArrendador(idArrendador);

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Contratos activos como arrendador", contratosActivos, 200)
        );
    }

    @GetMapping("/arrendatario/{idArrendatario}/activos")
    public ResponseEntity<JsonResponse<List<ContratoDto>>> contratosActivosComoArrendatario(
            @PathVariable Long idArrendatario) {

        List<ContratoDto> contratosActivos = service.findContratosActivosComoArrendatario(idArrendatario);

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Contratos activos como arrendatario", contratosActivos, 200)
        );
    }

    @GetMapping("/arrendador/{idArrendador}/finalizados")
    public ResponseEntity<JsonResponse<List<ContratoDto>>> contratosFinalizadosComoArrendador(
            @PathVariable Long idArrendador) {

        List<ContratoDto> contratosFinalizados = service.findContratosFinalizadosComoArrendador(idArrendador);

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Contratos finalizados como arrendador", contratosFinalizados, 200)
        );
    }

    @GetMapping("/arrendatario/{idArrendatario}/finalizados")
    public ResponseEntity<JsonResponse<List<ContratoDto>>> contratosFinalizadosComoArrendatario(
            @PathVariable Long idArrendatario) {

        List<ContratoDto> contratosFinalizados = service.findContratosFinalizadosComoArrendatario(idArrendatario);

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Contratos finalizados como arrendatario", contratosFinalizados, 200)
        );
    }

    // ========================= MÉTRICAS =========================

    @GetMapping("/metricas/arrendador/{idArrendador}/cantidad")
    public ResponseEntity<JsonResponse<Long>> contarContratosComoArrendador(
            @PathVariable Long idArrendador) {

        Long cantidad = service.contarContratosComoArrendador(idArrendador);

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Cantidad de contratos", cantidad, 200)
        );
    }

    @GetMapping("/metricas/arrendador/{idArrendador}/ingreso-total")
    public ResponseEntity<JsonResponse<Double>> ingresoTotalArrendador(
            @PathVariable Long idArrendador) {

        Double ingresoTotal = service.calcularIngresoTotalComoArrendador(idArrendador);

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Ingreso total", ingresoTotal, 200)
        );
    }

    @GetMapping("/metricas/arrendador/{idArrendador}/ingresos-por-mes")
    public ResponseEntity<JsonResponse<Map<YearMonth, Double>>> ingresoPorMesArrendador(
            @PathVariable Long idArrendador) {

        Map<YearMonth, Double> ingresosPorMes = service.calcularIngresoPorMesComoArrendador(idArrendador);

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Ingresos por mes", ingresosPorMes, 200)
        );
    }

    // ========================= VENCIMIENTOS =========================

    @GetMapping("/proximos-a-vencer")
    public ResponseEntity<JsonResponse<List<ContratoDto>>> contratosProximosAVencer(
            @RequestParam Long idUsuario,
            @RequestParam int dias) {

        List<ContratoDto> contratosVencimiento = service.findContratosProximosAVencer(idUsuario, dias);

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Contratos próximos a vencer", contratosVencimiento, 200)
        );
    }

    // ========================= MÉTRICAS ADICIONALES =========================

    @GetMapping("/metricas/arrendatario/{idArrendatario}/cantidad")
    public ResponseEntity<JsonResponse<Long>> contarContratosComoArrendatario(
            @PathVariable Long idArrendatario) {

        Long cantidad = service.contarContratosComoArrendatario(idArrendatario);

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Cantidad de contratos", cantidad, 200)
        );
    }

    @GetMapping("/metricas/arrendador/{idArrendador}/contratos-por-mes")
    public ResponseEntity<JsonResponse<Map<YearMonth, Long>>> contarContratosPorMesComoArrendador(
            @PathVariable Long idArrendador) {

        Map<YearMonth, Long> contratosPorMes = service.contarContratosPorMesComoArrendador(idArrendador);

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Contratos por mes como arrendador", contratosPorMes, 200)
        );
    }

    @GetMapping("/metricas/arrendatario/{idArrendatario}/contratos-por-mes")
    public ResponseEntity<JsonResponse<Map<YearMonth, Long>>> contarContratosPorMesComoArrendatario(
            @PathVariable Long idArrendatario) {

        Map<YearMonth, Long> contratosPorMes = service.contarContratosPorMesComoArrendatario(idArrendatario);

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Contratos por mes como arrendatario", contratosPorMes, 200)
        );
    }

    @GetMapping("/usuario/{idUsuario}/contratos")
    public ResponseEntity<JsonResponse<List<ContratoDto>>> findContratoByUsuario(@PathVariable Long idUsuario) {
        List<ContratoDto> contratos = service.findContratoByUsuario(idUsuario);

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Contratos encontrados para el usuario", contratos, 200)
        );
    }
    @GetMapping("/metricas/arrendador/{idArrendador}/ingreso")
    public ResponseEntity<JsonResponse<Double>> ingresoArrendador(
            @PathVariable Long idArrendador) {

        Double ingreso = service.calcularIngresoComoArrendador(idArrendador);

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Ingreso como arrendador", ingreso, 200)
        );
    }

}
