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

    @PostMapping("/crear")
    public ResponseEntity<JsonResponse<FavoritoDto>> createFavorito(@RequestBody FavoritoDto favoritoDto) {
        FavoritoDto created = favoritoService.createFavorito(favoritoDto);
        if(created != null) {
            return ResponseEntity.ok(
                    new JsonResponse<>(true,"favorito creado exitosamente",created,200)
            );
        }else{
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false,"error al crear el favorito",null,404)
            );
        }
    }

    @GetMapping("/obtenerPorId/{id}")
    public ResponseEntity<JsonResponse<FavoritoDto>> getFavoritoById(@PathVariable Long id) {
        FavoritoDto favorito = favoritoService.findFavoritoById(id);
        if(favorito != null) {
            return ResponseEntity.ok(
                    new JsonResponse<>(true,"favorito creado exitosamente",favorito,200)
            );
        }else{
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false,"error al crear el favorito",null,404)
            );
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<JsonResponse<List<FavoritoDto>>> getAllFavoritos() {
        List<FavoritoDto> favoritos = favoritoService.findAllFavoritos();
        if(favoritos.isEmpty()) {
            return ResponseEntity.ok(
                    new JsonResponse<>(true,"favoritos listados exitosamente",favoritos,200)
            );
        }else{
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false,"error al listar los favoritos",null,404)
            );
        }
    }

    @DeleteMapping("/eliminarPorId/{id}")
    public ResponseEntity<JsonResponse<Void>> deleteFavorito(@PathVariable Long id) {
        try {
            favoritoService.deleteFavoritoById(id);
            return ResponseEntity.ok(
                    new JsonResponse<>(true,"favorito eliminado exitosamente",null,200)
            );
        }catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false,"error al eliminar el favorito",null,404)
            );
        }
    }

    @GetMapping("/obtenerFavoritoPorIdUsuario/{idUsuario}")
    public ResponseEntity<JsonResponse<List<FavoritoDto>>> getFavoritosByUsuario(@PathVariable Long idUsuario) {
        List<FavoritoDto> favoritos = favoritoService.findFavoritosByUsuario(idUsuario);
        if(favoritos.isEmpty()) {
            return ResponseEntity.ok(
                    new JsonResponse<>(true,"favoritos listados exitosamente por idUsuario",favoritos,200)
            );
        }else{
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false,"error al listar los favoritos por idUsuario",null,404)
            );
        }
    }

}
