package com.afk.control.service.impl;

import com.afk.control.dto.FavoritoDto;
import com.afk.control.mapper.FavoritoMapper;
import com.afk.control.service.FavoritoService;
import com.afk.client.external.dto.ChatRequest;
import com.afk.control.service.ChatService;
import com.afk.model.entity.Favorito;
import com.afk.model.entity.Inmueble;
import com.afk.model.entity.Usuario;
import com.afk.model.entity.enums.EstadoChat;
import com.afk.model.repository.FavoritoRepository;
import com.afk.model.repository.InmuebleRepository;
import com.afk.model.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class FavoritoServiceImpl implements FavoritoService {

    private final FavoritoRepository favoritoRepository;
    private final InmuebleRepository inmuebleRepository;
    private final UsuarioRepository usuarioRepository;
    private final ChatService chatService;
    private final FavoritoMapper favoritoMapper;

    @Override
    @Transactional
    public FavoritoDto createFavorito(FavoritoDto dto) {
        Favorito favorito = favoritoMapper.toEntity(dto);
        Favorito savedFavorito = favoritoRepository.save(favorito);

        checkForMutualMatch(dto.idUsuario(), favorito.getPublicacion().getInmueble().getId());

        return favoritoMapper.toDto(savedFavorito);
    }

    private void checkForMutualMatch(Long idUsuario, Long idInmueble) {
        Inmueble inmueble = inmuebleRepository.findById(idInmueble)
                .orElseThrow(() -> new RuntimeException("Inmueble no encontrado"));

        Usuario propietarioInmueble = usuarioRepository.findById(inmueble.getServicio().getUsuario().getId())
                .orElseThrow(() -> new RuntimeException("Propietario del inmueble no encontrado"));

        boolean isMatch = favoritoRepository.existsMutualMatch(
                propietarioInmueble.getId(),
                idInmueble
        );

        if (isMatch) {
            boolean yaExisteChat = !chatService
                    .getChatsBetweenUsers(idUsuario, propietarioInmueble.getId())
                    .isEmpty();

            if (!yaExisteChat) {
                ChatRequest chatRequest = new ChatRequest(
                        idUsuario,
                        propietarioInmueble.getId(),
                        "¡Match realizado! Pueden comenzar a conversar.",
                        EstadoChat.ACTIVO
                );

                chatService.createChat(chatRequest);
                notifyMatch(idUsuario, propietarioInmueble.getId());
            }
        }
    }

    private void notifyMatch(Long idUsuario1, Long idUsuario2) {
        System.out.println("Notificando a usuarios " + idUsuario1 + " y " + idUsuario2 + " sobre su match");
    }

    @Override
    public List<FavoritoDto> findMutualMatches(Long idUsuario) {
        List<Favorito> favoritosUsuario = favoritoRepository.findByUsuarioId(idUsuario);

        return favoritosUsuario.stream()
                .filter(favorito -> {
                    Long idInmueble = favorito.getPublicacion().getInmueble().getId();
                    return favoritoRepository.existsMutualMatch(
                            favorito.getPublicacion().getInmueble().getServicio().getUsuario().getId(),
                            idInmueble
                    );
                })
                .map(favoritoMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public FavoritoDto findFavoritoById(Long id) {
        Favorito favorito = favoritoRepository.findById(id).orElseThrow(() ->
                new NoSuchElementException("Favorito con ID " + id + " no encontrado"));
        return favoritoMapper.toDto(favorito);
    }

    @Override
    public List<FavoritoDto> findAllFavoritos() {
        List<Favorito> favoritos = favoritoRepository.findAll();
        return favoritos.stream().map(favoritoMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public void deleteFavoritoById(Long id) {
        if (!favoritoRepository.existsById(id)) {
            throw new NoSuchElementException("Favorito con ID " + id + " no encontrado");
        }
        favoritoRepository.deleteById(id);
    }

    @Override
    public List<FavoritoDto> findFavoritosByUsuario(Long idUsuario) {
        List<Favorito> favoritos = favoritoRepository.findByUsuarioId(idUsuario);
        return favoritos.stream().map(favoritoMapper::toDto).collect(Collectors.toList());
    }
}
