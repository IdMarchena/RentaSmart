package com.afk.control.service.impl;

import com.afk.control.dto.*;
import com.afk.control.mapper.*;
import com.afk.control.service.*;
import com.afk.model.entity.*;
import com.afk.model.entity.enums.EstadoPublicacion;
import com.afk.model.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Comparator;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;
@Slf4j
@Service
@RequiredArgsConstructor
public class PublicacionServiceImpl implements PublicacionService {

    private final PublicacionRepository repository;
    private final PublicacionMapper mapper;

    private final InmuebleMapper iMapper;
    private final InmuebleRepository iRepository;

    private final CalificacionRepository calificacionRepository;
    private final CalificacionMapper cMapper;

    private final UsuarioRepository usuarioRepository;
    private final UsuarioMapper uMapper;

    private final MultimediaRepository multimediaRepository;
    private final MultimediaMapper mMapper;
    @Transactional
    @Override
    public PublicacionDto crearPublicacion(PublicacionDto dto) {
        log.info("Creando publicacion");
        log.info("este es el id del inmueble: "+dto.idInmueble());
        log.info("este es el id del usuario: "+dto.idUsuario());
        if(dto.multimedia().isEmpty())throw new NoSuchElementException("multimedia nulo, debe haber una imagen por lo menos ");
        if(dto.idInmueble()==null)throw new NoSuchElementException("inmueble nulo, debe haber una imagen por lo menos ");
        if(dto.idUsuario()==null)throw new NoSuchElementException("usuario nulo, debe haber una imagen por lo menos ");
        // 1. Convertir a entidad
        Publicacion p = mapper.toEntity(dto);
        p.setFechaPublicacion(LocalDateTime.now());

        // 2. RECUPERAR RELACIONES (Obligatorio para que Hibernate no intente crear nuevos)
        p.setUsuario(usuarioRepository.findById(dto.idUsuario())
                .orElseThrow(() -> new NoSuchElementException("Usuario no encontrado")));
        p.setInmueble(iRepository.findById(dto.idInmueble())
                .orElseThrow(() -> new NoSuchElementException("Inmueble no encontrado")));

        // 3. VÍNCULO BIDIRECCIONAL (La clave del éxito)
        // El "mappedBy" en Publicacion delega la responsabilidad a Multimedia
        if (p.getMultimedia() != null && !p.getMultimedia().isEmpty()) {
            p.getMultimedia().forEach(m -> {
                m.setPublicacion(p); // Le decimos a cada foto quién es su publicación padre
            });
        } else {
            // Log preventivo para depurar en consola si el DTO llega vacío
            System.out.println("ADVERTENCIA: La lista de multimedia llegó vacía al Service");
        }

        // 4. PERSISTENCIA
        // CascadeType.ALL hará que se disparen los inserts de Multimedia
        Publicacion guardada = repository.save(p);

        return mapper.toDto(guardada);
    }

    @Override
    @Transactional
    public PublicacionDto actualizarPublicacion(Long id, PublicacionDto publicacionDto) {
        if(id == null || id < 0 || publicacionDto == null) throw new IllegalArgumentException("El id no puede ser nulo");

        Publicacion p = repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("La publicación no existe"));

        // Actualizar campos básicos
        p.setTitulo(publicacionDto.titulo());
        p.setDescripcion(publicacionDto.descripcion());
        p.setPrecio(publicacionDto.precio());
        p.setEstadoPublicacion(publicacionDto.estadoPublicacion());

        // Actualizar Inmueble y Usuario
        p.setInmueble(iRepository.findById(publicacionDto.idInmueble()).orElseThrow());
        p.setUsuario(usuarioRepository.findById(publicacionDto.idUsuario()).orElseThrow());

        // --- CORRECCIÓN DE MULTIMEDIA ---
        // Convertimos los DTOs que vienen en el request a entidades
        if (publicacionDto.multimedia() != null) {
            List<Multimedia> nuevasMultimedias = publicacionDto.multimedia().stream()
                    .map(dto -> {
                        Multimedia m = mMapper.toEntity(dto);
                        m.setPublicacion(p); // Importante: mantener vínculo
                        return m;
                    }).collect(Collectors.toList());

            // Gracias a orphanRemoval = true, esto reemplaza las anteriores
            p.getMultimedia().clear();
            p.getMultimedia().addAll(nuevasMultimedias);
        }

