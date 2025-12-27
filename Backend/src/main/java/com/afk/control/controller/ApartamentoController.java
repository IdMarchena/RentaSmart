package com.afk.control.controller;
import com.afk.control.dto.ApartamentoDto;
import com.afk.control.service.ApartamentoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.afk.control.dto.JsonResponse;

import java.util.List;

@RestController
@RequestMapping("/api/apartamentos")
@RequiredArgsConstructor
public class ApartamentoController {

    private final ApartamentoService service;

    @PostMapping("crear")
    public ResponseEntity<JsonResponse<ApartamentoDto>> crear(@RequestBody ApartamentoDto dto) {
        ApartamentoDto creado = service.createApartamento(dto);
        if(creado == null) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "error al crear el apartamento", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "apartamento creado exitosamente",
                        creado,
                        201
                )
        );
    }
    @GetMapping("/listarTodos")
    public ResponseEntity<JsonResponse<List<ApartamentoDto>>> findAllApartamentos(){
        List<ApartamentoDto> lista = service.findAllApartamentos();
        if(lista.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "error al listar los apartamentos", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "apartamentos listados exitosamente",
                        lista,
                        200
                )
        );
    }
    @DeleteMapping("/eliminarPorId/{id}")
    public ResponseEntity<JsonResponse<Void>> deleteApartamentoById(@PathVariable Long id){
        try {
            service.deleteApartamentoById(id);
                return ResponseEntity.ok(
                        new JsonResponse<>(true, "apartamento eliminado exitosamente", null, 200)
                );

        }catch(Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "error al eliminar el apartamento", null, 404)
            );
        }
    }
    @PutMapping("/actualizarApartamentoPorId/{id}")
    public ResponseEntity<JsonResponse<Void>> actualizarApartamento(@PathVariable Long id,@RequestBody ApartamentoDto apartamentoDto){
        try {
            service.updateApartamento(id, apartamentoDto);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "apartamento actualizado exitosamente", null, 200)
            );

        }catch(Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "error al actualizar el apartamento", null, 404)
            );
        }
    }
    @GetMapping("/habitacionesPorId/{id}")
    public ResponseEntity<JsonResponse<ApartamentoDto>> findHabitacionesByApartamentoId(@PathVariable Long id){
        ApartamentoDto apartamento = service.findHabitacionesByApartamentoId(id);
        if(apartamento==null) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "error al listar los apartamentos", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "habitaciones encontradas del apartamento exitosamente",
                        apartamento,
                        200
                )
        );
    }
    @DeleteMapping("/eliminarHabitacionDeUnApartamentoPorId/{idApartamento}/{idHabitacion}")
    public ResponseEntity<JsonResponse<Void>> eliminarHabitacionDeUnApartamentoPorHabitacionId(@PathVariable Long idApartamento,
                                                                                               @PathVariable Long idHabitacion){
        try{
            service.eliminarHabitacionDeUnApartamentoPorHabitacionId(idApartamento, idHabitacion);
            return ResponseEntity.ok(
                new JsonResponse<>(true, "apartamento actualizado exitosamente", null, 200)
            );
        }catch(Exception e) {
            return ResponseEntity.status(404).body(
                new JsonResponse<>(false, "error al actualizar el apartamento", null, 404)
            );
        }
    }
    @PutMapping("/actualizarEstadoHabitacionPorId/{id}/{estado}")
    public ResponseEntity<JsonResponse<Void>> actualizarHabitacionDeUnApartamentoPorHabitacionId(@RequestBody ApartamentoDto apartamento,
                                                                                                 @PathVariable Long id,
                                                                                                 @PathVariable String estado){
        try{
            service.actualizarHabitacionDeUnApartamentoPorHabitacionId(apartamento, id, estado);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "apartamento actualizado exitosamente", null, 200)
            );
        }catch(Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "error al actualizar el apartamento", null, 404)
            );
        }
    }

    @GetMapping("/contarHabitacionesPorApartamentoId/{id}")
    public ResponseEntity<JsonResponse<Integer>> contarHabitacionesPorApartamentoId(@PathVariable Long id){
        Integer cantidadHabitaciones = service.contarHabitacionesPorApartamentoId(id);
        if(cantidadHabitaciones==null || cantidadHabitaciones<=0) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "error al listar los apartamentos", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "habitaciones del apartamento contadas exitosamente",
                        cantidadHabitaciones,
                        200
                )
        );
    }
}


