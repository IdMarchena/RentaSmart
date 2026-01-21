package com.afk.control.service;

import com.afk.control.dto.FacturaDto;
import com.afk.control.dto.PagoDto;

import java.util.List;

public interface FacturaService {
    List<FacturaDto> getAllFacturas();
    FacturaDto getFacturaById(Long id);
    FacturaDto createFactura(FacturaDto facturaDto);
    FacturaDto updateFactura(Long id, FacturaDto facturaDto);
    void deleteFactura(Long id);
    List<FacturaDto> getFacturasByUsuario(Long idUsuario);
    List<FacturaDto> getFacturasByContrato(Long idContrato);
    FacturaDto generateFacturaForContrato(Long idContrato);
    String getFacturaPagoStatus(Long id);
    FacturaDto generarFacturaDesdePago(String tipoFactura,PagoDto pago);
}
