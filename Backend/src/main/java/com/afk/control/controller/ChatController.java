package com.afk.control.controller;
import com.afk.control.dto.ChattDto;
import com.afk.control.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/v1/chats")
@RequiredArgsConstructor
public class ChatController {

    private final ChatService chatService;

    @PostMapping("/crear")
    public ResponseEntity<ChattDto> crearChat(@RequestBody ChattDto chattDto) {
        return new ResponseEntity<>(chatService.crearChat(chattDto), HttpStatus.CREATED);
    }

    @GetMapping("/obtenerPorId/{id}")
    public ResponseEntity<ChattDto> obtenerChatPorId(@PathVariable Long id) {
        return ResponseEntity.ok(chatService.buscarChatPorId(id));
    }

    @GetMapping("/obtenerPorNombre/{nombre}")
    public ResponseEntity<ChattDto> obtenerChatPorNombre(@PathVariable String nombre) {
        return ResponseEntity.ok(chatService.buscarChatPorNombre(nombre));
    }

    @GetMapping("/listar")
    public ResponseEntity<List<ChattDto>> listarTodosLosChats() {
        return ResponseEntity.ok(chatService.listarChats());
    }

    @PatchMapping("/cambiarEstadoChat/{id}")
    public ResponseEntity<Void> cambiarEstado(@PathVariable Long id, @RequestParam String estado) {
        chatService.cambiarEstadoChat(id, estado);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/eliminarPorId/{id}")
    public ResponseEntity<Void> eliminarChat(@PathVariable Long id) {
        chatService.deleteChat(id);
        return ResponseEntity.noContent().build();
    }
}