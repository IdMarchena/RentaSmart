package com.afk.control.service.impl;
import com.afk.control.dto.SolicitudDeServicioDto;
import com.afk.control.mapper.InmuebleMapper;
import com.afk.control.mapper.ServicioMapper;
import com.afk.control.mapper.SolicitudServicioMapper;
import com.afk.control.mapper.UsuarioMapper;
import com.afk.control.service.InmuebleService;
import com.afk.control.service.ServicioService;
import com.afk.control.service.SolicitudServicioService;
import com.afk.control.service.UsuarioService;
import com.afk.model.entity.SolicitudServicio;
import com.afk.model.entity.enums.EstadoCita;
import com.afk.model.repository.SolicitudServicioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class SolicitudServiceImpl implements SolicitudServicioService {

    private final SolicitudServicioRepository repository;
    private final SolicitudServicioMapper mapper;

    private final ServicioService sService;
    private final ServicioMapper sMapper;

    private final UsuarioService uService;
    private final UsuarioMapper uMapper;

    private final InmuebleService iService;
    private final InmuebleMapper iMapper;

    @Override
    public SolicitudDeServicioDto crearSolicitudServicio(SolicitudDeServicioDto solicitudServicio) {
        if(solicitudServicio == null) throw new IllegalArgumentException("El solicitud de servicio no puede ser nulo");
        SolicitudServicio s = mapper.toEntity(solicitudServicio);
        return mapper.toDto(repository.save(s));
    }

    @Override
    public SolicitudDeServicioDto findById(Long id) {
        SolicitudServicio solicitudServicio = repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("no se encontraron solicitud de servicio"));
        return mapper.toDto(solicitudServicio);
    }

    @Override
    public SolicitudDeServicioDto actualizarSolicitudServicio(Long id, SolicitudDeServicioDto solicitudServicio) {
        if(solicitudServicio==null) throw new IllegalArgumentException("El solicitud de servicio no puede ser nulo");
        SolicitudServicio s = repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("no se encontraron solicitud de servicio"));

        s.setServicio(sMapper.toEntity(sService.getServicioById(solicitudServicio.idServicio())));

        s.setUsuario(uMapper.toEntity(uService.findUsuarioById(solicitudServicio.idUsuario())));

        s.setInmueble(iMapper.toEntity(iService.findInmuebleById(solicitudServicio.idInmueble())));

        s.setFecha(LocalDateTime.now());

        s.setEstado(solicitudServicio.estado());
        return mapper.toDto(repository.save(s));
    }

    @Override
    public List<SolicitudDeServicioDto> findAll() {
        List<SolicitudServicio> lista = repository.findAll();
        if(lista.isEmpty()) throw new NoSuchElementException("no se encontraron solicitudes de servicio");
        return mapper.toDtoList(lista);
    }

    @Override
    public List<SolicitudDeServicioDto> findByUsuario(Long idUsuario) {
        List<SolicitudServicio> lista = repository.findAll();
        if(lista.isEmpty()) throw new NoSuchElementException("no se encontraron solicitudes de servicio");
        List<SolicitudServicio> listaFiltrada =lista.stream()
                .filter(s -> s.getUsuario().getId().equals(idUsuario))
                .collect(Collectors.toList());
        return mapper.toDtoList(listaFiltrada);
    }

    @Override
    public List<SolicitudDeServicioDto> findByEstado(String estado) {
        EstadoCita e = EstadoCita.valueOf(estado.toUpperCase());
        List<SolicitudServicio> lista = repository.findAll();

        if(lista.isEmpty()) throw new NoSuchElementException("no se encontraron solicitud de servicio");
        List<SolicitudServicio> listaFiltrada= lista.stream()
                .filter(s -> s.getEstado().equals(e))
                .collect(Collectors.toList());
        return mapper.toDtoList(listaFiltrada);
    }

    @Override
    public List<SolicitudDeServicioDto> findByServicio(Long idServicio) {
        List<SolicitudServicio> lista = repository.findAll();
        if(lista.isEmpty()) throw new NoSuchElementException("no se encontraron solicitudes de servicio");
        List<SolicitudServicio> listaFiltrada =lista.stream()
                .filter(s -> s.getServicio().getId().equals(idServicio))
                .collect(Collectors.toList());
        return mapper.toDtoList(listaFiltrada);
    }

    @Override
    public List<SolicitudDeServicioDto> findByInmueble(Long idInmueble) {
        List<SolicitudServicio> lista = repository.findAll();
        if(lista.isEmpty()) throw new NoSuchElementException("no se encontraron solicitudes de servicio");
        List<SolicitudServicio> listaFiltrada =lista.stream()
                .filter(s -> s.getInmueble().getId().equals(idInmueble))
                .collect(Collectors.toList());
        return mapper.toDtoList(listaFiltrada);
    }

    @Override
    public List<SolicitudDeServicioDto> findByFechaBetween(LocalDateTime startDate, LocalDateTime endDate) {
        if (startDate == null || endDate == null) {
            throw new IllegalArgumentException("Las fechas no pueden ser nulas");
        }

        List<SolicitudServicio> lista = repository.findAll();

        if (lista.isEmpty()) {
            throw new NoSuchElementException("No se encontraron solicitudes de servicio");
        }

        List<SolicitudServicio> listaFiltrada = lista.stream()
                .filter(s -> !s.getFecha().isBefore(startDate) && !s.getFecha().isAfter(endDate))
                .collect(Collectors.toList());

        if (listaFiltrada.isEmpty()) {
            throw new NoSuchElementException("No se encontraron solicitudes de servicio en el rango de fechas especificado");
        }

        return mapper.toDtoList(listaFiltrada);
    }

    @Override
    public boolean deleteById(Long id) {
        SolicitudServicio solicitudServicio = repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("no se encontraron solicitud de servicio"));
        try{
            repository.delete(solicitudServicio);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}
