package com.afk.model.repository;

import com.afk.model.entity.Multimedia;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MultimediaRepository extends JpaRepository<Multimedia, Long> {
    List<Multimedia> findByPublicacionId(Long publicacionId);

    List<Multimedia> findByTipoId(Long tipoMultimediaId);
}
