package com.afk.control.controller;
import com.afk.control.dto.FavoritoDto;
import com.afk.control.service.FavoritoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.afk.control.dto.JsonResponse;
@RestController
@RequestMapping("/api/favoritos")
@RequiredArgsConstructor
public class FavoritoController {

    private final FavoritoService favoritoService;

    // ========================= CREATE =========================

    @PostMapping
    public ResponseEntity<JsonResponse<FavoritoDto>> createFavorito(
            @RequestBody FavoritoDto favoritoDto) {

        FavoritoDto created = favoritoService.createFavorito(favoritoDto);

        if (created == null) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se pudo crear el favorito", null, 404)
            );
        }

        return ResponseEntity.status(201).body(
                new JsonResponse<>(true, "Favorito creado exitosamente", created, 201)
        );
    }

    // ========================= READ =========================

    @GetMapping("/{id}")
    public ResponseEntity<JsonResponse<FavoritoDto>> getFavoritoById(@PathVariable Long id) {
        FavoritoDto favorito = favoritoService.findFavoritoById(id);

        if (favorito == null) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "Favorito no encontrado", null, 404)
            );
        }

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Favorito obtenido exitosamente", favorito, 200)
        );
    }

    @GetMapping
    public ResponseEntity<JsonResponse<List<FavoritoDto>>> getAllFavoritos() {
        List<FavoritoDto> favoritos = favoritoService.findAllFavoritos();

        if (favoritos.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron favoritos", null, 404)
            );
        }

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Favoritos listados exitosamente", favoritos, 200)
        );
    }

    @GetMapping("/usuario/{idUsuario}")
    public ResponseEntity<JsonResponse<List<FavoritoDto>>> getFavoritosByUsuario(
            @PathVariable Long idUsuario) {

        List<FavoritoDto> favoritos = favoritoService.findFavoritosByUsuario(idUsuario);

        if (favoritos.isEmpty()) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron favoritos para el usuario", null, 404)
            );
        }

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Favoritos del usuario obtenidos exitosamente", favoritos, 200)
        );
    }

    // ========================= DELETE =========================

    @DeleteMapping("/{id}")
    public ResponseEntity<JsonResponse<Void>> deleteFavorito(@PathVariable Long id) {
        try {
            favoritoService.deleteFavoritoById(id);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Favorito eliminado exitosamente", null, 200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se pudo eliminar el favorito", null, 404)
            );
        }
    }
}
