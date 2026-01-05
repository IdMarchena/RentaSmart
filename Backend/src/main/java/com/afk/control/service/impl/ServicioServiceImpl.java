package com.afk.control.service.impl;
import com.afk.control.dto.ServicioDto;
import com.afk.control.mapper.ServicioMapper;
import com.afk.control.service.ServicioService;
import com.afk.model.entity.Calificacion;
import com.afk.model.entity.Servicio;
import com.afk.model.entity.enums.EstadoServicio;
import com.afk.model.repository.CalificacionRepository;
import com.afk.model.repository.ServicioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServicioServiceImpl implements ServicioService {

    private final ServicioRepository repository;
    private final ServicioMapper mapper;

    private final CalificacionRepository cRepo;


    @Override
    public ServicioDto crearServicio(ServicioDto servicio) {
        if(servicio==null) throw new IllegalArgumentException("El servicio no puede ser nulo");
        Servicio s = mapper.toEntity(servicio);
        return mapper.toDto(repository.save(s));
    }

    @Override
    @Transactional(readOnly = true)
    public ServicioDto getServicioById(Long id) {
        if(id==null || id < 0) throw new IllegalArgumentException("El id no puede ser nulo o menor a  0");
        Servicio s = repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("El servicio no existe"));
        return mapper.toDto(s);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ServicioDto> getAllServicios() {
        List<Servicio> s = repository.findAll();
        if (s.isEmpty()) throw new NoSuchElementException("El servicio no existe");
        return mapper.toDtoList(s);
    }

    @Override
    public void eliminarServicio(Long id) {
        if(id==null || id < 0) throw new IllegalArgumentException("El id no puede ser nulo o menor a  0");
        Servicio s = repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("El servicio no existe"));
        repository.delete(s);
    }

    @Override
    public void actualizarServicio(Long id,ServicioDto servicio) {
        if(servicio==null) throw new IllegalArgumentException("El servicio no puede ser nulo");
        Servicio s = mapper.toEntity(servicio);
        Servicio sExistente = repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("El servicio no existe"));
        sExistente.setNombre(s.getNombre());
        sExistente.setDescripcion(s.getDescripcion());
        sExistente.setUsuario(s.getUsuario());
        sExistente.setTipo(s.getTipo());
        sExistente.setPrecio(s.getPrecio());
        sExistente.setEstado(s.getEstado());
        List<Calificacion> c = cRepo.findAllById(servicio.calificacionesIds());
        sExistente.setCalificaciones(c);
        repository.save(sExistente);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ServicioDto> buscarServicioPorNombre(String nombre) {
        List<Servicio> lista = repository.findAll();
        if (lista.isEmpty()) throw new NoSuchElementException("El servicio no existe");
        List<Servicio> listaFiltrada = lista.stream()
                .filter(s -> s.getNombre().equals(nombre))
                .collect(Collectors.toList());
        return mapper.toDtoList(listaFiltrada);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ServicioDto> buscarServiciosPorTipo(String tipo) {
        EstadoServicio estado = switch (tipo) {
            case "SOLICITADO" -> EstadoServicio.SOLICITADO;
            case "APROBADO" -> EstadoServicio.APROBADO;
            case "PENDIENTE" -> EstadoServicio.PENDIENTE;
            default -> throw new NoSuchElementException("El servicio no existe");
        };
        List<Servicio> listaFiltrada = repository.findByEstado(estado);
        if (listaFiltrada.isEmpty()) {
            throw new NoSuchElementException("No se encontraron servicios con el tipo: " + tipo);
        }
        return mapper.toDtoList(listaFiltrada);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ServicioDto> buscarServiciosPorNombreYPrecio(String nombre, Integer precio) {
        if(nombre == null || precio <0) throw new IllegalArgumentException("El nombre no puede ser negativo");
        List<Servicio> lista = repository.findByNombre(nombre);
        if (lista.isEmpty()) throw new NoSuchElementException("El servicio no existe");
        List<Servicio> listaFiltrada = lista.stream()
                .filter(s -> s.getPrecio() <= precio)
                .collect(Collectors.toList());
        return mapper.toDtoList(listaFiltrada);
    }

    @Override
    public void cambiarEstadoServicioPorIdServicio(Long id, String estado) {
        if(id <0 || estado == null) throw new IllegalArgumentException("El id no puede ser negativo");
        Servicio s = repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("El servicio no existe"));
        EstadoServicio e = switch (estado) {
            case "SOLICITADO" -> EstadoServicio.SOLICITADO;
            case "APROBADO" -> EstadoServicio.APROBADO;
            case "PENDIENTE" -> EstadoServicio.PENDIENTE;
            default -> throw new NoSuchElementException("El servicio no existe");
        };
        s.setEstado(e);
        repository.save(s);
    }
}
