package com.afk.control.service.impl;
import com.afk.control.dto.InmuebleDto;
import com.afk.control.mapper.InmuebleMapper;
import com.afk.control.service.InmuebleService;
import com.afk.model.entity.Inmueble;
import com.afk.model.entity.enums.EstadoInmueble;
import com.afk.model.repository.InmuebleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
public class InmuebleServiceImpl implements InmuebleService {

    @Autowired
    private InmuebleRepository inmuebleRepository;

    @Autowired
    private InmuebleMapper inmuebleMapper;

    @Override
    public InmuebleDto createInmueble(InmuebleDto inmuebleDto) {
        Inmueble inmueble = inmuebleMapper.toEntity(inmuebleDto);
        Inmueble savedInmueble = inmuebleRepository.save(inmueble);
        return inmuebleMapper.toDto(savedInmueble);
    }

    @Override
    public InmuebleDto findInmuebleById(Long id) {
        Inmueble inmueble = inmuebleRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Inmueble con ID " + id + " no encontrado"));
        return inmuebleMapper.toDto(inmueble);
    }

    @Override
    public List<InmuebleDto> findAllInmuebles() {
        List<Inmueble> inmuebles = inmuebleRepository.findAll();
        return inmuebles.stream().map(inmuebleMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public void deleteInmuebleById(Long id) {
        if (!inmuebleRepository.existsById(id)) {
            throw new NoSuchElementException("Inmueble con ID " + id + " no encontrado para eliminar");
        }
        inmuebleRepository.deleteById(id);
    }

    @Override
    public List<InmuebleDto> findInmueblesByUbicacion(Long ubicacionId) {
        List<Inmueble> inmuebles = inmuebleRepository.findByUbicacionId(ubicacionId);
        return inmuebles.stream().map(inmuebleMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<InmuebleDto> findInmueblesByEstado(EstadoInmueble estadoInmueble) {
        List<Inmueble> inmuebles = inmuebleRepository.findByEstadoInmueble(estadoInmueble);
        return inmuebles.stream().map(inmuebleMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public InmuebleDto updateInmueble(Long id, InmuebleDto inmuebleDto) {
        Inmueble existingInmueble = inmuebleRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Inmueble con ID " + id + " no encontrado"));
        inmuebleMapper.updateEntityFromDto(inmuebleDto, existingInmueble);
        Inmueble updatedInmueble = inmuebleRepository.save(existingInmueble);
        return inmuebleMapper.toDto(updatedInmueble);
    }

    @Override
    public List<InmuebleDto> findInmueblesByNombre(String nombre) {
        List<Inmueble> inmuebles = inmuebleRepository.findByNombre(nombre);
        return inmuebles.stream().map(inmuebleMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<InmuebleDto> findInmueblesByEstrato(Integer estrato) {
        List<Inmueble> inmuebles = inmuebleRepository.findByEstrato(estrato);
        return inmuebles.stream().map(inmuebleMapper::toDto).collect(Collectors.toList());
    }
    @Override
    public List<InmuebleDto> findInmueblesByUbicacionAndEstado(Long ubicacionId, EstadoInmueble estadoInmueble) {
        List<Inmueble> inmuebles = inmuebleRepository.findByUbicacionAndEstado(ubicacionId, estadoInmueble);
        return inmuebles.stream().map(inmuebleMapper::toDto).collect(Collectors.toList());
    }

    @Override
    public List<InmuebleDto> findInmueblesByNombreAndEstrato(String nombre, Integer estrato) {
        List<Inmueble> inmuebles = inmuebleRepository.findByNombreAndEstrato(nombre, estrato);
        return inmuebles.stream().map(inmuebleMapper::toDto).collect(Collectors.toList());
    }
}
