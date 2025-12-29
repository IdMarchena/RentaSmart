package com.afk.control.controller;


import com.afk.control.dto.ContratoDto;
import com.afk.control.service.ContratoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.afk.control.dto.JsonResponse;

import java.time.YearMonth;
import java.util.List;
import java.util.Map;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/contratos")
public class ContratoController {

    private final ContratoService service;

    @PostMapping("/crear")
    public ResponseEntity<JsonResponse<ContratoDto>> createContrato(ContratoDto contratos){
        ContratoDto contrato = service.createContrato(contratos);
        if(contrato == null){
            return ResponseEntity.status(404).body(
              new JsonResponse<>(false,"contrato no pudo ser creado",null,404)
            );
        }else{
            return ResponseEntity.ok(
                    new JsonResponse<>(true,"contrato creado exitosamente",contrato,200)
            );
        }
    }
    @GetMapping("/obtenerPorId/{id}")
    public ResponseEntity<JsonResponse<ContratoDto>> findContratoById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(
                    new JsonResponse<>(
                            true,
                            "Contrato encontrado",
                            service.findContratoById(id),
                            200
                    )
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "Contrato no encontrado", null, 404)
            );
        }
    }


    @GetMapping("/listar")
    public ResponseEntity<JsonResponse<List<ContratoDto>>> findAllContratos() {
        try {
            return ResponseEntity.ok(
                    new JsonResponse<>(
                            true,
                            "Lista de contratos",
                            service.findAllContratos(),
                            200
                    )
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No existen contratos", null, 404)
            );
        }
    }

    @PutMapping("/actualizarPorId/{id}")
    public ResponseEntity<JsonResponse<ContratoDto>> updateContrato(
            @PathVariable Long id,
            @RequestBody ContratoDto contrato) {
        try {
            return ResponseEntity.ok(
                    new JsonResponse<>(
                            true,
                            "Contrato actualizado",
                            service.updateContrato(id, contrato),
                            200
                    )
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "Contrato no pudo ser actualizado", null, 404)
            );
        }
    }


    @DeleteMapping("/eliminarPorId/{id}")
    public ResponseEntity<JsonResponse<Void>> deleteContratoById(@PathVariable Long id) {
        try {
            service.deleteContratoById(id);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Contrato eliminado", null, 200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "Contrato no pudo ser eliminado", null, 404)
            );
        }
    }

    @GetMapping("/contratosPorIdArrendador/{idUsuario}")
    public ResponseEntity<JsonResponse<List<ContratoDto>>> contratosComoArrendador(
            @PathVariable Long idUsuario) {

        try {
            return ResponseEntity.ok(
                    new JsonResponse<>(
                            true,
                            "Contratos como arrendador",
                            service.findContratosComoArrendador(idUsuario),
                            200
                    )
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron contratos", null, 404)
            );
        }
    }

    @GetMapping("/contratosPorIdArrendatario/{idUsuario}")
    public ResponseEntity<JsonResponse<List<ContratoDto>>> contratosComoArrendatario(
            @PathVariable Long idUsuario) {

        try {
            return ResponseEntity.ok(
                    new JsonResponse<>(
                            true,
                            "Contratos como arrendatario",
                            service.findContratosComoArrendatario(idUsuario),
                            200
                    )
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron contratos", null, 404)
            );
        }
    }


    @GetMapping("/contratosPorIdInmueble/{idInmueble}")
    public ResponseEntity<JsonResponse<List<ContratoDto>>> contratosPorInmueble(
            @PathVariable Long idInmueble) {

        try {
            return ResponseEntity.ok(
                    new JsonResponse<>(
                            true,
                            "Contratos por inmueble",
                            service.findContratosByInmueble(idInmueble),
                            200
                    )
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron contratos", null, 404)
            );
        }
    }


    @GetMapping("/contratosActivosComoIdArrendador/{idUsuario}")
    public ResponseEntity<JsonResponse<List<ContratoDto>>> contratosActivosComoArrendador(
            @PathVariable Long idUsuario) {

        try {
            return ResponseEntity.ok(
                    new JsonResponse<>(
                            true,
                            "Contratos activos como arrendador",
                            service.findContratosActivosComoArrendador(idUsuario),
                            200
                    )
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron contratos activos", null, 404)
            );
        }
    }
    @GetMapping("/contratosActivosComoIdArrendatario/{idUsuario}")
    public ResponseEntity<JsonResponse<List<ContratoDto>>> contratosActivosComoArrendatario(
            @PathVariable Long idUsuario) {

        try {
            return ResponseEntity.ok(
                    new JsonResponse<>(
                            true,
                            "Contratos activos como arrendatario",
                            service.findContratosActivosComoArrendatario(idUsuario),
                            200
                    )
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron contratos activos", null, 404)
            );
        }
    }


    @GetMapping("/contratosFinalizadosComoIdArrendador/{idUsuario}")
    public ResponseEntity<JsonResponse<List<ContratoDto>>> contratosFinalizadosComoArrendador(
            @PathVariable Long idUsuario) {

        try {
            return ResponseEntity.ok(
                    new JsonResponse<>(
                            true,
                            "Contratos finalizados como arrendador",
                            service.findContratosFinalizadosComoArrendador(idUsuario),
                            200
                    )
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron contratos finalizados", null, 404)
            );
        }
    }
    @GetMapping("/contratosFinalizadosComoIdArrendatario/{idUsuario}")
    public ResponseEntity<JsonResponse<List<ContratoDto>>> contratosFinalizadosComoArrendatario(
            @PathVariable Long idUsuario) {

        try {
            return ResponseEntity.ok(
                    new JsonResponse<>(
                            true,
                            "Contratos finalizados como arrendatario",
                            service.findContratosFinalizadosComoArrendatario(idUsuario),
                            200
                    )
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron contratos finalizados", null, 404)
            );
        }
    }




    @GetMapping("/inmuebleTieneContratoActivoPorIdInmueble/{idInmueble}")
    public ResponseEntity<JsonResponse<Boolean>> inmuebleTieneContratoActivo(
            @PathVariable Long idInmueble) {

        try {
            return ResponseEntity.ok(
                    new JsonResponse<>(
                            true,
                            "Estado del contrato del inmueble",
                            service.inmuebleTieneContratoActivo(idInmueble),
                            200
                    )
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se pudo validar el inmueble", false, 404)
            );
        }
    }


    @GetMapping("/cantidadContratosPorIdArrendador/{idUsuario}")
    public ResponseEntity<JsonResponse<Long>> contarContratosComoArrendador(
            @PathVariable Long idUsuario) {

        try {
            return ResponseEntity.ok(
                    new JsonResponse<>(
                            true,
                            "Cantidad de contratos",
                            service.contarContratosComoArrendador(idUsuario),
                            200
                    )
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se pudo obtener el conteo", null, 404)
            );
        }
    }
    @GetMapping("/cantidadContratosPorIdArrendadatario/{idUsuario}")
    public ResponseEntity<JsonResponse<Long>> contarContratosComoArrendatario(
            @PathVariable Long idUsuario) {

        try {
            return ResponseEntity.ok(
                    new JsonResponse<>(
                            true,
                            "Cantidad de contratos",
                            service.contarContratosComoArrendatario(idUsuario),
                            200
                    )
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se pudo obtener el conteo", null, 404)
            );
        }
    }



    @GetMapping("/contarContratosPorMesPorIdArrendador/{idUsuario}")
    public ResponseEntity<JsonResponse<Map<YearMonth, Long>>> contarContratosPorMesComoArrendador(
            @PathVariable Long idUsuario) {

        try {
            return ResponseEntity.ok(
                    new JsonResponse<>(
                            true,
                            "Contratos por mes como arrendatario",
                            service.contarContratosPorMesComoArrendador(idUsuario),
                            200
                    )
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se pudieron obtener los datos", null, 404)
            );
        }
    }
    @GetMapping("/contratosPorMesPorIdArrendatario/{idUsuario}")
    public ResponseEntity<JsonResponse<Map<YearMonth, Long>>> contratosPorMesArrendatario(
            @PathVariable Long idUsuario) {

        try {
            return ResponseEntity.ok(
                    new JsonResponse<>(
                            true,
                            "Contratos por mes como arrendatario",
                            service.contarContratosPorMesComoArrendatario(idUsuario),
                            200
                    )
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se pudieron obtener los datos", null, 404)
            );
        }
    }


    @GetMapping("/calcularIngresoTotalPorIdArrendador/{idUsuario}")
    public ResponseEntity<JsonResponse<Double>> calcularIngresoTotalComoArrendador(
            @PathVariable Long idUsuario) {

        try {
            return ResponseEntity.ok(
                    new JsonResponse<>(
                            true,
                            "Ingreso total como arrendador",
                            service.calcularIngresoTotalComoArrendador(idUsuario),
                            200
                    )
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se pudo calcular el ingreso total", null, 404)
            );
        }
    }
    @GetMapping("/ingresoMensualPorIdArrendador/{idUsuario}")
    public ResponseEntity<JsonResponse<Double>> ingresoMensualArrendador(
            @PathVariable Long idUsuario) {

        try {
            return ResponseEntity.ok(
                    new JsonResponse<>(
                            true,
                            "Ingreso mensual como arrendador",
                            service.calcularIngresoComoArrendador(idUsuario),
                            200
                    )
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se pudo calcular el ingreso", null, 404)
            );
        }
    }

    @GetMapping("/ingresoPorMesPorIdArrendador/{idUsuario}")
    public ResponseEntity<JsonResponse<Map<YearMonth, Double>>> ingresoPorMesArrendador(
            @PathVariable Long idUsuario) {

        try {
            return ResponseEntity.ok(
                    new JsonResponse<>(
                            true,
                            "Ingresos por mes como arrendador",
                            service.calcularIngresoPorMesComoArrendador(idUsuario),
                            200
                    )
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se pudieron obtener los ingresos", null, 404)
            );
        }
    }


    @GetMapping("/contratosProximosAVencer")
    public ResponseEntity<JsonResponse<List<ContratoDto>>> findContratosProximosAVencer(
            @RequestParam Long idUsuario,
            @RequestParam int dias) {

        try {
            return ResponseEntity.ok(
                    new JsonResponse<>(
                            true,
                            "Contratos próximos a vencer",
                            service.findContratosProximosAVencer(idUsuario, dias),
                            200
                    )
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron contratos próximos a vencer", null, 404)
            );
        }
    }

}
