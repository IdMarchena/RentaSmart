package com.afk.control.service.impl;

import com.afk.control.dto.CitaDto;
import com.afk.control.mapper.CitaMapper;
import com.afk.control.service.CitaService;
import com.afk.model.entity.Cita;
import com.afk.model.entity.enums.EstadoCita;
import com.afk.model.repository.CitaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CitaServiceImpl implements CitaService {

    private final CitaRepository repository;
    private final CitaMapper mapper;

    @Override
    public CitaDto createCita(CitaDto dto) {

        Cita cita = mapper.toEntity(dto);

        if (cita.getServicio() != null && cita.getPublicacion() != null) {
            throw new IllegalStateException("La cita no puede tener servicio y publicación a la vez");
        }
        List<EstadoCita> estadosBloqueantes = List.of(
                EstadoCita.SOLICITADA,
                EstadoCita.EN_REVISION,
                EstadoCita.CONFIRMADA
        );

        if (repository.existsByUsuarioAndFechaAndEstadoIn(
                cita.getUsuario(),
                cita.getFecha(),
                estadosBloqueantes)) {
            throw new IllegalStateException("El usuario ya tiene una cita en ese horario");
        }

        if (cita.getServicio() != null &&
                repository.existsByServicioAndFechaAndEstadoIn(
                        cita.getServicio(),
                        cita.getFecha(),
                        estadosBloqueantes)) {
            throw new IllegalStateException("El servicio ya tiene una cita en ese horario");
        }

        if (cita.getPublicacion() != null &&
                repository.existsByPublicacionAndFechaAndEstadoIn(
                        cita.getPublicacion(),
                        cita.getFecha(),
                        estadosBloqueantes)) {
            throw new IllegalStateException("La publicación ya tiene una cita en ese horario");
        }

        cita.setEstado(EstadoCita.SOLICITADA);

        return mapper.toDto(repository.save(cita));
    }

    @Override
    public CitaDto findCitaById(Long id) {
        Cita cita = repository.findById(id).orElseThrow(() ->
                new NoSuchElementException("Cita con ID " + id + " no encontrada"));
        return mapper.toDto(cita);
    }

    @Override
    public List<CitaDto> findAllCitas() {
        List<Cita> citas = repository.findAll();
        return citas.stream().map(mapper::toDto).collect(Collectors.toList());
    }

    @Override
    public CitaDto updateCita(Long id, CitaDto dto) {
        Cita existingCita = repository.findById(id).orElseThrow(() ->
                new NoSuchElementException("Cita con ID " + id + " no encontrada"));
        mapper.updateEntityFromDto(dto, existingCita);
        Cita updatedCita = repository.save(existingCita);
        return mapper.toDto(updatedCita);
    }

    @Override
    public void deleteCitaById(Long id) {
        if (!repository.existsById(id)) {
            throw new NoSuchElementException("Cita con ID " + id + " no encontrada");
        }
        repository.deleteById(id);
    }

    @Override
    public List<CitaDto> findCitasByUsuario(Long idUsuario) {
        Optional<Cita> citaOptional = repository.findById(idUsuario);
        return citaOptional.map(cita -> List.of(mapper.toDto(cita)))
                .orElseGet(Collections::emptyList);
    }

    @Override
    public List<CitaDto> listarCitasPorIDServicio(Long idServicio) {
        List<Cita> citas = repository.findAll();
        List<Cita> citasPorServicio = citas.stream()
                .filter(cita -> cita.getServicio().getId().equals(idServicio))
                .collect(Collectors.toList());
        if (citasPorServicio.isEmpty()) {
            return Collections.emptyList();
        }
        return mapper.toDtoList(citasPorServicio);
    }

    @Override
    public List<CitaDto> listarCitasPorIDPublicacion(Long idPublicacion){
        List<Cita> citas = repository.findAll();
        List<Cita> citasPorServicio = citas.stream()
                .filter(cita -> cita.getPublicacion().getId().equals(idPublicacion))
                .collect(Collectors.toList());
        if (citasPorServicio.isEmpty()) {
            return Collections.emptyList();
        }
        return mapper.toDtoList(citasPorServicio);
    }

    @Override
    public List<CitaDto> listarCitasPorEstado(String estado){
        EstadoCita e = switch (estado) {
            case "SOLICITADA" -> EstadoCita.SOLICITADA;
            case "EN_REVISION" -> EstadoCita.EN_REVISION;
            case "CONFIRMADA" -> EstadoCita.CONFIRMADA;
            case "REAGENDADA" -> EstadoCita.REAGENDADA;
            case "CANCELADA" -> EstadoCita.CANCELADA;
            case "VENCIDA" -> EstadoCita.VENCIDA;
            case "ASISTIDA" -> EstadoCita.ASISTIDA;
            case "NO_ASISTIDA" -> EstadoCita.NO_ASISTIDA;
            default -> throw new NoSuchElementException("Estado " + estado + " no encontrado");
        };
        List<Cita> citas = repository.findAll();
        List<Cita> listaFiltrada = citas.stream()
                .filter(c -> c.getEstado().equals(e))
                .collect(Collectors.toList());
        return mapper.toDtoList(listaFiltrada);
    }

    @Override
    public List<CitaDto> listarCitasPorFecha(LocalDateTime fecha) {
        List<Cita> citas = repository.findAll();
        List<Cita> citasPorFecha = citas.stream()
                .filter(cita -> cita.getFecha().isEqual(fecha))
                .toList();
        if (citasPorFecha.isEmpty()) {
            return Collections.emptyList();
        }
        return citasPorFecha.stream().map(mapper::toDto).collect(Collectors.toList());
    }
}
