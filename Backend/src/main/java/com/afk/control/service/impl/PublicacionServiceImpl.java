package com.afk.control.service.impl;

import com.afk.control.dto.*;
import com.afk.control.mapper.*;
import com.afk.control.service.*;
import com.afk.model.entity.Calificacion;
import com.afk.model.entity.Inmueble;
import com.afk.model.entity.Multimedia;
import com.afk.model.entity.Publicacion;
import com.afk.model.entity.enums.EstadoPublicacion;
import com.afk.model.repository.PublicacionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
import java.util.stream.StreamSupport;

@Service
@RequiredArgsConstructor
public class PublicacionServiceImpl implements PublicacionService {
    private final PublicacionRepository repository;
    private final PublicacionMapper mapper;

    private final InmuebleService iService;
    private final InmuebleMapper iMapper;

    private final CalificacionService cService;
    private final CalificacionMapper cMapper;

    private final UsuarioService uService;
    private final UsuarioMapper uMapper;

    private final MultimediaService mService;
    private final MultimediaMapper mMapper;


    @Override
    public PublicacionDto crearPublicacion(PublicacionDto publicacionDto) {
        if(publicacionDto==null) throw new IllegalArgumentException("El publicacion no puede ser nulo");
        Publicacion p = mapper.toEntity(publicacionDto);
        p.setFechaPublicacion(LocalDateTime.now());
        return mapper.toDto(repository.save(p));
    }

    @Override
    public PublicacionDto actualizarPublicacion(Long id, PublicacionDto publicacionDto) {
        if(id == null || id < 0 || publicacionDto == null) throw new IllegalArgumentException("El id no puede ser nulo");
        Publicacion p = repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("El id no existe en el sistema"));
        p.setTitulo(publicacionDto.titulo());
        p.setDesripcion(publicacionDto.descripcion());

        InmuebleDto i = iService.findInmuebleById(publicacionDto.idInmueble());
        Inmueble iE=iMapper.toEntity(i);

        p.setInmueble(iE);
        p.setFechaPublicacion(publicacionDto.fechaPublicacion());
        p.setEstadoPublicacion(publicacionDto.estadoPublicacion());

        List<CalificacionDto> calificaciones = cService.encontrarCalificacionesPorId(publicacionDto.calificacionesIds());
        p.setCalificaciones(cMapper.toEntityList(calificaciones));

        UsuarioDto u = uService.findUsuarioById(publicacionDto.idUsuario());
        p.setUsuario(uMapper.toEntity(u));

        p.setPrecio(publicacionDto.precio());

