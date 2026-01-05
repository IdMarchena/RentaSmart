package com.afk.control.controller;

import com.afk.control.dto.MultimediaDto;
import com.afk.control.service.MultimediaService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/multimedias")
@RequiredArgsConstructor
public class MultimediaController {

    private final MultimediaService multimediaService;

    @PostMapping
    public ResponseEntity<MultimediaDto> createMultimedia(@RequestBody MultimediaDto multimediaDto) {
        MultimediaDto savedMultimedia = multimediaService.createMultimedia(multimediaDto);
        return ResponseEntity.ok(savedMultimedia);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MultimediaDto> getMultimediaById(@PathVariable Long id) {
        MultimediaDto multimediaDto = multimediaService.findMultimediaById(id);
        return ResponseEntity.ok(multimediaDto);
    }

    @GetMapping
    public ResponseEntity<List<MultimediaDto>> getAllMultimedias() {
        List<MultimediaDto> multimediaDtos = multimediaService.findAllMultimedias();
        return ResponseEntity.ok(multimediaDtos);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMultimediaById(@PathVariable Long id) {
        multimediaService.deleteMultimediaById(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/publicacion/{publicacionId}")
    public ResponseEntity<List<MultimediaDto>> getMultimediasByPublicacion(@PathVariable Long publicacionId) {
        List<MultimediaDto> multimediaDtos = multimediaService.findMultimediasByPublicacion(publicacionId);
        return ResponseEntity.ok(multimediaDtos);
    }

    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<List<MultimediaDto>> getMultimediasByTipo(@PathVariable String tipo) {
        List<MultimediaDto> multimediaDtos = multimediaService.findMultimediasByTipo(tipo);
        return ResponseEntity.ok(multimediaDtos);
    }
    @PutMapping("/{id}")
    public ResponseEntity<MultimediaDto> updateMultimedia(@PathVariable Long id, @RequestBody MultimediaDto dto) {
        MultimediaDto actualizada = multimediaService.updateMultimedia(id, dto);
        return ResponseEntity.ok(actualizada);
    }

}
