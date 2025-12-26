package com.afk.control.service.impl;

import com.afk.control.dto.ApartamentoDto;
import com.afk.control.dto.HabitacionDto;
import com.afk.control.mapper.ApartamentoMapper;
import com.afk.control.mapper.HabitacionMapper;
import com.afk.control.service.ApartamentoService;
import com.afk.control.service.HabitacionService;
import com.afk.model.entity.Apartamento;
import com.afk.model.entity.Habitacion;
import com.afk.model.repository.ApartamentoRepository;
import org.springframework.transaction.annotation.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

@Service
@RequiredArgsConstructor
public class ApartamentoServiceImpl implements ApartamentoService {

    private final ApartamentoRepository apartamentoRepository;
    private final HabitacionService habitacionService;

    @Qualifier("apartamentoMapperImpl")
    private final ApartamentoMapper apartamentoMapper;

    @Qualifier("habitacionMapperImpl")
    private final HabitacionMapper habitacionMapper;



    @Override
    public ApartamentoDto createApartamento(ApartamentoDto apartamentoDto) {
        Apartamento apartamento = apartamentoMapper.toEntity(apartamentoDto);
        if (apartamento.getId() != null) {
            throw new RuntimeException("Apartamento ya existe con el ID: " + apartamento.getId());
        }
        Apartamento savedApartamento = apartamentoRepository.save(apartamento);
        return apartamentoMapper.toDto(savedApartamento);
    }

    @Override
    @Transactional(readOnly = true)
    public ApartamentoDto findAllApartamentosById(Long id) {
        Apartamento apartamento = apartamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Apartamento no encontrado"));
        return apartamentoMapper.toDto(apartamento);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ApartamentoDto> findAllApartamentos() {
        List<Apartamento> apartamentos = apartamentoRepository.findAll();
        return apartamentoMapper.toDtoList(apartamentos);
    }

    @Override
    @Transactional
    public void deleteApartamentoById(Long id) {
        if (!apartamentoRepository.existsById(id)) {
            throw new RuntimeException("Apartamento no encontrado");
        }
        apartamentoRepository.deleteById(id);
    }
    @Override
    public ApartamentoDto updateApartamento(Long id,ApartamentoDto apartamentoDto) {
        Apartamento existingApartametno = apartamentoRepository.findById(id).orElseThrow(() ->
                new RuntimeException("Apartamento no encontrado"));
        apartamentoMapper.updateEntityFromDto(existingApartametno, apartamentoDto);
        Apartamento updatedApartamento = apartamentoRepository.save(existingApartametno);
        return apartamentoMapper.toDto(updatedApartamento);
    }

    @Override
    @Transactional(readOnly = true)
    public void actualizarApartamento(ApartamentoDto dto){
        if(dto == null){
            throw new IllegalArgumentException("el apartamento a actualizar no puede ser nulo");
        }
        Apartamento a = apartamentoMapper.toEntity(dto);
        Apartamento aExistente = apartamentoRepository.findById(a.getId())
                .orElseThrow(() -> new NoSuchElementException("Apartamento no encontrado"));
        aExistente.setDescripcion(a.getDescripcion());
        if(a.getHabitaciones().isEmpty()){
            aExistente.setHabitaciones(new ArrayList<>());
        }else{
            aExistente.setHabitaciones(a.getHabitaciones());
        }
        aExistente.setDescripcion(a.getDescripcion());
    }

    @Override
    @Transactional(readOnly = true)
    public ApartamentoDto findHabitacionesByApartamentoId(Long id){
        Apartamento a = apartamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Apartamento no encontrado"));
        List<Habitacion> habitaciones = a.getHabitaciones();
        if(habitaciones.isEmpty()){
            throw new RuntimeException("Habitacion no encontrado");
        }
        Apartamento aNuevo = new Apartamento();
        aNuevo.setId(a.getId());
        aNuevo.setDescripcion(a.getDescripcion());
        aNuevo.setHabitaciones(habitaciones);
        return apartamentoMapper.toDto(aNuevo);
    }

    @Override
    public void eliminarHabitacionDeUnApartamentoPorHabitacionId(Long idApartamento, Long idHabitacion) {
        Apartamento apartamento = apartamentoRepository.findById(idApartamento)
                .orElseThrow(() -> new RuntimeException("Apartamento no encontrado"));
        List<Habitacion> habitaciones = apartamento.getHabitaciones();
        Habitacion habitacionAEliminar = habitaciones.stream()
                .filter(h -> h.getId().equals(idHabitacion))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Habitación no encontrada"));
        habitaciones.remove(habitacionAEliminar);
        habitacionService.deleteHabitacion(idHabitacion);
        apartamento.setHabitaciones(habitaciones);
        apartamentoRepository.save(apartamento);
    }


    @Override
    @Transactional(readOnly = true)
    public void actualizarHabitacionDeUnApartamentoPorHabitacionId(ApartamentoDto dto,Long id, String estado){
        if(dto == null){
            throw new IllegalArgumentException("el apartamento a actualizar no puede ser nulo");
        }
        Apartamento a = apartamentoMapper.toEntity(dto);
        List<Habitacion> habitaciones = a.getHabitaciones();

        Habitacion hModificar = habitaciones.stream()
                .filter(h -> h.getId().equals(id))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Habitacion no encontrada"));
        habitacionService.actualizarEstadoHabitacion(hModificar.getId(), estado);
    }

    @Override
    @Transactional(readOnly = true)
    public Integer contarHabitacionesPorApartamentoId(Long id){
        Apartamento a = apartamentoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Apartamento no encontrado"));
        if(a.getHabitaciones().isEmpty()){
            throw new RuntimeException("apartamento con 0 habitaciones");
        }
        return a.getHabitaciones().size();
    }
}
