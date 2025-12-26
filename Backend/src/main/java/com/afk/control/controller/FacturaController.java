package com.afk.control.controller;

import com.afk.control.dto.FacturaDto;
import com.afk.control.service.FacturaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/facturas")
@RequiredArgsConstructor
public class FacturaController {

    private final FacturaService facturaService;

    @GetMapping
    public ResponseEntity<List<FacturaDto>> getAllFacturas() {
        List<FacturaDto> facturas = facturaService.getAllFacturas();
        return ResponseEntity.ok(facturas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FacturaDto> getFacturaById(@PathVariable Long id) {
        FacturaDto factura = facturaService.getFacturaById(id);
        return ResponseEntity.ok(factura);
    }

    @PostMapping
    public ResponseEntity<FacturaDto> createFactura(@RequestBody FacturaDto facturaDto) {
        FacturaDto factura = facturaService.createFactura(facturaDto);
        return ResponseEntity.status(201).body(factura);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FacturaDto> updateFactura(@PathVariable Long id, @RequestBody FacturaDto facturaDto) {
        FacturaDto factura = facturaService.updateFactura(id, facturaDto);
        return ResponseEntity.ok(factura);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFactura(@PathVariable Long id) {
        facturaService.deleteFactura(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<List<FacturaDto>> getFacturasByUsuario(@PathVariable Long idUsuario) {
        List<FacturaDto> facturas = facturaService.getFacturasByUsuario(idUsuario);
        return ResponseEntity.ok(facturas);
    }

    @GetMapping("/contrato/{idContrato}")
    public ResponseEntity<List<FacturaDto>> getFacturasByContrato(@PathVariable Long idContrato) {
        List<FacturaDto> facturas = facturaService.getFacturasByContrato(idContrato);
        return ResponseEntity.ok(facturas);
    }

    @PostMapping("/generar/{idContrato}")
    public ResponseEntity<FacturaDto> generateFacturaForContrato(@PathVariable Long idContrato) {
        FacturaDto factura = facturaService.generateFacturaForContrato(idContrato);
        return ResponseEntity.status(201).body(factura);
    }

    @GetMapping("/{id}/estado-pago")
    public ResponseEntity<String> getFacturaPagoStatus(@PathVariable Long id) {
        String status = facturaService.getFacturaPagoStatus(id);
        return ResponseEntity.ok(status);
    }
}
