package com.afk.control.service;
import com.afk.control.dto.ApartamentoDto;

import java.util.List;

public interface ApartamentoService {
    ApartamentoDto createApartamento(ApartamentoDto apartamentoDto);
    ApartamentoDto findAllApartamentosById(Long id);
    List<ApartamentoDto> findAllApartamentos();
    void deleteApartamentoById(Long id);
    ApartamentoDto updateApartamento(Long id,ApartamentoDto apartamentoDto);
    void actualizarApartamento(ApartamentoDto apartamentoDto);
    ApartamentoDto findHabitacionesByApartamentoId(Long id);
    void eliminarHabitacionDeUnApartamentoPorHabitacionId(Long idApartamneot, Long idHabitacion);
    void actualizarHabitacionDeUnApartamentoPorHabitacionId(ApartamentoDto apartamento,Long id, String estado);
    Integer contarHabitacionesPorApartamentoId(Long id);
}
