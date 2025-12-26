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
        return ResponseEntity.ok(
                new JsonResponse<>(
                        true,
                        "apartamentos listados exitosamente",
                        lista,
                        200
                )
        );
    }
    @DeleteMapping("/eliminar")
    public ResponseEntity<JsonResponse<Void>> deleteApartamentoById(Long id){
        service.deleteApartamentoById(id);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/actualizar")
    public ResponseEntity<JsonResponse<Void>> actualizarApartamento(Long id,ApartamentoDto apartamentoDto){
        service.updateApartamento(id, apartamentoDto);
        return ResponseEntity.noContent().build();
    }
    @GetMapping("/habitacionesPorId/{id}")
    public ResponseEntity<JsonResponse<ApartamentoDto>> findHabitacionesByApartamentoId(@RequestParam Long id){
        ApartamentoDto apartamento = service.findHabitacionesByApartamentoId(id);
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
    public ResponseEntity<JsonResponse<Void>> eliminarHabitacionDeUnApartamentoPorHabitacionId(@RequestParam Long idApartamento,
                                                                                               @RequestParam  Long idHabitacion){
        service.eliminarHabitacionDeUnApartamentoPorHabitacionId(idApartamento, idHabitacion);
        return ResponseEntity.noContent().build();
    }
    @PutMapping("/actualizarEstadoHabitacionPorId/{id}/{estado}")
    public ResponseEntity<JsonResponse<Void>> actualizarHabitacionDeUnApartamentoPorHabitacionId(@RequestBody ApartamentoDto apartamento,
                                                                                                 @RequestParam Long id,
                                                                                                 @RequestParam String estado){
        service.actualizarHabitacionDeUnApartamentoPorHabitacionId(apartamento, id, estado);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/contarHabitacionesPorApartamentoId/{id}")
    public ResponseEntity<JsonResponse<Integer>> contarHabitacionesPorApartamentoId(Long id){
        Integer cantidadHabitaciones = service.contarHabitacionesPorApartamentoId(id);
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


