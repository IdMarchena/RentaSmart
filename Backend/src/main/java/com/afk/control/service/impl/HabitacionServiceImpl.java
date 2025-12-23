package com.afk.control.service.impl;

import com.afk.control.dto.HabitacionDto;
import com.afk.control.mapper.HabitacionMapper;
import com.afk.control.service.HabitacionService;
import com.afk.model.entity.Habitacion;
import com.afk.model.repository.HabitacionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class HabitacionServiceImpl implements HabitacionService {
    private final HabitacionRepository habitacionRepository;
    private final HabitacionMapper habitacionMapper;

    @Override
    public HabitacionDto createHabitacion(HabitacionDto habitacion) {
        if(habitacion == null){
            throw new IllegalArgumentException("El habitacion no puede ser nulo");
        }
        Habitacion h = habitacionMapper.toEntity(habitacion);
        h = habitacionRepository.save(h);
        return habitacionMapper.toDto(h);
    }

    @Override
    @Transactional(readOnly = true)
    public List<HabitacionDto> getAllHabitacion() {
        List<Habitacion> habitaciones = habitacionRepository.findAll();
        if(habitaciones.isEmpty()){
            throw new IllegalArgumentException("El habitacion no puede ser nulo");
        }
        return habitacionMapper.toDtoList(habitaciones);
    }

    @Override
    @Transactional(readOnly = true)
    public HabitacionDto getHabitacionById(Long id) {
        if(id == null || id <= 0){
            throw new IllegalArgumentException("El habitacion no puede ser nulo");
        }
        Habitacion h = habitacionRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("El habitacion no existe"));
        return habitacionMapper.toDto(h);
    }

    @Override
    public void deleteHabitacion(Long id) {
        if(id == null || id <= 0){
            throw new IllegalArgumentException("El habitacion no puede ser nulo");
        }
        habitacionRepository.deleteById(id);
    }

    @Override
    public void updateHabitacion(HabitacionDto habitacion) {
        if(habitacion == null){
            throw new IllegalArgumentException("El habitacion no puede ser nulo");
        }
        Habitacion h = habitacionMapper.toEntity(habitacion);

        Habitacion hExistente = habitacionRepository.findById(h.getId())
                .orElseThrow(() -> new IllegalArgumentException("El habitacion no existe"));

        hExistente.setCapacidad(h.getCapacidad());
        hExistente.setPrecio(h.getPrecio());
        hExistente.setEstado(h.getEstado());

        habitacionRepository.save(hExistente);
    }
}
