package com.afk.control.controller;

import com.afk.control.dto.MensajeDto;
import com.afk.control.service.MensajeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.afk.control.dto.JsonResponse;

@RestController
@RequestMapping("/api/v1/mensajes")
@RequiredArgsConstructor
public class MensajeController {

    private final MensajeService mensajeService;

    // ========================= CREAR =========================

    @PostMapping
    public ResponseEntity<JsonResponse<MensajeDto>> enviarMensaje(
            @RequestBody MensajeDto mensajeDto) {

        MensajeDto creado = mensajeService.crearMensaje(mensajeDto);

        if (creado == null) {
            return ResponseEntity.status(404)
                    .body(new JsonResponse<>(false, "No se pudo enviar el mensaje", null, 404));
        }

        return ResponseEntity.status(201)
                .body(new JsonResponse<>(true, "Mensaje enviado", creado, 201));
    }

    // ========================= OBTENER =========================

    @GetMapping("/{id}")
    public ResponseEntity<JsonResponse<MensajeDto>> obtenerMensaje(@PathVariable Long id) {

        MensajeDto mensaje = mensajeService.obtenerMensaje(id);

        if (mensaje == null) {
            return ResponseEntity.status(404)
                    .body(new JsonResponse<>(false, "Mensaje no encontrado", null, 404));
        }

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Mensaje obtenido", mensaje, 200));
    }

    @GetMapping("/chat/{chatId}")
    public ResponseEntity<JsonResponse<List<MensajeDto>>> obtenerHistorial(
            @PathVariable Long chatId,
            @RequestParam(defaultValue = "0") int pagina,
            @RequestParam(defaultValue = "20") int tamano) {

        List<MensajeDto> mensajes =
                mensajeService.obtenerMensajesPorChat(chatId, pagina, tamano);

        if (mensajes.isEmpty()) {
            return ResponseEntity.status(404)
                    .body(new JsonResponse<>(false, "No hay mensajes en el chat", null, 404));
        }

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Historial de mensajes", mensajes, 200));
    }

    // ========================= ACTUALIZAR =========================

    @PutMapping("/{id}")
    public ResponseEntity<JsonResponse<MensajeDto>> actualizarMensaje(
            @PathVariable Long id,
            @RequestBody MensajeDto mensajeDto) {

        MensajeDto actualizado = mensajeService.actualizarMensaje(mensajeDto);

        if (actualizado == null) {
            return ResponseEntity.status(404)
                    .body(new JsonResponse<>(false, "No se pudo actualizar el mensaje", null, 404));
        }

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Mensaje actualizado", actualizado, 200));
    }

    // ========================= ELIMINAR =========================

    @DeleteMapping("/{id}")
    public ResponseEntity<JsonResponse<Void>> eliminarMensaje(@PathVariable Long id) {
        try {
            mensajeService.eliminarMensaje(id);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Mensaje eliminado", null, 200));
        } catch (Exception e) {
            return ResponseEntity.status(404)
                    .body(new JsonResponse<>(false, "No se pudo eliminar el mensaje", null, 404));
        }
    }

    // ========================= ESTADOS =========================

    @PatchMapping("/chat/{chatId}/leidos/{usuarioId}")
    public ResponseEntity<JsonResponse<Void>> marcarComoLeidos(
            @PathVariable Long chatId,
            @PathVariable Long usuarioId) {

        mensajeService.marcarMensajesComoLeidos(chatId, usuarioId);

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Mensajes marcados como leídos", null, 200));
    }

    @GetMapping("/chat/{chatId}/no-leidos/{usuarioId}")
    public ResponseEntity<JsonResponse<Long>> contarNoLeidos(
            @PathVariable Long chatId,
            @PathVariable Long usuarioId) {

        Long cantidad = mensajeService.contarMensajesNoLeidos(chatId, usuarioId);

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Mensajes no leídos", cantidad, 200));
    }

    // ========================= BUSCAR =========================

    @GetMapping("/chat/{chatId}/buscar")
    public ResponseEntity<JsonResponse<List<MensajeDto>>> buscarEnChat(
            @PathVariable Long chatId,
            @RequestParam String consulta) {

        List<MensajeDto> resultados =
                mensajeService.buscarContenidoEnChat(chatId, consulta);

        if (resultados.isEmpty()) {
            return ResponseEntity.status(404)
                    .body(new JsonResponse<>(false, "No se encontraron mensajes", null, 404));
        }

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Mensajes encontrados", resultados, 200));
    }
}