        List<MultimediaDto> m = mService.findAllMultimediasByIds(publicacionDto.multimediaIds());
        p.setMultimedia(mMapper.toEntityList(m));
        return mapper.toDto(repository.save(p));
    }

    @Override
    public void eliminarPublicacion(Long id) {
        if(id == null || id < 0) throw new IllegalArgumentException("El id no puede ser nulo");
        Publicacion p = repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("El id no existe en el sistema"));
        repository.delete(p);
    }

    @Override
    public List<PublicacionDto> obtenerTodasLasPublicaciones() {
        List<Publicacion> listaPublicaciones = repository.findAll();
        if(listaPublicaciones.isEmpty()) throw new NoSuchElementException("No existe las publicaciones");
        return mapper.toDtoList(listaPublicaciones);
    }

    @Override
    public PublicacionDto obtenerPublicacionPorId(Long id) {
        if(id == null || id < 0) throw new IllegalArgumentException("El id no puede ser nulo");
        Publicacion p = repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("El id no existe en el sistema"));
        return mapper.toDto(p);
    }

    @Override
    public List<PublicacionDto> listarPublicacionesPorEstado(String estado) {
        List<Publicacion> listaPublicaciones = repository.findAll();
        if(listaPublicaciones.isEmpty()) throw new NoSuchElementException("No existe las publicaciones");
        List<Publicacion> listFiltrada = listaPublicaciones.stream()
                .filter(publicacion -> publicacion.getEstadoPublicacion().equals(estado))
                .collect(Collectors.toList());
        return mapper.toDtoList(listFiltrada);
    }

    @Override
    public List<PublicacionDto> listarPublicacionesPorTitulo(String titulo) {
        List<Publicacion> listaPublicaciones = repository.findAll();
        if(listaPublicaciones.isEmpty()) throw new NoSuchElementException("No existe las publicaciones");
        List<Publicacion> listFiltrada = listaPublicaciones.stream()
                .filter(publicacion -> publicacion.getTitulo().equals(titulo))
                .collect(Collectors.toList());
        return mapper.toDtoList(listFiltrada);
    }

    @Override
    public List<PublicacionDto> listarPublicacionesPorPrecioMenor(Double precioMenor) {
        List<Publicacion> listaPublicaciones = repository.findAll();
        if(listaPublicaciones.isEmpty()) throw new NoSuchElementException("No existe las publicaciones");
        List<Publicacion> listFiltrada = listaPublicaciones.stream()
                .filter(publicacion -> publicacion.getPrecio()<=precioMenor)
                .collect(Collectors.toList());
        return mapper.toDtoList(listFiltrada);
    }

    @Override
    public List<PublicacionDto> listarPublicacionesPorPrecioEntreMenorYMayor(Double precioMenor, Double precioMayor) {
        List<Publicacion> listaPublicaciones = repository.findAll();
        if(listaPublicaciones.isEmpty()) throw new NoSuchElementException("No existe las publicaciones");
        List<Publicacion> listFiltrada = listaPublicaciones.stream()
                .filter(publicacion -> publicacion.getPrecio()>=precioMenor  && publicacion.getPrecio()<=precioMayor)
                .collect(Collectors.toList());
        return mapper.toDtoList(listFiltrada);
    }

    @Override
    public List<PublicacionDto> listarPublicacionesPorNombreInmueble(String nombreInmueble) {
        List<Publicacion> listaPublicaciones = repository.findAll();
        if(listaPublicaciones.isEmpty()) throw new NoSuchElementException("No existe las publicaciones");
        List<Publicacion> listFiltrada = listaPublicaciones.stream()
                .filter(publicacion -> publicacion.getInmueble().getNombre().equals(nombreInmueble))
                .collect(Collectors.toList());
        return mapper.toDtoList(listFiltrada);
    }

    @Override
    public List<PublicacionDto> listarPublicacionesPorUbicacionInmueble(String ubicaciion) {
        List<Publicacion> listaPublicaciones = repository.findAll();
        if(listaPublicaciones.isEmpty()) throw new NoSuchElementException("No existe las publicaciones");
        List<Publicacion> listFiltrada = listaPublicaciones.stream()
                .filter(publicacion -> publicacion.getInmueble().getUbicacion().getNombre().equals(ubicaciion))
                .collect(Collectors.toList());
        return mapper.toDtoList(listFiltrada);
    }

    @Override
    public List<PublicacionDto> listarPublicacionesPorEstratoInmueble(String estratoInmueble) {
        List<Publicacion> listaPublicaciones = repository.findAll();
        if(listaPublicaciones.isEmpty()) throw new NoSuchElementException("No existe las publicaciones");
        List<Publicacion> listFiltrada = listaPublicaciones.stream()
                .filter(publicacion -> publicacion.getInmueble().getEstrato().equals(estratoInmueble))
                .collect(Collectors.toList());
        return mapper.toDtoList(listFiltrada);
    }

    @Override
    public List<PublicacionDto> ListarPublicacionesByUbicacionAndEstado(Long ubicacionId, String estado) {
        List<Publicacion> listaPublicaciones = repository.findAll();
        if(listaPublicaciones.isEmpty()) throw new NoSuchElementException("No existe las publicaciones");
        List<Publicacion> listFiltrada = listaPublicaciones.stream()
                .filter(publicacion -> publicacion.getInmueble().getUbicacion().getId().equals(ubicacionId) && publicacion.getEstadoPublicacion().equals(estado))
                .collect(Collectors.toList());
        return mapper.toDtoList(listFiltrada);
    }

    @Override
    public List<PublicacionDto> ListarPublicacionesByNombreAndEstrato(String nombre, Integer estrato) {
        List<Publicacion> listaPublicaciones = repository.findAll();
        if(listaPublicaciones.isEmpty()) throw new NoSuchElementException("No existe las publicaciones");
        List<Publicacion> listFiltrada = listaPublicaciones.stream()
                .filter(publicacion -> publicacion.getInmueble().getUbicacion().getNombre().equals(nombre) && publicacion.getEstadoPublicacion().equals(estrato))
                .collect(Collectors.toList());
        return mapper.toDtoList(listFiltrada);
    }

    @Override
    public List<PublicacionDto> finInmueblesByIdArrendatario(Long idArrendario) {
        List<Publicacion> listaPublicaciones = repository.findAll();
        if(listaPublicaciones.isEmpty()) throw new NoSuchElementException("No existe las publicaciones");
        List<Publicacion> listFiltrada = listaPublicaciones.stream()
                .filter(publicacion -> publicacion.getUsuario().getId().equals(idArrendario))
                .collect(Collectors.toList());
        return mapper.toDtoList(listFiltrada);
    }

    @Override
    public void cambiarEstadoPublicacion(Long id, String estado) {
        if(id == null || id < 0 || estado == null) throw new IllegalArgumentException("El id no puede ser nulo ni el estado");
        Publicacion p = repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("El id no existe en el sistema"));
        EstadoPublicacion e = switch (estado) {
            case "BORRADOR" -> EstadoPublicacion.BORRADOR;
            case "PUBLICADA" -> EstadoPublicacion.PUBLICADA;
            case "EDITADA" -> EstadoPublicacion.EDITADA;
            case "REPORTADA" -> EstadoPublicacion.REPORTADA;
            case "ELIMINADA" -> EstadoPublicacion.ELIMINADA;
            default -> throw new NoSuchElementException("El estado no existe en el sistema");
        };
        p.setEstadoPublicacion(e);
        repository.save(p);
    }
    @Override
    public List<PublicacionDto> listarPublicacionesByIdArrendador(Long id){
        List<Publicacion> listaPublicaciones = repository.findAll();
        if(listaPublicaciones.isEmpty()) throw new NoSuchElementException("No existe las publicaciones");
        List<Publicacion> publicacion = listaPublicaciones.stream()
                .filter(p -> p.getUsuario().getId().equals(id))
                .toList();
        return mapper.toDtoList(publicacion);

    }
    @Override
    public List<PublicacionDto> listarPublicacionesPorPrecioMayor(Double precioMayor) {
        List<Publicacion> listaPublicaciones = repository.findAll();
        if(listaPublicaciones.isEmpty()) throw new NoSuchElementException("No existe las publicaciones");
        List<Publicacion> listFiltrada = listaPublicaciones.stream()
                .filter(publicacion -> publicacion.getPrecio()>=precioMayor)
                .collect(Collectors.toList());
        return mapper.toDtoList(listFiltrada);
    }

    @Override
    public List<PublicacionDto> obtenerTop6Publicaciones() {
        List<Publicacion> publicaciones = repository.findAll();
        List<PublicacionDto> publicacionesConPromedio = publicaciones.stream()
                .map(publicacion -> {
                    double promedio = 0;
                    List<Calificacion> calificaciones = publicacion.getCalificaciones();
                    if (!calificaciones.isEmpty()) {
                        promedio = calificaciones.stream()
                                .mapToInt(Calificacion::getPuntaje)
                                .average()
                                .orElse(0);
                    }
                    return new PublicacionDto(
                            publicacion.getId(),
                            publicacion.getTitulo(),
                            publicacion.getDesripcion(),
                            publicacion.getInmueble().getId(),
                            publicacion.getFechaPublicacion(),
                            publicacion.getEstadoPublicacion(),
                            obtenerIdsCalificaciones(publicacion.getCalificaciones()),
                            publicacion.getUsuario().getId(),
                            publicacion.getPrecio(),
                            obtenerIdsMultimedias(publicacion.getMultimedia())
                    );
                })
                .sorted(Comparator.comparingDouble(this::calcularPromedio).reversed())
                .limit(6)
                .collect(Collectors.toList());

        return publicacionesConPromedio;
    }

    private double calcularPromedio(PublicacionDto publicacionDto) {
        Publicacion p = mapper.toEntity(publicacionDto);
        List<Calificacion> calificaciones = p.getCalificaciones();
        if (calificaciones.isEmpty()) return 0;
        return calificaciones.stream()
                .mapToInt(Calificacion::getPuntaje)
                .average()
                .orElse(0);
    }
    private List<Long> obtenerIdsCalificaciones(List<Calificacion> calificaciones) {
        return calificaciones.stream()
                .map(Calificacion::getId)
                .collect(Collectors.toList());
    }
    private List<Long> obtenerIdsMultimedias(List<Multimedia> multimedias) {
        return multimedias.stream()
                .map(Multimedia::getId)
                .collect(Collectors.toList());
    }
}