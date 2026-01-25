package com.afk.control.controller;

import com.afk.control.dto.ChattDto;
import com.afk.control.dto.JsonResponse;
import com.afk.control.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/chats")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @PostMapping
    public ResponseEntity<JsonResponse<ChattDto>> crearChat(@RequestBody ChattDto chattDto) {
        ChattDto creado = chatService.crearChat(chattDto);

        if (creado == null) {
            return ResponseEntity.status(404)
                    .body(new JsonResponse<>(false, "No se pudo crear el chat", null, 404));
        }

        return ResponseEntity.status(201)
                .body(new JsonResponse<>(true, "Chat creado exitosamente", creado, 201));
    }


    @GetMapping("/{id}")
    public ResponseEntity<JsonResponse<ChattDto>> obtenerChatPorId(@PathVariable Long id) {
        ChattDto chat = chatService.buscarChatPorId(id);

        if (chat == null) {
            return ResponseEntity.status(404)
                    .body(new JsonResponse<>(false, "Chat no encontrado", null, 404));
        }

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Chat encontrado", chat, 200));
    }

    @GetMapping("/nombre/{nombre}")
    public ResponseEntity<JsonResponse<ChattDto>> obtenerChatPorNombre(@PathVariable String nombre) {
        ChattDto chat = chatService.buscarChatPorNombre(nombre);

        if (chat == null) {
            return ResponseEntity.status(404)
                    .body(new JsonResponse<>(false, "Chat con ese nombre no encontrado", null, 404));
        }

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Chat encontrado", chat, 200));
    }

    @GetMapping
    public ResponseEntity<JsonResponse<List<ChattDto>>> listarTodosLosChats() {
        List<ChattDto> chats = chatService.listarChats();

        if (chats.isEmpty()) {
            return ResponseEntity.status(404)
                    .body(new JsonResponse<>(false, "No hay chats disponibles", null, 404));
        }

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Lista de chats", chats, 200));
    }
    @GetMapping("/user/{id}")
    public ResponseEntity<JsonResponse<List<ChattDto>>> findAllChatsByIdUser(@PathVariable Long id) {
        List<ChattDto> chats = chatService.findAllChatsByIdUser(id);
        if (chats.isEmpty()) {
            return ResponseEntity.status(404)
                    .body(new JsonResponse<>(false, "No hay chats disponibles", null, 404));
        }

        return ResponseEntity.ok(
                new JsonResponse<>(true, "Lista de chats", chats, 200));
    }


    @PatchMapping("/{id}")
    public ResponseEntity<JsonResponse<Void>> cambiarEstado(@PathVariable Long id, @RequestParam String estado) {
        try {
            chatService.cambiarEstadoChat(id, estado);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Estado del chat actualizado", null, 200));
        } catch (Exception e) {
            return ResponseEntity.status(404)
                    .body(new JsonResponse<>(false, "No se pudo actualizar el estado del chat", null, 404));
        }
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<JsonResponse<Void>> eliminarChat(@PathVariable Long id) {
        try {
            chatService.deleteChat(id);
            return ResponseEntity.ok(
                    new JsonResponse<>(true, "Chat eliminado exitosamente", null, 200));
        } catch (Exception e) {
            return ResponseEntity.status(404)
                    .body(new JsonResponse<>(false, "No se pudo eliminar el chat", null, 404));
        }
    }
}
