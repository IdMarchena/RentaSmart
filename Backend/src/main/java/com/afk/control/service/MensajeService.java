package com.afk.control.service;
import com.afk.control.dto.MensajeDto;

import java.util.List;

public interface MensajeService {
    MensajeDto crearMensaje(MensajeDto mensaje);
    MensajeDto actualizarMensaje(MensajeDto mensaje);
    void eliminarMensaje(Long id);
    MensajeDto obtenerMensaje(Long id);
    List<MensajeDto> obtenerMensajesPorChat(Long chatId, int pagina, int tamaño);
    void marcarMensajesComoLeidos(Long chatId, Long usuarioReceptorId);
    long contarMensajesNoLeidos(Long chatId, Long usuarioId);
    List<MensajeDto> buscarContenidoEnChat(Long chatId, String consulta);

}
