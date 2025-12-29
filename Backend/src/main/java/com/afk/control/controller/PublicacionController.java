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

    @PostMapping("/crear")
    public ResponseEntity<JsonResponse<PublicacionDto>> crearPublicacion(PublicacionDto publicacionDto){
        PublicacionDto publicacion = publicacionService.crearPublicacion(publicacionDto);
        if(publicacion == null){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "publicacion no se pudo crear", null, 404)
            );
        }else{
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "publicacion creada exitosamente", publicacion, 201)
            );
        }
    }

    @PutMapping("/actualizarPorId/{id}")
    public ResponseEntity<JsonResponse<PublicacionDto>> actualizarPublicacion(@PathVariable Long id, @RequestBody PublicacionDto publicacionDto){
        PublicacionDto publicacion = publicacionService.actualizarPublicacion(id, publicacionDto);
        if(publicacion == null){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "publicacion no se pudo actualizar", null, 404)
            );
        }else{
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "publicacion actualizada exitosamente", publicacion, 201)
            );
        }
    }

    @PutMapping("/eliminarPorId/{id}")
    public ResponseEntity<JsonResponse<Void>> eliminarPublicacion(@PathVariable Long id){
        try{
            publicacionService.eliminarPublicacion(id);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "publicacion eliminada exitosamente", null, 200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "publicacion no se pudo eliminar", null, 404)
            );
        }
    }

    @GetMapping("/listar")
    public ResponseEntity<JsonResponse<List<PublicacionDto>>> obtenerTodasLasPublicaciones(){
        List<PublicacionDto> publicaciones = publicacionService.obtenerTodasLasPublicaciones();
        if(publicaciones.isEmpty()){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "publicacion no se pudo actualizar", null, 404)
            );
        }else{
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "publicacion actualizada exitosamente", publicaciones, 200)
            );
        }
    }

    @GetMapping("/obtenerPorId/{id}")
    public ResponseEntity<JsonResponse<PublicacionDto>> obtenerPublicacionPorId(@PathVariable Long id){
        PublicacionDto publicacion = publicacionService.obtenerPublicacionPorId(id);
        if(publicacion == null){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "publicacion no se pudo encontrar por id", null, 404)
            );
        }else{
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "publicacion encontrara por id exitosamente", publicacion, 200)
            );
        }
    }

    @GetMapping("/listarPorEstado")
    public ResponseEntity<JsonResponse<List<PublicacionDto>>>  listarPublicacionesPorEstado(@RequestParam String estado){
        List<PublicacionDto> publicaciones = publicacionService.listarPublicacionesPorEstado(estado);
        if(publicaciones.isEmpty()){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "publicacion no se pudo encontrar por estado", null, 404)
            );
        }else{
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "publicacion encontrada exitosamente por estado", publicaciones, 200)
            );
        }
    }

    @GetMapping("/listarPorTItulo")
    public ResponseEntity<JsonResponse<List<PublicacionDto>>>  listarPublicacionesPorTitulo(@RequestParam String titulo){
        List<PublicacionDto> publicaciones = publicacionService.listarPublicacionesPorTitulo(titulo);
        if(publicaciones.isEmpty()){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "publicacion no se pudo encontrar por titulo", null, 404)
            );
        }else{
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "publicacion encontrada exitosamente por titulo", publicaciones, 200)
            );
        }
    }
    @GetMapping("/listarPorPrecioMenor")
    public ResponseEntity<JsonResponse<List<PublicacionDto>>> listarPublicacionesPorPrecioMenor(@RequestParam Double precioMenor){
        List<PublicacionDto> publicaciones = publicacionService.listarPublicacionesPorPrecioMenor(precioMenor);
        if(publicaciones.isEmpty()){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "publicaciones no se pudo encontrar por precio menor", null, 404)
            );
        }else{
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "publicaciones encontradas exitosamente por precio menor", publicaciones, 200)
            );
        }
    }

    @GetMapping("/listarPublicacionesPorPrecioEntreMenorYMayor")
    public ResponseEntity<JsonResponse<List<PublicacionDto>>> listarPublicacionesPorPrecioEntreMenorYMayor(@RequestParam Double precioMenor,
                                                                                                           @RequestParam Double precioMayor){
        List<PublicacionDto> publicaciones = publicacionService.listarPublicacionesPorPrecioEntreMenorYMayor(precioMenor, precioMayor);
        if(publicaciones.isEmpty()){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "publicaciones no se pudieron encontrar por intervalo de precio", null, 404)
            );
        }else{
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "publicaciones encontradas exitosamente por precio intervalo", publicaciones, 200)
            );
        }
    }

    @GetMapping("/listarPublicacionesPorNombreInmueble")
    public ResponseEntity<JsonResponse<List<PublicacionDto>>> listarPublicacionesPorNombreInmueble(@RequestParam String nombreInmueble){
        List<PublicacionDto> publicaciones = publicacionService.listarPublicacionesPorNombreInmueble(nombreInmueble);
        if(publicaciones.isEmpty()){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "publicaciones no se pudieron encontrar por nombre inmueble", null, 404)
            );
        }else{
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "publicaciones encontradas exitosamente por nombre inmueble", publicaciones, 200)
            );
        }
    }

    @GetMapping("/listarPublicacionesPorNombreInmueble")
    public ResponseEntity<JsonResponse<List<PublicacionDto>>> listarPublicacionesPorUbicacionInmueble(@RequestParam String ubicaciion){
        List<PublicacionDto> publicaciones = publicacionService.listarPublicacionesPorUbicacionInmueble(ubicaciion);
        if(publicaciones.isEmpty()){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "publicaciones no se pudieron encontrar por nombre de ubicacion", null, 404)
            );
        }else{
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "publicaciones encontradas exitosamente por nombre de ubicacion", publicaciones, 200)
            );
        }
    }

    @GetMapping("/listarPublicacionesPorEstratoInmueble")
    public ResponseEntity<JsonResponse<List<PublicacionDto>>> listarPublicacionesPorEstratoInmueble(@RequestParam String estratoInmueble){
        List<PublicacionDto> publicaciones = publicacionService.listarPublicacionesPorEstratoInmueble(estratoInmueble);
        if(publicaciones.isEmpty()){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "publicaciones no se pudieron encontrar por estrato inmueble", null, 404)
            );
        }else{
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "publicaciones encontradas exitosamente por estrato inmueble", publicaciones, 200)
            );
        }
    }

    @GetMapping("/listarPublicacionesPorEstratoInmueble/{ubicacionId}")
    public ResponseEntity<JsonResponse<List<PublicacionDto>>> ListarPublicacionesByUbicacionAndEstado(@PathVariable Long ubicacionId,
                                                                                                      @RequestParam String estado){
        List<PublicacionDto> publicaciones = publicacionService.ListarPublicacionesByUbicacionAndEstado(ubicacionId,estado);
        if(publicaciones.isEmpty()){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "publicaciones no se pudieron encontrar por idUbicacion y estado", null, 404)
            );
        }else{
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "publicaciones encontradas exitosamente por idUbicacion y estado", publicaciones, 200)
            );
        }
    }

    @GetMapping("/ListarPublicacionesByNombreAndEstrato")
    public ResponseEntity<JsonResponse<List<PublicacionDto>>> ListarPublicacionesByNombreAndEstrato(@RequestParam String nombre,
                                                                                                    @RequestParam Integer estrato){
        List<PublicacionDto> publicaciones = publicacionService.ListarPublicacionesByNombreAndEstrato(nombre,estrato);
        if(publicaciones.isEmpty()){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "publicaciones no se pudieron encontrar por nombre y estrato", null, 404)
            );
        }else{
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "publicaciones encontradas exitosamente por nombre y estrato", publicaciones, 200)
            );
        }
    }

    @GetMapping("/finInmueblesByIdArrendatario/{idArrendario}")
    public ResponseEntity<JsonResponse<List<PublicacionDto>>> finInmueblesByIdArrendatario(@PathVariable Long idArrendario){
        List<PublicacionDto> publicaciones = publicacionService.finInmueblesByIdArrendatario(idArrendario);
        if(publicaciones.isEmpty()){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "publicaciones no se pudieron encontrar por id arrendatario", null, 404)
            );
        }else{
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "publicaciones encontradas exitosamente por id arrendatario", publicaciones, 200)
            );
        }
    }

    @PutMapping("/cambiarEstadoPublicacionPorId/{id}")
    public ResponseEntity<JsonResponse<Void>> cambiarEstadoPublicacion(@PathVariable Long id,
                                                                       @RequestParam String estado){
        try{
            publicacionService.cambiarEstadoPublicacion(id, estado);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "cambio de estado de la publicacion exitosamente", null, 200)
            );
        } catch (Exception e) {
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "error al cambiar el estado de la publicacion", null, 404)
            );
        }
    }

    @GetMapping("/ListarPublicacionesByNombreAndEstrato/{idUsuario}")
    public ResponseEntity<JsonResponse<List<PublicacionDto>>> ListarPublicacionesByNombreAndEstrato(@PathVariable Long idUsuario){
        List<PublicacionDto> publicaciones = publicacionService.listarPublicacionesByIdArrendador(idUsuario);
        if(publicaciones.isEmpty()){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "publicaciones no se pudieron encontrar por el usuario", null, 404)
            );
        }else{
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "publicaciones encontradas exitosamente por el usuario", publicaciones, 200)
            );
        }
    }

    @GetMapping("/listarPorPrecioMayor")
    public ResponseEntity<JsonResponse<List<PublicacionDto>>> listarPorPrecioMayor(@RequestParam Double precioMayor){
        List<PublicacionDto> publicaciones = publicacionService.listarPublicacionesPorPrecioMayor(precioMayor);
        if(publicaciones.isEmpty()){
            return ResponseEntity.status(404).body(
                    new JsonResponse<>(false, "publicaciones no se pudo encontrar por precio menor", null, 404)
            );
        }else{
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "publicaciones encontradas exitosamente por precio menor", publicaciones, 200)
            );
        }
    }

}
