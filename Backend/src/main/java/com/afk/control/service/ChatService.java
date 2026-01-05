package com.afk.control.service;
import com.afk.control.dto.ChattDto;

import java.util.List;

public interface ChatService {
    ChattDto crearChat(ChattDto chattDto);
    void cambiarEstadoChat(Long id,String estado);
    List<ChattDto> listarChats();
    ChattDto buscarChatPorId(Long id);
    ChattDto buscarChatPorNombre(String nombre);
    void deleteChat(Long id);

}
