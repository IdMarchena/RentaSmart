package com.afk.control.service;
import com.afk.control.dto.FavoritoDto;
import java.util.List;

public interface FavoritoService {
    FavoritoDto createFavorito(FavoritoDto favorito);
    FavoritoDto findFavoritoById(Long id);
    List<FavoritoDto> findAllFavoritos();
    void deleteFavoritoById(Long id);
    List<FavoritoDto> findFavoritosByUsuario(Long idUsuario);


}
