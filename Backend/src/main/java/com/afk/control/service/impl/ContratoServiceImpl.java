package com.afk.control.service.impl;
import com.afk.control.dto.ContratoDto;
import com.afk.control.mapper.ContratoMapper;
import com.afk.control.service.ContratoService;
import com.afk.model.entity.Contrato;
import com.afk.model.entity.enums.EstadoContrato;
import com.afk.model.repository.ContratoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.YearMonth;
import java.util.*;
import java.util.stream.Collectors;
@Slf4j
@Service
@RequiredArgsConstructor
public class ContratoServiceImpl implements ContratoService {

    private final ContratoRepository repository;
    private final ContratoMapper mapper;

    @Override
    public ContratoDto createContrato(ContratoDto dto) {
        log.info("Criando contrato, este es el dia d epago pa ese contrato"+dto.diaDePago());
        Contrato contrato = mapper.toEntity(dto);
        contrato.setFechaInicio(LocalDateTime.now());
        Contrato savedContrato = repository.save(contrato);
        return mapper.toDto(savedContrato);
    }

    @Override
    public ContratoDto findContratoById(Long id) {
        Contrato contrato = repository.findById(id).orElseThrow(() ->
                new NoSuchElementException("Contrato con ID " + id + " no encontrada"));
        return mapper.toDto(contrato);
    }

    @Override
    public List<ContratoDto> findAllContratos() {
        List<Contrato> contratos = repository.findAll();
        return contratos.stream().map(mapper::toDto).collect(Collectors.toList());
    }

    @Override
    public ContratoDto updateContrato(Long id, ContratoDto dto) {
        Contrato existingCita = repository.findById(id).orElseThrow(() ->
                new NoSuchElementException("Cita con ID " + id + " no encontrada"));
        mapper.updateEntityFromDto(dto, existingCita);
        Contrato updateContrato = repository.save(existingCita);
        return mapper.toDto(updateContrato);
    }

    @Override
    public void deleteContratoById(Long id) {
        if (!repository.existsById(id)) {
            throw new NoSuchElementException("contrato con ID " + id + " no encontrada");
        }
        repository.deleteById(id);
    }

    @Override
    public List<ContratoDto> findContratoByUsuario(Long idUsuario) {
        Optional<Contrato> contratoOptional = repository.findById(idUsuario);
        return contratoOptional.map(contrato -> List.of(mapper.toDto(contrato)))
                .orElseGet(Collections::emptyList);
    }

    @Override
    public List<ContratoDto> findContratosComoArrendador(Long idUsuario) {
        log.info("regresando todos los contratos del usuario con id:"+idUsuario);
        List<Contrato> contratos = repository.findAll();
        if(contratos.isEmpty()) throw new NoSuchElementException("Usuario no encontrado");
        List<Contrato> listaFiltrada = contratos.stream()
                .filter(c -> c.getUsuarioArrendador().getId().equals(idUsuario) ||c.getUsuarioArrendatario().getId().equals(idUsuario))
                .collect(Collectors.toList());
        log.info("esta es la cantidad de contratos del vale:"+listaFiltrada.size());
        return mapper.toDtoList(listaFiltrada);
    }

    @Override
    public List<ContratoDto> findContratosComoArrendatario(Long idUsuario) {
        if(idUsuario<0) throw new NoSuchElementException("Usuario no encontrado");
        List<Contrato> contratos = repository.findAll();
        if(contratos.isEmpty()) throw new NoSuchElementException("Usuario no encontrado");
        List<Contrato> listaFiltrada = contratos.stream()
                .filter(c -> c.getUsuarioArrendatario().getId().equals(idUsuario))
                .collect(Collectors.toList());
        return mapper.toDtoList(listaFiltrada);
    }

    @Override
    public List<ContratoDto> findContratosActivosComoArrendador(Long idUsuario) {
        if(idUsuario<0) throw new NoSuchElementException("Usuario no encontrado");
        List<Contrato> contratos = repository.findAll();
        if(contratos.isEmpty()) throw new NoSuchElementException("Usuario no encontrado");
        List<Contrato> listaFiltrada = contratos.stream()
                .filter(c -> c.getUsuarioArrendador().getId().equals(idUsuario))
                .collect(Collectors.toList());
        return mapper.toDtoList(listaFiltrada);
    }

