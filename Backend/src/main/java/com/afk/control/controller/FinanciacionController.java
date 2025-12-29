package com.afk.control.controller;


import com.afk.control.dto.FinanciacionDto;
import com.afk.control.service.FinanciacionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.afk.control.dto.JsonResponse;
import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/financiaciones")
public class FinanciacionController {

    private final FinanciacionService service;

    @PutMapping("/crear")
    public ResponseEntity<JsonResponse<FinanciacionDto>> crearFinanciacion(@RequestBody FinanciacionDto financiacionDto){
        FinanciacionDto creada = service.crearFinanciacion(financiacionDto);
        if(creada == null){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false,"error al crear la financiacion",null,404)
            );
        }else{
            return ResponseEntity.ok(
                    new JsonResponse<>(true,"financiacion creada exitosamente",creada,200)
            );
        }
    }

    @PutMapping("/acutualizarPorId/{id}")
    public ResponseEntity<JsonResponse<Void>> actualizarFinanciacion(@PathVariable Long id,
                                @RequestBody FinanciacionDto financiacionDto){
        try{
            service.actualizarFinanciacion(id, financiacionDto);
            return ResponseEntity.ok(
                    new JsonResponse<>(true,"financiacion actualizada por id exitosamente",null,200)
            );

        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false,"error al actualizar la financiacion",null,404)
            );
        }
    }
    @DeleteMapping("/eliminarPorId/{id}")
    public ResponseEntity<JsonResponse<Void>> eliminarFinanciacion(@PathVariable Long id){
        try{
            service.eliminarFinanciacion(id);
            return ResponseEntity.ok(
                    new JsonResponse<>(true,"financiacion eliminada por id exitosamente",null,200)
            );

        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false,"error al eliminar la financiacion",null,404)
            );
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<JsonResponse<List<FinanciacionDto>>> listarFinanciaciones(){
        List<FinanciacionDto> lista = service.listarFinanciaciones();
        if(lista.isEmpty()){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false,"error al listar las financiaciones",null,404)
            );
        }else{
            return ResponseEntity.ok(
                    new JsonResponse<>(true,"financiaciones encontradas exitosamente",null,200)
            );
        }
    }

    @GetMapping("/buscarPorId/{id}")
    public ResponseEntity<JsonResponse<FinanciacionDto>> buscarFinanciacion(@PathVariable Long id){
        FinanciacionDto lista = service.buscarFinanciacion(id);
        if(lista == null){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false,"error al buscar la financiacion",null,404)
            );
        }else{
            return ResponseEntity.ok(
                    new JsonResponse<>(true,"financiacion encontrada exitosamente",null,200)
            );
        }
    }

    @GetMapping("/generarPlanDePagosPorIdFinanciacion/{financiacionId}")
    public ResponseEntity<JsonResponse<List<FinanciacionDto>>> generarPlanDePagos(@PathVariable Long financiacionId){
        List<FinanciacionDto> lista = service.generarPlanDePagos(financiacionId);
        if(lista.isEmpty()){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false,"error al generar pagos para la financiacion",null,404)
            );
        }else{
            return ResponseEntity.ok(
                    new JsonResponse<>(true,"pagos generados para la financiacion exitosamente",null,200)
            );
        }
    }

    @GetMapping("/simularPlanDePagos")
    public ResponseEntity<JsonResponse<List<FinanciacionDto>>> simularPlanDePagos(@RequestParam Integer numeroCuotas,
                                                                                  @RequestParam Float montoTotal,
                                                                                  @RequestParam Float interes){
        List<FinanciacionDto> lista = service.simularPlanDePagos(numeroCuotas, montoTotal, interes);
        if(lista.isEmpty()){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false,"error al generar la simulacion de los pagos para la financiacion",null,404)
            );
        }else{
            return ResponseEntity.ok(
                    new JsonResponse<>(true,"simulacion de pagos generados para la financiacion exitosamente",null,200)
            );
        }

    }
    @GetMapping("/validarFinanciacionPorId/{financiacionId}")
    public ResponseEntity<JsonResponse<Boolean>> esFinanciacionValida(@PathVariable Long financiacionId){
        boolean bandera = service.esFinanciacionValida(financiacionId);
        if(bandera){
            return ResponseEntity.ok(
                    new JsonResponse<>(true,"simulacion de pagos generados para la financiacion exitosamente", true,200)
            );
        }else{
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false,"error al generar la simulacion de los pagos para la financiacion", false,404)
            );
        }
    }
}
