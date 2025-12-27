package com.afk.control.controller;
import com.afk.control.dto.TipoServicioDto;
import com.afk.control.service.TipoServicioService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.afk.control.dto.JsonResponse;

import java.util.List;


@RestController
@RequestMapping("/api/tipoServicios")
@RequiredArgsConstructor
public class TipoServicioController {

    private final TipoServicioService service;

    @PostMapping("/crear")
    public ResponseEntity<JsonResponse<TipoServicioDto>> crear(@RequestBody TipoServicioDto dto){
        TipoServicioDto t = service.save(dto);
        if (t == null) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "tipo servicio no encontrado", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<TipoServicioDto>(
                        true,
                        "tipo de servicio creado exitosamente",
                        t,
                        201
                )
        );
    }

    @GetMapping("/buscarPorId/{id}")
    public ResponseEntity<JsonResponse<TipoServicioDto>> findById(@PathVariable Long id){
        TipoServicioDto t = service.findById(id);
        if (t == null) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "tipo servicio no encontrado", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<TipoServicioDto>(
                        true,
                        "tipo de servicio encontrado por id exitosamente",
                        t,
                        200
                )
        );
    }

    @GetMapping("/listar")
    public ResponseEntity<JsonResponse<List<TipoServicioDto>>> findAll(){
        List<TipoServicioDto> lista = service.findAll();
        if (lista.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "tipo servicio no encontrado", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "lista de servicios encontrada exitosamente",
                        lista,
                        200
                )
        );
    }

    @DeleteMapping("/eliminarPorId/{id}")
    public ResponseEntity<JsonResponse<Void>> delete(@PathVariable Long id){
        try{
            service.delete(id);
                return ResponseEntity.ok(
                        new JsonResponse<>(true, "tipo servicio elimiado", null, 200)
                );

        }catch (Exception e){
                return ResponseEntity.status(404).body(
                        new JsonResponse<>(false, "tipo servicio no eliminado", null, 404)
                );

        }
    }

    @PutMapping("/actualizarPorId/{id}")
    public ResponseEntity<JsonResponse<Void>> update(@PathVariable Long id,@RequestBody TipoServicioDto tipoServicioDto){
        try{
            service.update(id, tipoServicioDto);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "tipo servicio actualizado", null, 200)
            );
        }catch (Exception e){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "tipo servicio no actualizado", null, 404)
            );
        }
    }
}
