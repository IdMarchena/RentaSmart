package com.afk.control.service.impl;
import com.afk.control.dto.ChattDto;
import com.afk.control.mapper.ChatMapper;
import com.afk.control.service.ChatService;
import com.afk.model.entity.Chat;
import com.afk.model.entity.enums.EstadoChat;
import com.afk.model.repository.ChatRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final ChatRepository chatRepository;
    private final ChatMapper mapper;

    @Override
    @Transactional
    public ChattDto crearChat(ChattDto chattDto) {
        if (chattDto == null) throw new IllegalArgumentException("El DTO no puede ser nulo");

        // 1. Validar si ya existe un chat entre estos dos usuarios (Pareja única)
        Optional<Chat> chatExistente = chatRepository.findByUsuarios(chattDto.idUsuarioA(), chattDto.idUsuarioB());

        if (chatExistente.isPresent()) {
            // En lugar de lanzar error, devolvemos el chat que ya existe (comportamiento estándar de chat)
            return mapper.toDto(chatExistente.get());
        }

        // 2. Si no existe, lo creamos
        Chat nuevoChat = mapper.toEntity(chattDto);
        nuevoChat.setFechaCreacion(LocalDateTime.now());
        nuevoChat.setEstado_chat(EstadoChat.ACTIVO);
        return mapper.toDto(chatRepository.save(nuevoChat));
    }

    @Override
    public void cambiarEstadoChat(Long id,String estado){
        EstadoChat e = switch (estado) {
            case "LEIDO" -> EstadoChat.LEIDO;
            case "NO_LEIDO" -> EstadoChat.NO_LEIDO;
            case "ENVIADO" -> EstadoChat.ENVIADO;
            case "ENTREGADO" -> EstadoChat.ENTREGADO;
            case "ACTIVO" -> EstadoChat.ACTIVO;
            case "INACTIVO" -> EstadoChat.INACTIVO;
            case "ARCHIVADO" -> EstadoChat.ARCHIVADO;
            case "BLOQUEADO" -> EstadoChat.BLOQUEADO;
            default -> throw new IllegalArgumentException("El estado '" + estado + "' no es valido");
        };
        Chat chat = chatRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("El id del chat no existe"));
        chat.setEstado_chat(e);
        chatRepository.save(chat);
    }

    @Override
    public List<ChattDto> listarChats(){
        List<Chat> chats = chatRepository.findAll();
        if(chats.isEmpty()) throw new IllegalArgumentException("El atributo 'chats' no existe");
        return mapper.toDtoList(chats);
    }

    @Override
    public ChattDto buscarChatPorId(Long id){
        Chat chat = chatRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("El id del chat no existe"));
        return mapper.toDto(chat);
    }

    @Override
    public ChattDto buscarChatPorNombre(String nombre) {
        Chat chat = chatRepository.findByNombre(nombre);
        if (chat == null) throw new NoSuchElementException("No se encontró un chat con el nombre: " + nombre);
        return mapper.toDto(chat);
    }

    @Override
    public void deleteChat(Long id) {
        if (!chatRepository.existsById(id)) {
            throw new RuntimeException("Chat no encontrado");
        }
        chatRepository.deleteById(id);
    }
}