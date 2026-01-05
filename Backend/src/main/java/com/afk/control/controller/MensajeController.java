package com.afk.control.controller;

import com.afk.control.dto.MensajeDto;
import com.afk.control.service.MensajeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/mensajes")
@RequiredArgsConstructor
public class MensajeController {

    private final MensajeService mensajeService;

    @PostMapping("/crear")
    public ResponseEntity<MensajeDto> enviarMensaje(@RequestBody MensajeDto mensajeDto) {
        return new ResponseEntity<>(mensajeService.crearMensaje(mensajeDto), HttpStatus.CREATED);
    }

    @GetMapping("/obtenerHistorialDeChats/{chatId}")
    public ResponseEntity<List<MensajeDto>> obtenerHistorial(
            @PathVariable Long chatId,
            @RequestParam(defaultValue = "0") int pagina,
            @RequestParam(defaultValue = "20") int tamano) {
        return ResponseEntity.ok(mensajeService.obtenerMensajesPorChat(chatId, pagina, tamano));
    }

    @GetMapping("/obtenerMensajePorId/{id}")
    public ResponseEntity<MensajeDto> obtenerMensaje(@PathVariable Long id) {
        return ResponseEntity.ok(mensajeService.obtenerMensaje(id));
    }

    @PutMapping("/actualizar")
    public ResponseEntity<MensajeDto> actualizarMensaje(@RequestBody MensajeDto mensajeDto) {
        return ResponseEntity.ok(mensajeService.actualizarMensaje(mensajeDto));
    }

    @DeleteMapping("/eliminarPorId/{id}")
    public ResponseEntity<Void> eliminarMensaje(@PathVariable Long id) {
        mensajeService.eliminarMensaje(id);
        return ResponseEntity.noContent().build();
    }

    @PatchMapping("/marcarComoLeido/{chatId}/{usuarioId}")
    public ResponseEntity<Void> marcarComoLeidos(
            @PathVariable Long chatId,
            @PathVariable Long usuarioId) {
        mensajeService.marcarMensajesComoLeidos(chatId, usuarioId);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/contarNoLeidos/{chatId}/{usuarioId}")
    public ResponseEntity<Long> contarNoLeidos(
            @PathVariable Long chatId,
            @PathVariable Long usuarioId) {
        return ResponseEntity.ok(mensajeService.contarMensajesNoLeidos(chatId, usuarioId));
    }

    @GetMapping("/buscarDentroDelChat/{chatId}")
    public ResponseEntity<List<MensajeDto>> buscarEnChat(
            @PathVariable Long chatId,
            @RequestParam String consulta) {
        return ResponseEntity.ok(mensajeService.buscarContenidoEnChat(chatId, consulta));
    }
}