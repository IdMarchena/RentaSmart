package com.afk.control.controller;

import com.afk.control.dto.InmuebleDto;
import com.afk.control.service.InmuebleService;
import com.afk.model.entity.enums.EstadoInmueble;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/inmuebles")
@RequiredArgsConstructor
public class InmuebleController {

    private final InmuebleService inmuebleService;

    @PostMapping
    public ResponseEntity<InmuebleDto> createInmueble(@RequestBody InmuebleDto inmuebleDto) {
        InmuebleDto savedInmueble = inmuebleService.createInmueble(inmuebleDto);
        return ResponseEntity.ok(savedInmueble);
    }

    @GetMapping("/{id}")
    public ResponseEntity<InmuebleDto> getInmuebleById(@PathVariable Long id) {
        InmuebleDto inmuebleDto = inmuebleService.findInmuebleById(id);
        return ResponseEntity.ok(inmuebleDto);
    }

    @GetMapping
    public ResponseEntity<List<InmuebleDto>> getAllInmuebles() {
        List<InmuebleDto> inmuebleDtos = inmuebleService.findAllInmuebles();
        return ResponseEntity.ok(inmuebleDtos);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteInmuebleById(@PathVariable Long id) {
        inmuebleService.deleteInmuebleById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/ubicacion/{ubicacionId}")
    public ResponseEntity<List<InmuebleDto>> getInmueblesByUbicacion(@PathVariable Long ubicacionId) {
        List<InmuebleDto> inmuebleDtos = inmuebleService.findInmueblesByUbicacion(ubicacionId);
        return ResponseEntity.ok(inmuebleDtos);
    }

    @GetMapping("/estado/{estadoInmueble}")
    public ResponseEntity<List<InmuebleDto>> getInmueblesByEstado(@PathVariable EstadoInmueble estadoInmueble) {
        List<InmuebleDto> inmuebleDtos = inmuebleService.findInmueblesByEstado(estadoInmueble);
        return ResponseEntity.ok(inmuebleDtos);
    }

    @GetMapping("/ubicacion/{ubicacionId}/estado/{estadoInmueble}")
    public ResponseEntity<List<InmuebleDto>> getInmueblesByUbicacionAndEstado(@PathVariable Long ubicacionId, @PathVariable EstadoInmueble estadoInmueble) {
        List<InmuebleDto> inmuebleDtos = inmuebleService.findInmueblesByUbicacionAndEstado(ubicacionId, estadoInmueble);
        return ResponseEntity.ok(inmuebleDtos);
    }

    @GetMapping("/nombre/{nombre}/estrato/{estrato}")
    public ResponseEntity<List<InmuebleDto>> getInmueblesByNombreAndEstrato(@PathVariable String nombre, @PathVariable Integer estrato) {
        List<InmuebleDto> inmuebleDtos = inmuebleService.findInmueblesByNombreAndEstrato(nombre, estrato);
        return ResponseEntity.ok(inmuebleDtos);
    }

    @PutMapping("/{id}")
    public ResponseEntity<InmuebleDto> updateInmueble(@PathVariable Long id, @RequestBody InmuebleDto inmuebleDto) {
        InmuebleDto updatedInmueble = inmuebleService.updateInmueble(id, inmuebleDto);
        return ResponseEntity.ok(updatedInmueble);
    }

    @GetMapping("/nombre/{nombre}")
    public ResponseEntity<List<InmuebleDto>> getInmueblesByNombre(@PathVariable String nombre) {
        List<InmuebleDto> inmuebleDtos = inmuebleService.findInmueblesByNombre(nombre);
        return ResponseEntity.ok(inmuebleDtos);
    }

    @GetMapping("/estrato/{estrato}")
    public ResponseEntity<List<InmuebleDto>> getInmueblesByEstrato(@PathVariable Integer estrato) {
        List<InmuebleDto> inmuebleDtos = inmuebleService.findInmueblesByEstrato(estrato);
        return ResponseEntity.ok(inmuebleDtos);
    }
}
