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
        if (creado==null) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "requisito no se pudo crear", null, 404)
            );
        }
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
        if (tipoRequisito==null) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "requisito no se pudo obtener", null, 404)
            );
        }
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
        if (lista.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "requisitos no se pudieron obtener", null, 404)
            );
        }
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
        try{
            tipoRequisitoService.deleteTipoRequisitoById(id);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "inmueblse eliminado exitosamente", null, 200)
            );
        }catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "inmueblse no se pudo eliminar", null, 404)
            );
        }
    }
}
