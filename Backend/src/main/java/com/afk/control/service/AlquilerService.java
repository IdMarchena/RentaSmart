package com.afk.control.service;



import java.util.List;

public interface AlquilerService {
    AlquilerDto createAlquiler(AlquilerDto alquiler);
    AlquilerDto findAlquilerById(Long id);
    List<AlquilerDto> findAllAlquileres();
    void deleteAlquilerById(Long id);
}
