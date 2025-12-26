package com.afk.control.controller;
import com.afk.control.dto.TipoRequisitoDto;
import com.afk.control.service.TipoRequisitoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.afk.control.dto.JsonResponse;
import java.util.List;
@RestController
@RequestMapping("/api/tiposrequisito")
@RequiredArgsConstructor
public class TipoRequisitoController {
    private final TipoRequisitoService tipoRequisitoService;
    @PostMapping("/crear")
    public ResponseEntity<JsonResponse<TipoRequisitoDto>> crearTipoRequisito(@RequestBody TipoRequisitoDto dto) {
        TipoRequisitoDto creado = tipoRequisitoService.createTipoRequisito(dto);
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "tipo requisito creado exitosamente",
                                creado,
                            201
                )
        );
    }
    @GetMapping("/buscarPorId/{id}")
    public ResponseEntity<JsonResponse<TipoRequisitoDto>> obtenerTipoRequisitoPorId(@PathVariable Long id) {
        TipoRequisitoDto tipoRequisito = tipoRequisitoService.findTipoRequisitoById(id);
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "tipo requisito obtenido por id",
                        tipoRequisito,
                        200
                )
        );
    }
    @GetMapping("/listar")
    public ResponseEntity<JsonResponse<List<TipoRequisitoDto>>> listarTiposRequisito() {
        List<TipoRequisitoDto> lista = tipoRequisitoService.findAllTiposRequisito();
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "lista de tipos de requisitos encontrados",
                        lista,
                        200
                )
        );
    }
    @DeleteMapping("/eliminarPorId/{id}")
    public ResponseEntity<JsonResponse<Void>> eliminarTipoRequisito(@PathVariable Long id) {
        tipoRequisitoService.deleteTipoRequisitoById(id);
        return ResponseEntity.noContent().build();
    }
}
