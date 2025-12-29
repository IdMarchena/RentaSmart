package com.afk.control.service.impl;
import com.afk.control.dto.FavoritoDto;
import com.afk.control.mapper.FavoritoMapper;
import com.afk.control.service.FavoritoService;
import com.afk.model.entity.Favorito;
import com.afk.model.repository.FavoritoRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
@Service
@RequiredArgsConstructor
public class FavoritoServiceImpl implements FavoritoService {

    private final FavoritoRepository favoritoRepository;
    private final FavoritoMapper favoritoMapper;

    @Override
    @Transactional
    public FavoritoDto createFavorito(FavoritoDto dto) {
        if(dto==null) throw new NoSuchElementException("no hay favorito");
        boolean existeMatch=favoritoRepository.existsByUsuarioIdAndPublicacionId(dto.idUsuario(), dto.idPublicacion());
        if(existeMatch)throw new RuntimeException("ya existe un favorito por parte de este usuario a esa publicacion");
        Favorito favorito = favoritoMapper.toEntity(dto);
        favorito.setFecha(LocalDateTime.now());
        Favorito savedFavorito = favoritoRepository.save(favorito);
        return favoritoMapper.toDto(savedFavorito);
    }

    @Override
    public FavoritoDto findFavoritoById(Long id) {
        if(id<0 || id==null) throw new NoSuchElementException("id no puede ser negativo o nulo");
        Favorito favorito = favoritoRepository.findById(id).orElseThrow(() ->
                new NoSuchElementException("Favorito con ID " + id + " no encontrado"));
        return favoritoMapper.toDto(favorito);
    }

    @Override
    public List<FavoritoDto> findAllFavoritos() {
        List<Favorito> favoritos = favoritoRepository.findAll();
        if(favoritos.isEmpty()) throw new NoSuchElementException("favoritos no encontrado");
        return favoritoMapper.toDtoList(favoritos);
    }

    @Override
    public void deleteFavoritoById(Long id) {
        if(id<0 || id == null) throw new NoSuchElementException("id no puede ser negativo o nulo");
        if (!favoritoRepository.existsById(id)) {
            throw new NoSuchElementException("Favorito con ID " + id + " no encontrado");
        }
        favoritoRepository.deleteById(id);
    }

    @Override
    public List<FavoritoDto> findFavoritosByUsuario(Long idUsuario) {
        List<Favorito> favoritos = favoritoRepository.findAll();
        if(favoritos.isEmpty()) throw new NoSuchElementException("favoritos no encontrado");
        List<Favorito> listaFiltrada = favoritos.stream().
                filter(favorito -> favorito.getUsuario().getId().equals(idUsuario))
                .collect(Collectors.toList());
        return favoritoMapper.toDtoList(listaFiltrada);
    }
}
