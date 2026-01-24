package com.afk.control.service;

import com.afk.control.dto.ServicioDto;

import java.util.List;

public interface ServicioService {
    ServicioDto crearServicio(ServicioDto servicio);
    ServicioDto getServicioById(Long id);
    List<ServicioDto> getAllServicios();
    boolean eliminarServicio(Long id);
    ServicioDto actualizarServicio(Long id,ServicioDto servicio);
    List<ServicioDto> buscarServicioPorNombre(String nombre);
    List<ServicioDto> buscarServiciosPorTipo(String tipo);
    List<ServicioDto> buscarServiciosPorNombreYPrecio(String nombre,Integer precio);
    void cambiarEstadoServicioPorIdServicio(Long id, String estado);
    List<ServicioDto> buscarServiciosPorEstado(String estado);
    List<ServicioDto> getServicesByUserId(Long id);
}
