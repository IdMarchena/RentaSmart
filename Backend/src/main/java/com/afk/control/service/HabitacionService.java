package com.afk.control.service;

import com.afk.control.dto.HabitacionDto;

import java.util.List;

public interface HabitacionService {

    HabitacionDto createHabitacion(HabitacionDto habitacion);
    List<HabitacionDto> getAllHabitacion();
    HabitacionDto getHabitacionById(Long id);
    void deleteHabitacion(Long id);
    void updateHabitacion(HabitacionDto habitacion);
    void actualizarEstadoHabitacion(Long id, String estado);

}
