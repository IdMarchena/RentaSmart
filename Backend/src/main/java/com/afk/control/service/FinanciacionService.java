package com.afk.control.service;

import com.afk.control.dto.FinanciacionDto;

import java.util.List;

public interface FinanciacionService {
    FinanciacionDto crearFinanciacion(FinanciacionDto financiacionDto);
    void actualizarFinanciacion(Long id, FinanciacionDto financiacionDto);
    void eliminarFinanciacion(Long id);
    List<FinanciacionDto> listarFinanciaciones();
    FinanciacionDto buscarFinanciacion(Long id);
    List<FinanciacionDto> generarPlanDePagos(Long financiacionId);
    List<FinanciacionDto> simularPlanDePagos(Integer numeroCuotas,Float montoTotal,Float interes);
    boolean esFinanciacionValida(Long financiacionId);
}
