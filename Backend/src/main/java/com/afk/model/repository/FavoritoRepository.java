package com.afk.model.repository;
import com.afk.model.entity.Favorito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FavoritoRepository extends JpaRepository<Favorito, Long> {
    boolean existsByUsuarioIdAndPublicacionId(Long usuarioId, Long publicacionId);
}
