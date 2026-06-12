package com.afk.control.service.impl;
import com.afk.control.dto.MensajeDto;
import com.afk.control.mapper.MensajeMapper;
import com.afk.control.service.MensajeService;
import com.afk.model.entity.Mensaje;
import com.afk.model.entity.enums.EstadoChat;
import com.afk.model.repository.MensajeRepository;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Slf4j
@Service
@AllArgsConstructor
public class MensajeServiceImpl implements MensajeService {

    private final MensajeRepository repository;
    private final MensajeMapper mapper;

    @Override
    @Transactional
    public MensajeDto crearMensaje(MensajeDto mensajeDto) {
        if (mensajeDto == null) throw new IllegalArgumentException("El mensaje no puede ser nulo");
        Mensaje msj = mapper.toEntity(mensajeDto);
        msj.setFechaEnvio(LocalDateTime.now());
        msj.setEstado(EstadoChat.ENVIADO);
        return mapper.toDto(repository.save(msj));
    }

    @Override
    @Transactional
    public MensajeDto actualizarMensaje(MensajeDto mensajeDto) {
        if (mensajeDto == null) throw new IllegalArgumentException("El mensaje no puede ser nulo");
        Mensaje msjExisting = repository.findById(mensajeDto.id())
                .orElseThrow(() -> new IllegalArgumentException("El mensaje no existe"));
        msjExisting.setContenido(mensajeDto.contenido());
        return mapper.toDto(repository.save(msjExisting));
    }

    @Override
    @Transactional
    public void eliminarMensaje(Long id) {
        if (!repository.existsById(id)) {
            throw new IllegalArgumentException("El mensaje no existe");
        }
        repository.deleteById(id);
    }

    @Override
    public MensajeDto obtenerMensaje(Long id) {
        return repository.findById(id)
                .map(mapper::toDto)
                .orElseThrow(() -> new IllegalArgumentException("El mensaje no existe"));
    }

    @Override
    public List<MensajeDto> obtenerMensajesPorChat(Long chatId, int pagina, int tamaño) {
        log.info("Obteniendo mensajes por chat con paginación reversible");
        Pageable pageable = PageRequest.of(pagina, tamaño, Sort.by("fechaEnvio").descending());
        List<Mensaje> mensajes = repository.findByChatIdOrderByFechaEnvioDesc(chatId, pageable).getContent();
        List<Mensaje> listaRevertida = new ArrayList<>(mensajes);
        Collections.reverse(listaRevertida);
        return mapper.toDtoList(listaRevertida);
    }

    @Override
    @Transactional
    public void marcarMensajesComoLeidos(Long chatId, Long usuarioReceptorId) {
        repository.marcarComoLeidos(chatId, usuarioReceptorId, EstadoChat.LEIDO);
    }

    @Override
    public long contarMensajesNoLeidos(Long chatId, Long usuarioId) {
        return repository.countByChatIdAndEmisorIdNotAndEstadoNot(chatId, usuarioId, EstadoChat.LEIDO);
    }

    @Override
    public List<MensajeDto> buscarContenidoEnChat(Long chatId, String consulta) {
        return repository.findByChatIdAndContenidoContainingIgnoreCase(chatId, consulta)
                .stream()
                .map(mapper::toDto)
                .toList();
    }
}