    @Override
    public List<ContratoDto> findContratosActivosComoArrendatario(Long idUsuario) {
        if(idUsuario<0) throw new NoSuchElementException("Usuario no encontrado");
        List<Contrato> contratos = repository.findAll();
        if(contratos.isEmpty()) throw new NoSuchElementException("Usuario no encontrado");
        List<Contrato> listaFiltrada = contratos.stream()
                .filter(c -> c.getUsuarioArrendatario().getId().equals(idUsuario) && c.getEstadoContrato().equals(EstadoContrato.ACTIVO))
                .collect(Collectors.toList());
        return mapper.toDtoList(listaFiltrada);
    }

    @Override
    public List<ContratoDto> findContratosFinalizadosComoArrendador(Long idUsuario) {
        if(idUsuario<0) throw new NoSuchElementException("Usuario no encontrado");
        List<Contrato> contratos = repository.findAll();
        if(contratos.isEmpty()) throw new NoSuchElementException("Usuario no encontrado");
        List<Contrato> listaFiltrada = contratos.stream()
                .filter(c -> c.getUsuarioArrendador().getId().equals(idUsuario) && c.getEstadoContrato().equals(EstadoContrato.FINALIZADO))
                .collect(Collectors.toList());
        return mapper.toDtoList(listaFiltrada);
    }

    @Override
    public List<ContratoDto> findContratosFinalizadosComoArrendatario(Long idUsuario) {
        if(idUsuario<0) throw new NoSuchElementException("Usuario no encontrado");
        List<Contrato> contratos = repository.findAll();
        if(contratos.isEmpty()) throw new NoSuchElementException("Usuario no encontrado");
        List<Contrato> listaFiltrada = contratos.stream()
                .filter(c -> c.getUsuarioArrendatario().getId().equals(idUsuario) && c.getEstadoContrato().equals(EstadoContrato.FINALIZADO))
                .collect(Collectors.toList());
        return mapper.toDtoList(listaFiltrada);
    }

    @Override
    public List<ContratoDto> findContratosByInmueble(Long idInmueble) {
        if(idInmueble<0) throw new NoSuchElementException("Usuario no encontrado");
        List<Contrato> contratos = repository.findAll();
        if(contratos.isEmpty()) throw new NoSuchElementException("Usuario no encontrado");
        List<Contrato> listaFiltrada = contratos.stream()
                .filter(c -> c.getInmueble().getId().equals(idInmueble))
                .collect(Collectors.toList());
        return mapper.toDtoList(listaFiltrada);
    }

