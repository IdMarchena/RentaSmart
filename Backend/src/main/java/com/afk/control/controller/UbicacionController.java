package com.afk.control.controller;
import com.afk.client.external.dto.UbicacionDt;
import com.afk.control.service.impl.UbicacionServiceImpl;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import reactor.core.publisher.Mono;

@RestController
@RequestMapping("/api/ubicaciones")
public class UbicacionController {

    private final UbicacionServiceImpl ubicacionService;

    public UbicacionController(UbicacionServiceImpl ubicacionService) {
        this.ubicacionService = ubicacionService;
    }

    @GetMapping("/showMap")
    public String index(){
        return "index";
    }

    @GetMapping("/coordenadas")
    public Mono<ResponseEntity<UbicacionDt>> obtenerCoordenadas(@RequestParam String direccion) {
        return ubicacionService.obtenerCoordenadas(direccion)
                .map(ResponseEntity::ok)
                .defaultIfEmpty(ResponseEntity.notFound().build());
    }

    @GetMapping("/{id}")
    public Mono<UbicacionDt> obtenerUbicacion(@PathVariable Long id) {

        return ubicacionService.getUbicacion(id);
    }

    @GetMapping("/sincronizar/{id}")
    public Mono<ResponseEntity<String>> sincronizar(@PathVariable Long id) {
        return ubicacionService.sincronizarUbicacion(id)
                .thenReturn(ResponseEntity.ok("Ubicación sincronizada"));
    }
}
