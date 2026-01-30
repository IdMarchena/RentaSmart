package com.afk.control.service;


import com.afk.control.dto.PublicacionDto;

import java.util.List;

public interface PublicacionService {
    PublicacionDto crearPublicacion(PublicacionDto publicacionDto);
    PublicacionDto actualizarPublicacion(Long id, PublicacionDto publicacionDto);
    void eliminarPublicacion(Long id);
    List<PublicacionDto> obtenerTodasLasPublicaciones();
    PublicacionDto obtenerPublicacionPorId(Long id);
    List<PublicacionDto> listarPublicacionesPorEstado(String estado);
    List<PublicacionDto> listarPublicacionesPorTitulo(String titulo);
    List<PublicacionDto> listarPublicacionesPorPrecioMenor(Double precioMenor);
    List<PublicacionDto> listarPublicacionesPorPrecioEntreMenorYMayor(Double precioMenor,Double precioMayor);
    List<PublicacionDto> listarPublicacionesPorNombreInmueble(String nombreInmueble);
    List<PublicacionDto> listarPublicacionesPorUbicacionInmueble(String ubicaciion);
    List<PublicacionDto> listarPublicacionesPorEstratoInmueble(String estratoInmueble);
    List<PublicacionDto> ListarPublicacionesByUbicacionAndEstado(Long ubicacionId, String estado);
    List<PublicacionDto> ListarPublicacionesByNombreAndEstrato(String nombre, Integer estrato);
    List<PublicacionDto> finInmueblesByIdArrendatario(Long idArrendario);
    void cambiarEstadoPublicacion(Long id, String estado);
    List<PublicacionDto> listarPublicacionesByIdArrendador(Long id);
    List<PublicacionDto> listarPublicacionesPorPrecioMayor(Double precioMayor);

    List<PublicacionDto> obtenerTop6Publicaciones();

    List<PublicacionDto> listarPublicacionesPorTipo(String tipo);

    List<PublicacionDto> listarPublicacionesPorUbicacion(String ubicacion);


}