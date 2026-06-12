package com.afk.control.service.impl;
import com.afk.control.dto.InmuebleDto;
import com.afk.control.mapper.InmuebleMapper;
import com.afk.control.service.InmuebleService;
import com.afk.model.entity.Inmueble;
import com.afk.model.entity.Ubicacion;
import com.afk.model.entity.Usuario;
import com.afk.model.entity.enums.EstadoInmueble;
import com.afk.model.entity.enums.TipoInmueble;
import com.afk.model.repository.InmuebleRepository;
import com.afk.model.repository.UbicacionRepository;
import com.afk.model.repository.UsuarioRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;
@Slf4j
@Service
@RequiredArgsConstructor // Genera el constructor para todos los campos "private final"
public class InmuebleServiceImpl implements InmuebleService {

    // 1. TODOS deben ser "private final" para que Lombok los inyecte correctamente
    private final InmuebleRepository inmuebleRepository;
    private final InmuebleMapper inmuebleMapper;
    private final UbicacionRepository ubicacionRepository;
    private final UsuarioRepository usuarioRepository;

    @Override
    @Transactional // 2. IMPORTANTE: Necesitas una transacción para manejar relaciones
    public InmuebleDto createInmueble(InmuebleDto inmuebleDto) {
        if (inmuebleDto == null) throw new IllegalArgumentException("inmuebleDto cannot be null");

        // 3. Validar duplicados (ahora verificamos antes de guardar)
        List<Inmueble> existentes = inmuebleRepository.findByNombre(inmuebleDto.nombre());
        if (!existentes.isEmpty()) {
            throw new IllegalArgumentException("El inmueble con nombre '" + inmuebleDto.nombre() + "' ya existe");
        }

        log.info("🏠 Intentando crear inmueble con nombre: {}", inmuebleDto.nombre());

        // 4. Convertir DTO a Entidad
        Inmueble inmueble = inmuebleMapper.toEntity(inmuebleDto);

        // 5. Vincular Ubicación
        if (inmuebleDto.idUbicacion() != null) {
            log.info("📍 Buscando ubicación ID: {}", inmuebleDto.idUbicacion());
            Ubicacion ubicacion = ubicacionRepository.findById(inmuebleDto.idUbicacion())
                    .orElseThrow(() -> new NoSuchElementException("La ubicación con ID " + inmuebleDto.idUbicacion() + " no existe"));
            inmueble.setUbicacion(ubicacion);
        } else {
            throw new IllegalArgumentException("El ID de ubicación es obligatorio");
        }

        // 6. Vincular Arrendatario (Usuario)
        if (inmuebleDto.idArrendatario() != null) {
            log.info("👤 Buscando usuario ID: {}", inmuebleDto.idArrendatario());
            Usuario arrendatario = usuarioRepository.findById(inmuebleDto.idArrendatario())
                    .orElseThrow(() -> new NoSuchElementException("El usuario con ID " + inmuebleDto.idArrendatario() + " no existe"));
            inmueble.setUsuario(arrendatario);
        }
        // Ajustar número de pisos si es nulo o cero
        if (inmueble.getNumeroPisos() == null || inmueble.getNumeroPisos() == 0) {
            inmueble.setNumeroPisos(1);
        }

        // 7. Guardar
        Inmueble savedInmueble = inmuebleRepository.save(inmueble);
        log.info("✅ Inmueble guardado exitosamente con ID: {}", savedInmueble.getId());

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
                .filter(inmueble -> false)
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
        EstadoInmueble e;
        try{
            e=EstadoInmueble.valueOf(estado.toUpperCase());
        } catch (IllegalArgumentException ex) {
            throw new RuntimeException("Estado inmueble con estado " + estado + " no encontrado");
        }
        List<Inmueble> inmuebles = inmuebleRepository.findAll();
        if(inmuebles.isEmpty()) throw new IllegalArgumentException("inmuebles cannot be empty");
        List<Inmueble> listaFiltada = inmuebles.stream()
                .filter(inmueble -> inmueble.getEstadoInmueble().equals(e) && inmueble.getUbicacion().getId().equals(ubicacionId))
                .collect(Collectors.toList());
        return inmuebleMapper.toDtoList(listaFiltada);
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
        EstadoInmueble es;
        if (estado != null) {
            try{
                es = EstadoInmueble.valueOf(estado.toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Estado inmueble con estado " + estado + " no encontrado");
            }
            i.setEstadoInmueble(es);
        }
    }

    @Override
    public void eliminarHabitacionDeUnInmueblePorHabitacionId(Long idInmueble, Integer cantidadHabitaciones) {
        Inmueble i = inmuebleRepository.findById(idInmueble)
                .orElseThrow(() -> new NoSuchElementException("no se encontro"));
        Integer numeroHabitaciones = i.getNumeroHabitaciones();
        if(numeroHabitaciones<cantidadHabitaciones) throw new IllegalArgumentException("numeroHabitaciones invalido");
        i.setNumeroHabitaciones(numeroHabitaciones-cantidadHabitaciones);
        inmuebleRepository.save(i);
    }



    @Override
    @Transactional(readOnly = true)
    public Integer contarHabitacionesPorInmuebleId(Long id){
        Inmueble a = inmuebleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Apartamento no encontrado"));
        if(a.getNumeroHabitaciones()==null){
            throw new RuntimeException("apartamento con 0 habitaciones");
        }
        return a.getNumeroHabitaciones();
    }
    @Override
    @Transactional(readOnly = true)
    public List<InmuebleDto> findInmuebleByTipo(String tipo){
        TipoInmueble t;
        try{
            t = TipoInmueble.valueOf(tipo.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("el tipo de inmueble no es valido");
        }
        List<Inmueble> lista = inmuebleRepository.findAll();
        if(lista.isEmpty()) throw new IllegalArgumentException("inmuebles cannot be empty");
        List<Inmueble> listFiltrada=lista.stream()
                .filter(i -> i.getTipo().equals(t))
                .collect(Collectors.toList());
        return inmuebleMapper.toDtoList(listFiltrada);
    }
    @Override
    @Transactional(readOnly = true)
    public List<InmuebleDto> findInmuebleByNumeroPisos(Integer numeroPisos){
        List<Inmueble> lista = inmuebleRepository.findAll();
        if(lista.isEmpty()) throw new IllegalArgumentException("inmuebles cannot be empty");
        List<Inmueble> listFiltrada=lista.stream()
                .filter(i -> i.getNumeroPisos().equals(numeroPisos))
                .collect(Collectors.toList());
        return inmuebleMapper.toDtoList(listFiltrada);
    }
    @Override
    @Transactional(readOnly = true)
    public List<InmuebleDto> findInmuebleByNumeroBanos(Integer numeroBanos){
        List<Inmueble> lista = inmuebleRepository.findAll();
        if(lista.isEmpty()) throw new IllegalArgumentException("inmuebles cannot be empty");
        List<Inmueble> listFiltrada=lista.stream()
                .filter(i -> i.getNumeroPisos().equals(numeroBanos))
                .collect(Collectors.toList());
        return inmuebleMapper.toDtoList(listFiltrada);
    }
    @Override
    @Transactional(readOnly = true)
    public List<InmuebleDto> findInmuebleByCapacidadPersonas(Integer capacidadPersonas){
        List<Inmueble> lista = inmuebleRepository.findAll();
        if(lista.isEmpty()) throw new IllegalArgumentException("inmuebles cannot be empty");
        List<Inmueble> listFiltrada=lista.stream()
                .filter(i -> i.getNumeroPisos().equals(capacidadPersonas))
                .collect(Collectors.toList());
        return inmuebleMapper.toDtoList(listFiltrada);
    }
}
