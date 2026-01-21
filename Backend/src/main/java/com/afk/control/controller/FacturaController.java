package com.afk.control.controller;

import com.afk.control.dto.FacturaDto;
import com.afk.control.service.FacturaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.afk.control.dto.JsonResponse;

import java.util.List;

@RestController
@RequestMapping("/api/v1/facturas")
@RequiredArgsConstructor
public class FacturaController {

    private final FacturaService facturaService;

    // ========================= CRUD =========================

    @GetMapping
    public ResponseEntity<JsonResponse<List<FacturaDto>>> getAllFacturas() {
        List<FacturaDto> facturas = facturaService.getAllFacturas();

        if (facturas.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron facturas", null, 404)
            );
        }

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Facturas obtenidas exitosamente", facturas, 200)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<JsonResponse<FacturaDto>> getFacturaById(@PathVariable Long id) {
        FacturaDto factura = facturaService.getFacturaById(id);

        if (factura == null) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "Factura no encontrada", null, 404)
            );
        }

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Factura obtenida exitosamente", factura, 200)
        );
    }

    @PostMapping
    public ResponseEntity<JsonResponse<FacturaDto>> createFactura(
            @RequestBody FacturaDto facturaDto) {

        FacturaDto creada = facturaService.createFactura(facturaDto);

        if (creada == null) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "La factura no pudo ser creada", null, 404)
            );
        }

        return ResponseEntity.status(201).body(
                new JsonResponse<>(true, "Factura creada exitosamente", creada, 201)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<JsonResponse<FacturaDto>> updateFactura(
            @PathVariable Long id,
            @RequestBody FacturaDto facturaDto) {

        FacturaDto actualizada = facturaService.updateFactura(id, facturaDto);

        if (actualizada == null) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "La factura no pudo ser actualizada", null, 404)
            );
        }

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Factura actualizada exitosamente", actualizada, 200)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<JsonResponse<Void>> deleteFactura(@PathVariable Long id) {
        try {
            facturaService.deleteFactura(id);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Factura eliminada exitosamente", null, 200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "Factura no encontrada", null, 404)
            );
        }
    }

    // ========================= CONSULTAS =========================

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<JsonResponse<List<FacturaDto>>> getFacturasByUsuario(
            @PathVariable Long idUsuario) {

        List<FacturaDto> facturas = facturaService.getFacturasByUsuario(idUsuario);

        if (facturas.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron facturas para el usuario", null, 404)
            );
        }

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Facturas del usuario obtenidas exitosamente", facturas, 200)
        );
    }

    @GetMapping("/contrato/{idContrato}")
    public ResponseEntity<JsonResponse<List<FacturaDto>>> getFacturasByContrato(
            @PathVariable Long idContrato) {

        List<FacturaDto> facturas = facturaService.getFacturasByContrato(idContrato);

        if (facturas.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron facturas para el contrato", null, 404)
            );
        }

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Facturas del contrato obtenidas exitosamente", facturas, 200)
        );
    }

    @PostMapping("/contrato/{idContrato}/generar")
    public ResponseEntity<JsonResponse<FacturaDto>> generateFacturaForContrato(
            @PathVariable Long idContrato) {

        FacturaDto factura = facturaService.generateFacturaForContrato(idContrato);

        if (factura == null) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se pudo generar la factura", null, 404)
            );
        }

        return ResponseEntity.status(201).body(
                new JsonResponse<>(true, "Factura generada exitosamente", factura, 201)
        );
    }

    @GetMapping("/{id}/estado")
    public ResponseEntity<JsonResponse<String>> getFacturaPagoStatus(@PathVariable Long id) {
        String estado = facturaService.getFacturaPagoStatus(id);

        if (estado == null) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se pudo obtener el estado de la factura", null, 404)
            );
        }

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Estado de la factura obtenido exitosamente", estado, 200)
        );
    }
}