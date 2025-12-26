package com.afk.control.controller;

import com.afk.control.dto.CasaDto;
import com.afk.control.service.CasaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.afk.control.dto.JsonResponse;

import java.util.List;

@RestController
@RequestMapping("/api/casas")
@RequiredArgsConstructor
public class CasaController {
    private final CasaService service;

    @PostMapping("/crear")
    public ResponseEntity<JsonResponse<CasaDto>> crearCasa(@RequestBody CasaDto casa) {
        CasaDto c = service.createCasa( casa );
        return ResponseEntity.ok(
                new JsonResponse<>(
                    true,
                    "casa creada exitosamente",
                    c,
                    201
                )
        );
    }
    @GetMapping("/obtenerPorId/{id}")
    public ResponseEntity<JsonResponse<CasaDto>> findCasaById(@RequestParam Long id){
        CasaDto c = service.findCasaById( id );
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "casa encontrada exitosamente",
                        c,
                        200
                )
        );
    }

    @GetMapping("/listar")
    public ResponseEntity<JsonResponse<List<CasaDto>>> findAllCasas(){
        List<CasaDto> lista = service.findAllCasas();
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "casa encontradas exitosamente",
                        lista,
                        200
                )
        );
    }

    @PutMapping("/actualizar/{id}")
    public ResponseEntity<JsonResponse<CasaDto>> updateCasas(@RequestParam Long id,@RequestBody CasaDto caasa){
        CasaDto c= service.updateCasas( id, caasa );
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "casa actualizada exitosamente",
                        c,
                        200
                )
        );
    }

    @DeleteMapping("/eliminar")
    public ResponseEntity<JsonResponse<Void>> deleteCasasById(@RequestParam Long id){
        service.deleteCasasById( id );
        return ResponseEntity.noContent().build();
    }
}
