package com.afk.control.service;


import com.afk.control.dto.ContratoDto;

import java.time.YearMonth;
import java.util.List;
import java.util.Map;

public interface ContratoService {
    ContratoDto createContrato(ContratoDto contratos);
    ContratoDto findContratoById(Long id);
    List<ContratoDto> findAllContratos();
    ContratoDto updateContrato(Long id, ContratoDto contrato);
    void deleteContratoById(Long id);
    List<ContratoDto> findContratoByUsuario(Long idUsuario);

    List<ContratoDto> findContratosComoArrendador(Long idUsuario);


    List<ContratoDto> findContratosComoArrendatario(Long idUsuario);


    List<ContratoDto> findContratosActivosComoArrendador(Long idUsuario);
    List<ContratoDto> findContratosActivosComoArrendatario(Long idUsuario);


    List<ContratoDto> findContratosFinalizadosComoArrendador(Long idUsuario);
    List<ContratoDto> findContratosFinalizadosComoArrendatario(Long idUsuario);



    List<ContratoDto> findContratosByInmueble(Long idInmueble);
    boolean inmuebleTieneContratoActivo(Long idInmueble);



    Long contarContratosComoArrendador(Long idUsuario);
    Long contarContratosComoArrendatario(Long idUsuario);


    Map<YearMonth, Long> contarContratosPorMesComoArrendador(Long idUsuario);
    Map<YearMonth, Long> contarContratosPorMesComoArrendatario(Long idUsuario);


    Double calcularIngresoTotalComoArrendador(Long idUsuario);
    Double calcularIngresoComoArrendador(Long idUsuario);
    Map<YearMonth, Double> calcularIngresoPorMesComoArrendador(Long idUsuario);


    List<ContratoDto> findContratosProximosAVencer(Long idUsuario, int dias);
}