        return mapper.toDto(repository.save(p));
    }
    @Transactional
    @Override
    public void eliminarPublicacion(Long id) {
        if(id == null || id < 0) throw new IllegalArgumentException("El id no puede ser nulo");
        Publicacion p = repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("El id no existe en el sistema"));
        repository.delete(p);
    }

    @Transactional(readOnly = true)
    @Override
    public List<PublicacionDto> obtenerTodasLasPublicaciones() {
        List<Publicacion> listaPublicaciones = repository.findAll();
        if(listaPublicaciones.isEmpty()) throw new NoSuchElementException("No existe las publicaciones");
        return mapper.toDtoList(listaPublicaciones);
    }
    @Transactional(readOnly = true)
    @Override
    public PublicacionDto obtenerPublicacionPorId(Long id) {
        if(id == null || id < 0) throw new IllegalArgumentException("El id no puede ser nulo");
        Publicacion p = repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("El id no existe en el sistema" + id));
        System.out.println("📌 Publicación ID: " + p.getId());
        System.out.println("🏠 Inmueble asociado: " +
                (p.getInmueble() != null ? p.getInmueble().getId() : "NULL"));
        return mapper.toDto(p);
    }
    @Transactional(readOnly = true)
    @Override
    public List<PublicacionDto> listarPublicacionesPorEstado(String estado) {
        List<Publicacion> listaPublicaciones = repository.findAll();
        if(listaPublicaciones.isEmpty()) throw new NoSuchElementException("No existe las publicaciones");
        List<Publicacion> listFiltrada = listaPublicaciones.stream()
                .filter(publicacion -> publicacion.getEstadoPublicacion().equals(estado))
                .collect(Collectors.toList());
        return mapper.toDtoList(listFiltrada);
    }
    @Transactional(readOnly = true)
    @Override
    public List<PublicacionDto> listarPublicacionesPorTitulo(String titulo) {
        List<Publicacion> listaPublicaciones = repository.findAll();
        if(listaPublicaciones.isEmpty()) throw new NoSuchElementException("No existe las publicaciones");
        List<Publicacion> listFiltrada = listaPublicaciones.stream()
                .filter(publicacion -> publicacion.getTitulo().equals(titulo))
                .collect(Collectors.toList());
        return mapper.toDtoList(listFiltrada);
    }
    @Transactional(readOnly = true)
    @Override
    public List<PublicacionDto> listarPublicacionesPorPrecioMenor(Double precioMenor) {
        List<Publicacion> listaPublicaciones = repository.findAll();
        if(listaPublicaciones.isEmpty()) throw new NoSuchElementException("No existe las publicaciones");
        List<Publicacion> listFiltrada = listaPublicaciones.stream()
                .filter(publicacion -> publicacion.getPrecio()<=precioMenor)
                .collect(Collectors.toList());
        return mapper.toDtoList(listFiltrada);
    }
    @Transactional(readOnly = true)
    @Override
    public List<PublicacionDto> listarPublicacionesPorPrecioEntreMenorYMayor(Double precioMenor, Double precioMayor) {
        List<Publicacion> listaPublicaciones = repository.findAll();
        if(listaPublicaciones.isEmpty()) throw new NoSuchElementException("No existe las publicaciones");
        List<Publicacion> listFiltrada = listaPublicaciones.stream()
                .filter(publicacion -> publicacion.getPrecio()>=precioMenor  && publicacion.getPrecio()<=precioMayor)
                .collect(Collectors.toList());
        return mapper.toDtoList(listFiltrada);
    }
    @Transactional(readOnly = true)
    @Override
    public List<PublicacionDto> listarPublicacionesPorNombreInmueble(String nombreInmueble) {
        List<Publicacion> listaPublicaciones = repository.findAll();
        if(listaPublicaciones.isEmpty()) throw new NoSuchElementException("No existe las publicaciones");
        List<Publicacion> listFiltrada = listaPublicaciones.stream()
                .filter(publicacion -> publicacion.getInmueble().getNombre().equals(nombreInmueble))
                .collect(Collectors.toList());
        return mapper.toDtoList(listFiltrada);
    }
    @Transactional(readOnly = true)
    @Override
    public List<PublicacionDto> listarPublicacionesPorUbicacionInmueble(String ubicaciion) {
        List<Publicacion> listaPublicaciones = repository.findAll();
        if(listaPublicaciones.isEmpty()) throw new NoSuchElementException("No existe las publicaciones");
        List<Publicacion> listFiltrada = listaPublicaciones.stream()
                .filter(publicacion -> publicacion.getInmueble().getUbicacion().getNombre().equals(ubicaciion))
                .collect(Collectors.toList());
        return mapper.toDtoList(listFiltrada);
    }
    @Transactional(readOnly = true)
    @Override
    public List<PublicacionDto> listarPublicacionesPorEstratoInmueble(String estratoInmueble) {
        List<Publicacion> listaPublicaciones = repository.findAll();
        if(listaPublicaciones.isEmpty()) throw new NoSuchElementException("No existe las publicaciones");
        List<Publicacion> listFiltrada = listaPublicaciones.stream()
                .filter(publicacion -> publicacion.getInmueble().getEstrato().equals(estratoInmueble))
                .collect(Collectors.toList());
        return mapper.toDtoList(listFiltrada);
    }
    @Transactional(readOnly = true)
    @Override
    public List<PublicacionDto> ListarPublicacionesByUbicacionAndEstado(Long ubicacionId, String estado) {
        List<Publicacion> listaPublicaciones = repository.findAll();
        if(listaPublicaciones.isEmpty()) throw new NoSuchElementException("No existe las publicaciones");
        List<Publicacion> listFiltrada = listaPublicaciones.stream()
                .filter(publicacion -> publicacion.getInmueble().getUbicacion().getId().equals(ubicacionId) && publicacion.getEstadoPublicacion().equals(estado))
                .collect(Collectors.toList());
        return mapper.toDtoList(listFiltrada);
    }
    @Transactional(readOnly = true)
    @Override
    public List<PublicacionDto> ListarPublicacionesByNombreAndEstrato(String nombre, Integer estrato) {
        List<Publicacion> listaPublicaciones = repository.findAll();
        if(listaPublicaciones.isEmpty()) throw new NoSuchElementException("No existe las publicaciones");
        List<Publicacion> listFiltrada = listaPublicaciones.stream()
                .filter(publicacion -> publicacion.getInmueble().getUbicacion().getNombre().equals(nombre) && publicacion.getEstadoPublicacion().equals(estrato))
                .collect(Collectors.toList());
        return mapper.toDtoList(listFiltrada);
    }
    @Transactional(readOnly = true)
    @Override
    public List<PublicacionDto> finInmueblesByIdArrendatario(Long idArrendario) {
        List<Publicacion> listaPublicaciones = repository.findAll();
        if(listaPublicaciones.isEmpty()) throw new NoSuchElementException("No existe las publicaciones");
        List<Publicacion> listFiltrada = listaPublicaciones.stream()
                .filter(publicacion -> publicacion.getUsuario().getId().equals(idArrendario))
                .collect(Collectors.toList());
        return mapper.toDtoList(listFiltrada);
    }
    @Transactional(readOnly = true)
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
    @Transactional(readOnly = true)
    @Override
    public List<PublicacionDto> listarPublicacionesByIdArrendador(Long id){
        List<Publicacion> listaPublicaciones = repository.findAll();
        if(listaPublicaciones.isEmpty()) throw new NoSuchElementException("No existe las publicaciones");
        List<Publicacion> publicacion = listaPublicaciones.stream()
                .filter(p -> p.getUsuario().getId().equals(id))
                .toList();
        return mapper.toDtoList(publicacion);

    }
    @Transactional(readOnly = true)
    @Override
    public List<PublicacionDto> listarPublicacionesPorPrecioMayor(Double precioMayor) {
        List<Publicacion> listaPublicaciones = repository.findAll();
        if(listaPublicaciones.isEmpty()) throw new NoSuchElementException("No existe las publicaciones");
        List<Publicacion> listFiltrada = listaPublicaciones.stream()
                .filter(publicacion -> publicacion.getPrecio()>=precioMayor)
                .collect(Collectors.toList());
        return mapper.toDtoList(listFiltrada);
    }
    @Transactional(readOnly = true)
    @Override
    public List<PublicacionDto> obtenerTop6Publicaciones() {
        List<Publicacion> publicaciones = repository.findAll();

        return publicaciones.stream()
                .sorted(Comparator.comparingDouble(this::calcularPromedioEntidad).reversed())
                .limit(6)
                .map(mapper::toDto)
                .collect(Collectors.toList());
    }

    private double calcularPromedioEntidad(Publicacion p) {
        Set<Calificacion> calificaciones = p.getCalificaciones();
        if (calificaciones == null || calificaciones.isEmpty()) {
            return 0;
        }
        return calificaciones.stream()
                .mapToInt(Calificacion::getPuntaje)
                .average()
                .orElse(0);
    }
}