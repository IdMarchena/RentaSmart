package com.afk.model.repository;
import com.afk.model.entity.Favorito;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FavoritoRepository extends JpaRepository<Favorito, Long> {
    @Query("SELECT COUNT(f) > 0 FROM Favorito f WHERE " +
            "f.usuario.id = :idUsuarioProfesionalServicio AND " +
            "f.publicacion.id = :idPublicacionUsuario")
    boolean existsMutualMatch(@Param("idUsuarioProfesionalServicio") Long idUsuarioProfesionalServicio,
                              @Param("idPublicacionUsuario") Long idPublicacionUsuario);


    @Query("SELECT f FROM Favorito f WHERE f.usuario.id = :usuarioId")
    List<Favorito> findByUsuarioId(@Param("usuarioId") Long usuarioId);


    @Query("SELECT new com.afk.control.dto.UsuarioDto(u.id, u.nombre, u.correo, null) " +
            "FROM Favorito f JOIN f.usuario u " +
            "WHERE f.publicacion.inmueble.servicio.idUsuario.id = :idProfesionalMantenimiento")
    List<com.afk.control.dto.UsuarioDto> findUsuariosFavoritosByGerenteId(@Param("idProfesionalMantenimiento") Long idProfesionalMantenimiento);
}
