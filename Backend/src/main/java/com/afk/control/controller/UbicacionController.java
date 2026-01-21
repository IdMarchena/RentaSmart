package com.afk.control.controller;
import com.afk.client.external.dto.UbicacionDt;
import com.afk.control.dto.JsonResponse;
import com.afk.control.service.UbicacionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;


@RestController
@RequestMapping("/api/ubicaciones")
public class UbicacionController {

    private final UbicacionService ubicacionService;

    public UbicacionController(UbicacionService ubicacionService) {
        this.ubicacionService = ubicacionService;
    }

    @GetMapping("/showMap")
    public String index(){
        return "index";
    }

    @PostMapping
    public Mono<ResponseEntity<JsonResponse<UbicacionDt>>> crearUbicacion(@RequestBody UbicacionDt dto) {
        return ubicacionService.crearUbicacion(dto)
                .map(guardada -> ResponseEntity.ok(
                        new JsonResponse<>(true, "Ubicación creada exitosamente", guardada, 201)
                ))
                .onErrorResume(e -> Mono.just(ResponseEntity.status(500).body(
                        new JsonResponse<>(false, "Error al crear ubicación: " + e.getMessage(), null, 500)
                )));
    }

    @GetMapping("/coordenadas")
    public Mono<ResponseEntity<JsonResponse<UbicacionDt>>> obtenerCoordenadas(@RequestParam String direccion) {
        return ubicacionService.obtenerCoordenadas(direccion)
                .map(ubicacion -> ResponseEntity.ok(
                        new JsonResponse<>(true, "Coordenadas obtenidas correctamente", ubicacion, 200)
                ))
                .defaultIfEmpty(ResponseEntity.status(404).body(
                        new JsonResponse<>(false, "No se pudieron obtener coordenadas para esa dirección", null, 404)
                ));
    }

    @GetMapping("/{id}")
    public Mono<ResponseEntity<JsonResponse<UbicacionDt>>> obtenerUbicacion(@PathVariable Long id) {
        return ubicacionService.getUbicacion(id)
                .map(dto -> {
                    // Forzamos el formato que tu BackendUbicacionRepository espera
                    return ResponseEntity.ok(new JsonResponse<>(true, "Ubicación encontrada", dto, 200));
                })
                .defaultIfEmpty(ResponseEntity.status(404).body(
                        new JsonResponse<>(false, "No encontrada", null, 404)
                ));
    }

    @GetMapping("/sincronizar/{id}")
    public Mono<ResponseEntity<JsonResponse<Void>>> sincronizar(@PathVariable Long id) {
        return ubicacionService.sincronizarUbicacion(id)
                .then(Mono.just(ResponseEntity.ok(
                        new JsonResponse<Void>(true, "Ubicación sincronizada con éxito", null, 200)
                )))
                .onErrorResume(e -> Mono.just(ResponseEntity.status(500).body(
                        new JsonResponse<Void>(false, "Error al sincronizar: " + e.getMessage(), null, 500)
                )));
    }
}
