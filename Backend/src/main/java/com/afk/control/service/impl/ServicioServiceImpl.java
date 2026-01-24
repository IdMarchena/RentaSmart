package com.afk.control.service.impl;
import com.afk.control.dto.ServicioDto;
import com.afk.control.mapper.ServicioMapper;
import com.afk.control.service.ServicioService;
import com.afk.model.entity.Calificacion;
import com.afk.model.entity.Servicio;
import com.afk.model.entity.enums.EstadoServicio;
import com.afk.model.entity.enums.TipoServicio;
import com.afk.model.repository.CalificacionRepository;
import com.afk.model.repository.ServicioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
@Slf4j
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
        s.setEstado(EstadoServicio.ACTIVO);
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
    public boolean eliminarServicio(Long id) {
        if(id==null || id < 0) throw new IllegalArgumentException("El id no puede ser nulo o menor a  0");
        Servicio s = repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("El servicio no existe"));
        try{
            repository.delete(s);
            return true;
        } catch (Exception e) {
            return false;
        }

    }

    @Override
    public ServicioDto actualizarServicio(Long id,ServicioDto servicio) {
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
        sExistente.setUbicacion(s.getUbicacion());
        List<Calificacion> c = cRepo.findAllById(servicio.calificacionesIds());
        sExistente.setCalificaciones(c);
        return mapper.toDto(repository.save(sExistente));
    }

    @Override
    @Transactional(readOnly = true)
    public List<ServicioDto> buscarServicioPorNombre(String nombre) {

        if (nombre == null || nombre.trim().isEmpty()) {
            throw new IllegalArgumentException("El nombre de búsqueda no puede ser vacío");
        }

        String criterio = nombre.trim().toLowerCase();
        log.info("🔍 Buscando servicios que contengan: [{}]", criterio);

        List<Servicio> servicios = repository.findAll();

        log.info("📦 Total servicios en BD: {}", servicios.size());

        List<Servicio> filtrados = servicios.stream()
                .filter(s -> {
                    String nombreServicio = s.getNombre() != null
                            ? s.getNombre().toLowerCase().trim()
                            : "";
                    boolean match = nombreServicio.contains(criterio);

                    log.debug("➡️ Comparando '{}' con '{}' => {}", nombreServicio, criterio, match);
                    return match;
                })
                .collect(Collectors.toList());

        log.info("✅ Servicios encontrados: {}", filtrados.size());

        return mapper.toDtoList(filtrados);
    }

    @Override
    @Transactional(readOnly = true)
    public List<ServicioDto> buscarServiciosPorTipo(String tipo) {
        TipoServicio t;
        try {
            t = TipoServicio.valueOf(tipo.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new NoSuchElementException("El tipo no existe: " + tipo);
        }
        List<Servicio> lista = repository.findAll();
        if (lista.isEmpty()) {
            throw new NoSuchElementException("No se encontraron servicios con el tipo: " + tipo);
        }
        List<Servicio> listaFiltrada = lista.stream()
                                        .filter(s -> s.getTipo().equals(t))
                                        .collect(Collectors.toList());
        return mapper.toDtoList(listaFiltrada);
    }
    @Override
    @Transactional(readOnly = true)
    public List<ServicioDto> buscarServiciosPorEstado(String tipo) {
        EstadoServicio estado;
        try {
            estado = EstadoServicio.valueOf(tipo.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new NoSuchElementException("El tipo no existe: " + tipo);
        }
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
        EstadoServicio es;
        try{
            es = EstadoServicio.valueOf(estado.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("El estado no existe: " + estado);
        }
        s.setEstado(es);
        repository.save(s);
    }
    @Override
    @Transactional(readOnly = true)
    public List<ServicioDto> getServicesByUserId(Long id){
        List<Servicio> services= repository.findAll();
        if(services.isEmpty()) throw new NoSuchElementException("No se encontraron servicios");

        List<Servicio> listaFiltrada = services.stream()
                .filter(s -> s.getUsuario().getId().equals(id))
                .collect(Collectors.toList());
        return mapper.toDtoList(listaFiltrada);
    }
}