    @Override
    public boolean inmuebleTieneContratoActivo(Long idInmueble) {
        if(idInmueble<0) throw new NoSuchElementException("Usuario no encontrado");
        List<Contrato> contratos = repository.findAll();
        if(contratos.isEmpty()) throw new NoSuchElementException("Usuario no encontrado");
        Contrato c = contratos.stream()
                .filter(cn ->
                        cn.getInmueble().getId().equals(idInmueble)
                                && cn.getEstadoContrato() == EstadoContrato.ACTIVO
                )
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException("Usuario no encontrado"));
        return c != null;

    }

    @Override
    public Long contarContratosComoArrendador(Long idUsuario) {
        List<Contrato> contratos = repository.findAll();
        if(contratos.isEmpty()) throw new NoSuchElementException("Usuario no encontrado");
        List<Contrato> listaFiltrada = contratos.stream()
                .filter(c -> c.getUsuarioArrendador().getId().equals(idUsuario))
                .toList();
        return (long) listaFiltrada.size();
    }

    @Override
    public Long contarContratosComoArrendatario(Long idUsuario) {
        List<Contrato> contratos = repository.findAll();
        if(contratos.isEmpty()) throw new NoSuchElementException("Usuario no encontrado");
        List<Contrato> listaFiltrada = contratos.stream()
                .filter(c -> c.getUsuarioArrendatario().getId().equals(idUsuario))
                .toList();
        return (long) listaFiltrada.size();
    }

    @Override
    public Map<YearMonth, Long> contarContratosPorMesComoArrendador(Long idUsuario) {
        if(idUsuario<0) throw new NoSuchElementException("Usuario no encontrado");
        List<Contrato> contratos = repository.findAll();
        if(contratos.isEmpty()) throw new NoSuchElementException("Usuario no encontrado");
        List<Contrato> listaFiltrada = contratos.stream()
                .filter(c -> c.getUsuarioArrendador().getId().equals(idUsuario))
                .toList();
        return listaFiltrada.stream()
                .collect(
                java.util.stream.Collectors.groupingBy(
                        c -> YearMonth.from(c.getFechaInicio()),
                        java.util.stream.Collectors.counting()
                )
        );
    }

    @Override
    public Map<YearMonth, Long> contarContratosPorMesComoArrendatario(Long idUsuario) {
        List<Contrato> contratos = repository.findAll();
        if(contratos.isEmpty()) throw new NoSuchElementException("Usuario no encontrado");
        List<Contrato> listaFiltrada = contratos.stream()
                .filter(c -> c.getUsuarioArrendatario().getId().equals(idUsuario))
                .toList();
        return listaFiltrada.stream()
                .collect(
                        java.util.stream.Collectors.groupingBy(
                                c -> YearMonth.from(c.getFechaInicio()),
                                java.util.stream.Collectors.counting()
                        )
                );
    }

    @Override
    public Double calcularIngresoTotalComoArrendador(Long idUsuario) {
        List<Contrato> contratos = repository.findAll();
        if(contratos.isEmpty()) throw new NoSuchElementException("Usuario no encontrado");
        List<Contrato> listaFiltrada = contratos.stream()
                .filter(c -> c.getUsuarioArrendatario().getId().equals(idUsuario))
                .toList();
        return (double) listaFiltrada.size();
    }

    @Override
    public Double calcularIngresoComoArrendador(Long idUsuario) {
        if(idUsuario<0) throw new NoSuchElementException("Usuario no encontrado");
        List<Contrato> contratos = repository.findAll();
        if(contratos.isEmpty()) throw new NoSuchElementException("Usuario no encontrado");
        List<Contrato> listaFiltrada = contratos.stream()
                .filter(c -> c.getUsuarioArrendatario().getId().equals(idUsuario))
                .toList();
        return listaFiltrada
                .stream()
                .mapToDouble(Contrato::getPrecio)
                .sum();
    }

    @Override
    public List<ContratoDto> findContratosProximosAVencer(Long idUsuario, int dias) {

        if (idUsuario < 0) throw new NoSuchElementException("Usuario no encontrado");
        if (dias <= 0) throw new IllegalArgumentException("Los días deben ser mayores a 0");
        LocalDateTime ahora = LocalDateTime.now();
        LocalDateTime limite = ahora.plusDays(dias);
        List<Contrato> contratos = repository.findAll();
        if (contratos.isEmpty()) throw new NoSuchElementException("contratos no encontrados");

        List<Contrato> contratosFiltrados = contratos.stream()
                .filter(c -> c.getUsuarioArrendatario() != null)
                .filter(c -> c.getUsuarioArrendatario().getId().equals(idUsuario))
                .filter(c -> c.getEstadoContrato() == EstadoContrato.ACTIVO)
                .filter(c -> c.getFechaFinalizacion() != null)
                .filter(c ->
                        !c.getFechaFinalizacion().isBefore(ahora) &&
                                !c.getFechaFinalizacion().isAfter(limite)
                )
                .toList();
        return mapper.toDtoList(contratosFiltrados);
    }
    @Override
    public Map<YearMonth, Double> calcularIngresoPorMesComoArrendador(Long idUsuario) {
        if (idUsuario == null || idUsuario < 0) {
            throw new NoSuchElementException("Usuario no encontrado");
        }

        List<Contrato> contratos = repository.findAll();
        List<Contrato> listaFiltrada = contratos.stream()
                                        .filter(c -> c.getUsuarioArrendador().getId().equals(idUsuario) && c.getEstadoContrato() == EstadoContrato.ACTIVO)
                                        .toList();
        if (listaFiltrada.isEmpty()) throw new NoSuchElementException("Usuario no encontrado");

        return listaFiltrada.stream()
                .collect(
                        java.util.stream.Collectors.groupingBy(
                                c -> YearMonth.from(c.getFechaInicio()),
                                java.util.stream.Collectors.summingDouble(Contrato::getPrecio)
                        )
                );
    }
}