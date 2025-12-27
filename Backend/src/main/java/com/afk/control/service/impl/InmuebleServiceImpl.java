package com.afk.control.service.impl;
import com.afk.control.dto.InmuebleDto;
import com.afk.control.mapper.InmuebleMapper;
import com.afk.control.service.InmuebleService;
import com.afk.model.entity.Inmueble;
import com.afk.model.entity.enums.EstadoInmueble;
import com.afk.model.repository.InmuebleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        if(inmuebleDto==null) throw new IllegalArgumentException("inmuebleDto cannot be null");
        Inmueble i= inmuebleRepository.findByNombre(inmuebleDto.nombre()).getFirst();
        if(i!=null) throw new IllegalArgumentException("inmueble already exist");
        Inmueble inmueble = inmuebleMapper.toEntity(inmuebleDto);
        Inmueble savedInmueble = inmuebleRepository.save(inmueble);
        return inmuebleMapper.toDto(savedInmueble);
    }

    @Override
    @Transactional(readOnly = true)
    public InmuebleDto findInmuebleById(Long id) {
        Inmueble inmueble = inmuebleRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Inmueble con ID " + id + " no encontrado"));
        return inmuebleMapper.toDto(inmueble);
    }

    @Override
    @Transactional(readOnly = true)
    public List<InmuebleDto> findAllInmuebles() {
        List<Inmueble> inmuebles = inmuebleRepository.findAll();
        if(inmuebles.isEmpty()) throw new IllegalArgumentException("inmuebles cannot be empty");
        return inmuebles.stream().map(inmuebleMapper::toDto).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public void deleteInmuebleById(Long id) {
        if (!inmuebleRepository.existsById(id)) {
            throw new NoSuchElementException("Inmueble con ID " + id + " no encontrado para eliminar");
        }
        inmuebleRepository.deleteById(id);
    }

    @Override
    @Transactional(readOnly = true)
    public List<InmuebleDto> findInmueblesByUbicacion(Long ubicacionId) {
        List<Inmueble> inmuebles = inmuebleRepository.findByUbicacionId(ubicacionId);
        if(inmuebles.isEmpty()) throw new IllegalArgumentException("inmuebles cannot be empty");
        return inmuebles.stream().map(inmuebleMapper::toDto).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public List<InmuebleDto> findInmueblesByEstado(String estado) {
        List<Inmueble> lista = inmuebleRepository.findAll();
        if(lista.isEmpty()) throw new IllegalArgumentException("inmuebles cannot be empty");
        List<Inmueble> lsitaFiltrada = lista.stream()
                .filter(inmueble -> inmueble.getEstadoInmueble().equals(estado))
                .collect(Collectors.toList());
        return inmuebleMapper.toDtoList(lsitaFiltrada);
    }

    @Override
    @Transactional(readOnly = true)
    public InmuebleDto updateInmueble(Long id, InmuebleDto inmuebleDto) {
        Inmueble existingInmueble = inmuebleRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Inmueble con ID " + id + " no encontrado"));
        inmuebleMapper.updateEntityFromDto(inmuebleDto, existingInmueble);
        Inmueble updatedInmueble = inmuebleRepository.save(existingInmueble);
        return inmuebleMapper.toDto(updatedInmueble);
    }

    @Override
    @Transactional(readOnly = true)
    public List<InmuebleDto> findInmueblesByNombre(String nombre) {
        List<Inmueble> inmuebles = inmuebleRepository.findByNombre(nombre);
        if(inmuebles.isEmpty()) throw new IllegalArgumentException("inmuebles cannot be empty");
        return inmuebleMapper.toDtoList(inmuebles);
    }

    @Override
    @Transactional(readOnly = true)
    public List<InmuebleDto> findInmueblesByEstrato(Integer estrato) {
        List<Inmueble> inmuebles = inmuebleRepository.findByEstrato(estrato);
        if(inmuebles.isEmpty()) throw new IllegalArgumentException("inmuebles cannot be empty");
        return inmuebleMapper.toDtoList(inmuebles);
    }
    @Override
    @Transactional(readOnly = true)
    public List<InmuebleDto> findInmueblesByUbicacionAndEstado(Long ubicacionId, String estado) {
        List<Inmueble> inmuebles = inmuebleRepository.findAll();
        if(inmuebles.isEmpty()) throw new IllegalArgumentException("inmuebles cannot be empty");
        List<Inmueble> listaFiltada = inmuebles.stream()
                .filter(inmueble -> inmueble.getEstadoInmueble().equals(estado) && inmueble.getUbicacion().getId().equals(ubicacionId))
                .collect(Collectors.toList());
        return inmuebleMapper.toDtoList(inmuebles);
    }

    @Override
    public List<InmuebleDto> findInmueblesByNombreAndEstrato(String nombre, Integer estrato) {
        List<Inmueble> inmuebles = inmuebleRepository.findByNombreAndEstrato(nombre, estrato);
        if(inmuebles.isEmpty()) throw new IllegalArgumentException("inmuebles cannot be empty");
        return inmuebleMapper.toDtoList(inmuebles);
    }

    @Override
    @Transactional(readOnly = true)
    public List<InmuebleDto> finInmueblesByIdArrendatario(Long idArrendario){
        List<Inmueble> lista = inmuebleRepository.findAll();
        if(lista.isEmpty()) throw new IllegalArgumentException("inmuebles cannot be empty");
        List<Inmueble> listFiltrada=lista.stream()
                .filter(i -> i.getUsuario().getId().equals(idArrendario))
                .collect(Collectors.toList());
        return inmuebleMapper.toDtoList(listFiltrada);
    }

    @Override
    public void cambiarEstadoInmueble(Long id, String estado){
        if(id==null || id <0){
            throw new IllegalArgumentException("id cannot be null or negative");
        }
        Inmueble i = inmuebleRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Inmueble con ID " + id + " no encontrado"));
        if (estado != null) {
            switch (estado) {
                case "LIBRE_AMOBLADO":
                    i.setEstadoInmueble(EstadoInmueble.LIBRE_AMOBLADO);
                    break;
                case "LIBRE_NO_AMOBLADO":
                    i.setEstadoInmueble(EstadoInmueble.LIBRE_NO_AMOBLADO);
                    break;
                case "OCUPADO":
                    i.setEstadoInmueble(EstadoInmueble.OCUPADO);
                    break;
                case "EN_RESERVA":
                    i.setEstadoInmueble(EstadoInmueble.EN_RESERVA);
                    break;
                default:
                    throw new IllegalArgumentException("estado invalido");
            }
        }
    }
}
