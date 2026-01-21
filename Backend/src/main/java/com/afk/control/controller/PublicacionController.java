package com.afk.control.controller;

import com.afk.control.dto.PublicacionDto;
import com.afk.control.service.PublicacionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.afk.control.dto.JsonResponse;

import java.util.List;

@RestController
@RequestMapping("/api/publicaciones")
@RequiredArgsConstructor
public class PublicacionController {

    private final PublicacionService publicacionService;

    // ===================== CREAR / ACTUALIZAR / ELIMINAR =====================
    @PostMapping
    public ResponseEntity<JsonResponse<PublicacionDto>> crearPublicacion(@RequestBody PublicacionDto publicacionDto){
        PublicacionDto publicacion = publicacionService.crearPublicacion(publicacionDto);
        if(publicacion == null){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "La publicación no se pudo crear", null, 404)
            );
        }
        return ResponseEntity.status(201).body(
                new JsonResponse<>(true, "Publicación creada exitosamente", publicacion, 201)
        );
    }

    @PutMapping("/{id}")
    public ResponseEntity<JsonResponse<PublicacionDto>> actualizarPublicacion(
            @PathVariable Long id,
            @RequestBody PublicacionDto publicacionDto){
        PublicacionDto publicacion = publicacionService.actualizarPublicacion(id, publicacionDto);
        if(publicacion == null){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "La publicación no se pudo actualizar", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Publicación actualizada exitosamente", publicacion, 200)
        );
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<JsonResponse<Void>> eliminarPublicacion(@PathVariable Long id){
        try {
            publicacionService.eliminarPublicacion(id);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Publicación eliminada exitosamente", null, 200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "La publicación no se pudo eliminar", null, 404)
            );
        }
    }

    // ===================== OBTENER PUBLICACIONES =====================
    @GetMapping("/id/{id}")
    public ResponseEntity<JsonResponse<PublicacionDto>> obtenerPublicacionPorId(@PathVariable Long id){
        PublicacionDto publicacion = publicacionService.obtenerPublicacionPorId(id);
        if(publicacion == null){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "Publicación no encontrada por id", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Publicación encontrada exitosamente por id", publicacion, 200)
        );
    }

    @GetMapping
    public ResponseEntity<JsonResponse<List<PublicacionDto>>> obtenerTodasLasPublicaciones(){
        List<PublicacionDto> publicaciones = publicacionService.obtenerTodasLasPublicaciones();
        if(publicaciones.isEmpty()){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron publicaciones", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Publicaciones obtenidas exitosamente", publicaciones, 200)
        );
    }

    // ===================== FILTROS POR ESTADO, TITULO, PRECIO =====================
    @GetMapping("/estado")
    public ResponseEntity<JsonResponse<List<PublicacionDto>>> listarPublicacionesPorEstado(@RequestParam String estado){
        List<PublicacionDto> publicaciones = publicacionService.listarPublicacionesPorEstado(estado);
        if(publicaciones.isEmpty()){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron publicaciones por estado", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Publicaciones encontradas por estado exitosamente", publicaciones, 200)
        );
    }

    @GetMapping("/titulo")
    public ResponseEntity<JsonResponse<List<PublicacionDto>>> listarPublicacionesPorTitulo(@RequestParam String titulo){
        List<PublicacionDto> publicaciones = publicacionService.listarPublicacionesPorTitulo(titulo);
        if(publicaciones.isEmpty()){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron publicaciones por título", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Publicaciones encontradas por título exitosamente", publicaciones, 200)
        );
    }

    @GetMapping("/precio/menor")
    public ResponseEntity<JsonResponse<List<PublicacionDto>>> listarPublicacionesPorPrecioMenor(@RequestParam Double precio){
        List<PublicacionDto> publicaciones = publicacionService.listarPublicacionesPorPrecioMenor(precio);
        if(publicaciones.isEmpty()){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron publicaciones por precio menor", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Publicaciones encontradas por precio menor exitosamente", publicaciones, 200)
        );
    }

    @GetMapping("/precio/mayor")
    public ResponseEntity<JsonResponse<List<PublicacionDto>>> listarPublicacionesPorPrecioMayor(@RequestParam Double precio){
        List<PublicacionDto> publicaciones = publicacionService.listarPublicacionesPorPrecioMayor(precio);
        if(publicaciones.isEmpty()){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron publicaciones por precio mayor", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Publicaciones encontradas por precio mayor exitosamente", publicaciones, 200)
        );
    }

    @GetMapping("/precio/rango")
    public ResponseEntity<JsonResponse<List<PublicacionDto>>> listarPublicacionesPorPrecioEntre(
            @RequestParam Double precioMin,
            @RequestParam Double precioMax){
        List<PublicacionDto> publicaciones = publicacionService.listarPublicacionesPorPrecioEntreMenorYMayor(precioMin, precioMax);
        if(publicaciones.isEmpty()){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron publicaciones en el rango de precio", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Publicaciones encontradas por rango de precio exitosamente", publicaciones, 200)
        );
    }

    // ===================== FILTROS POR INMUEBLE =====================
    @GetMapping("/nombreInmueble")
    public ResponseEntity<JsonResponse<List<PublicacionDto>>> listarPorNombreInmueble(@RequestParam String nombre){
        List<PublicacionDto> publicaciones = publicacionService.listarPublicacionesPorNombreInmueble(nombre);
        if(publicaciones.isEmpty()){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron publicaciones por nombre de inmueble", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Publicaciones encontradas por nombre de inmueble exitosamente", publicaciones, 200)
        );
    }

    @GetMapping("/ubicacion")
    public ResponseEntity<JsonResponse<List<PublicacionDto>>> listarPorUbicacionInmueble(@RequestParam String ubicacion){
        List<PublicacionDto> publicaciones = publicacionService.listarPublicacionesPorUbicacionInmueble(ubicacion);
        if(publicaciones.isEmpty()){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron publicaciones por ubicación de inmueble", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Publicaciones encontradas por ubicación de inmueble exitosamente", publicaciones, 200)
        );
    }

    @GetMapping("/estratoInmueble")
    public ResponseEntity<JsonResponse<List<PublicacionDto>>> listarPorEstratoInmueble(@RequestParam String estrato){
        List<PublicacionDto> publicaciones = publicacionService.listarPublicacionesPorEstratoInmueble(estrato);
        if(publicaciones.isEmpty()){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron publicaciones por estrato de inmueble", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Publicaciones encontradas por estrato de inmueble exitosamente", publicaciones, 200)
        );
    }

    @GetMapping("/ubicacion/{ubicacionId}/estado")
    public ResponseEntity<JsonResponse<List<PublicacionDto>>> listarPorUbicacionYEstado(
            @PathVariable Long ubicacionId,
            @RequestParam String estado){
        List<PublicacionDto> publicaciones = publicacionService.ListarPublicacionesByUbicacionAndEstado(ubicacionId, estado);
        if(publicaciones.isEmpty()){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron publicaciones por ubicación y estado", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Publicaciones encontradas por ubicación y estado exitosamente", publicaciones, 200)
        );
    }

    @GetMapping("/top6")
    public ResponseEntity<JsonResponse<List<PublicacionDto>>> obtenerTop6Publicaciones(){
        List<PublicacionDto> publicaciones = publicacionService.obtenerTop6Publicaciones();
        if(publicaciones.isEmpty()){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron publicaciones", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Top 6 publicaciones obtenidas exitosamente", publicaciones, 200)
        );
    }

    @GetMapping("/nombre_estrato")
    public ResponseEntity<JsonResponse<List<PublicacionDto>>> listarPorNombreYEstrato(
            @RequestParam String nombre,
            @RequestParam Integer estrato){
        List<PublicacionDto> publicaciones = publicacionService.ListarPublicacionesByNombreAndEstrato(nombre, estrato);
        if(publicaciones.isEmpty()){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron publicaciones por nombre y estrato", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Publicaciones encontradas por nombre y estrato exitosamente", publicaciones, 200)
        );
    }

    // ===================== FILTROS POR ARRENDATARIO / USUARIO =====================
    @GetMapping("/arrendatario/{id}")
    public ResponseEntity<JsonResponse<List<PublicacionDto>>> listarPorIdArrendatario(@PathVariable Long id){
        List<PublicacionDto> publicaciones = publicacionService.finInmueblesByIdArrendatario(id);
        if(publicaciones.isEmpty()){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron publicaciones por arrendatario", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Publicaciones encontradas por arrendatario exitosamente", publicaciones, 200)
        );
    }

    @GetMapping("/usuario/{id}")
    public ResponseEntity<JsonResponse<List<PublicacionDto>>> listarPorIdUsuario(@PathVariable Long id){
        List<PublicacionDto> publicaciones = publicacionService.listarPublicacionesByIdArrendador(id);
        if(publicaciones.isEmpty()){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "No se encontraron publicaciones por usuario", null, 404)
            );
        }
        return ResponseEntity.ok(
                new JsonResponse<>(true, "Publicaciones encontradas por usuario exitosamente", publicaciones, 200)
        );
    }

    // ===================== CAMBIO DE ESTADO =====================
    @PutMapping("/{id}/estado")
    public ResponseEntity<JsonResponse<Void>> cambiarEstadoPublicacion(
            @PathVariable Long id,
            @RequestParam String estado){
        try{
            publicacionService.cambiarEstadoPublicacion(id, estado);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Cambio de estado de la publicación exitosamente", null, 200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "Error al cambiar el estado de la publicación", null, 404)
            );
        }
    }

}