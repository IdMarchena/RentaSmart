package com.afk.control.controller;

import com.afk.control.dto.HistorialInquilinoDto;
import com.afk.control.service.HistorialInquilinoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/historial-inquilinos")
@RequiredArgsConstructor
public class HistorialInquilinoController {

    private final HistorialInquilinoService historialInquilinoService;

    @PostMapping
    public ResponseEntity<HistorialInquilinoDto> createHistorialInquilino(@RequestBody HistorialInquilinoDto historialInquilinoDto) {
        HistorialInquilinoDto savedHistorial = historialInquilinoService.createHistorialInquilino(historialInquilinoDto);
        return ResponseEntity.ok(savedHistorial);
    }
    @GetMapping("/{id}")
    public ResponseEntity<HistorialInquilinoDto> getHistorialInquilinoById(@PathVariable Long id) {
        HistorialInquilinoDto historialInquilinoDto = historialInquilinoService.findHistorialInquilinoById(id);
        return ResponseEntity.ok(historialInquilinoDto);
    }

    @GetMapping
    public ResponseEntity<List<HistorialInquilinoDto>> getAllHistorialInquilinos() {
        List<HistorialInquilinoDto> historialInquilinoDtos = historialInquilinoService.findAllHistorialInquilinos();
        return ResponseEntity.ok(historialInquilinoDtos);
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHistorialInquilinoById(@PathVariable Long id) {
        historialInquilinoService.deleteHistorialInquilinoById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<HistorialInquilinoDto>> getHistorialByUsuario(@PathVariable Long usuarioId) {
        List<HistorialInquilinoDto> historialInquilinoDtos = historialInquilinoService.findHistorialByUsuario(usuarioId);
        return ResponseEntity.ok(historialInquilinoDtos);
    }

    @GetMapping("/contrato/{contratoId}")
    public ResponseEntity<List<HistorialInquilinoDto>> getHistorialByContrato(@PathVariable Long contratoId) {
        List<HistorialInquilinoDto> historialInquilinoDtos = historialInquilinoService.findHistorialByContrato(contratoId);
        return ResponseEntity.ok(historialInquilinoDtos);
    }
}
