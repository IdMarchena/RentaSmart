package com.afk.control.service.impl;
import com.afk.control.dto.FacturaDto;
import com.afk.control.mapper.FacturaMapper;
import com.afk.control.service.FacturaService;
import com.afk.model.entity.*;
import com.afk.model.entity.enums.EstadoPago;
import com.afk.model.repository.FacturaRepository;
import com.afk.model.repository.UsuarioRepository;
import com.afk.model.repository.ContratoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FacturaServiceImpl implements FacturaService {

    private final FacturaRepository facturaRepository;
    private final UsuarioRepository usuarioRepository;
    private final ReporteMantenimientoRepository reporteMantenimientoRepository;
    private final ContratoRepository contratoRepository;
    private final FacturaMapper facturaMapper;

    @Override
    public List<FacturaDto> getAllFacturas() {
        List<Factura> facturas = facturaRepository.findAll();
        return facturas.stream()
                .map(facturaMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public FacturaDto getFacturaById(Long id) {
        Factura factura = facturaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Factura no encontrada"));
        return facturaMapper.toDto(factura);
    }

    @Override
    public FacturaDto createFactura(FacturaDto facturaDto) {
        Factura factura = facturaMapper.toEntity(facturaDto);

        // Puedes agregar más lógica aquí si es necesario, como validar que el usuario, el reporte y el contrato existen

        Factura savedFactura = facturaRepository.save(factura);
        return facturaMapper.toDto(savedFactura);
    }

    @Override
    public FacturaDto updateFactura(Long id, FacturaDto dto) {
        Factura existingFactura = facturaRepository.findById(id).orElseThrow(() ->
                new NoSuchElementException("Calificación con ID " + id + " no encontrada"));
        facturaMapper.updateEntityFromDto(dto, existingFactura);
        Factura updatedFactura = facturaRepository.save(existingFactura);
        return facturaMapper.toDto(updatedFactura);
    }

    @Override
    public void deleteFactura(Long id) {
        Factura factura = facturaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Factura no encontrada"));
        facturaRepository.delete(factura);
    }

    @Override
    public List<FacturaDto> getFacturasByUsuario(Long idUsuario) {
        List<Factura> facturas = facturaRepository.findByUsuarioId(idUsuario);
        return facturas.stream()
                .map(facturaMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<FacturaDto> getFacturasByContrato(Long idContrato) {
        List<Factura> facturas = facturaRepository.findByContratoId(idContrato);
        return facturas.stream()
                .map(facturaMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public FacturaDto generateFacturaForContrato(Long idContrato) {
        Contrato contrato = contratoRepository.findById(idContrato)
                .orElseThrow(() -> new RuntimeException("Contrato no encontrado"));
        ReporteMantenimiento reporteMantenimiento = reporteMantenimientoRepository.findByContratoId(contrato.getId());

        Factura newFactura = Factura.builder()
                .fechaEmision(LocalDateTime.now())
                .detalle("Factura generada automáticamente para contrato " + contrato.getId())
                .usuario(contrato.getUsuarioArrendatario())
                .reporteMantenimiento(reporteMantenimiento)
                .contrato(contrato)
                .servicio(contrato.getInmueble().getServicio())
                .build();

        Factura savedFactura = facturaRepository.save(newFactura);
        return facturaMapper.toDto(savedFactura);
    }

    @Override
    public String getFacturaPagoStatus(Long id) {
        Factura factura = facturaRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Factura no encontrada"));

        return factura.getPago() != null && factura.getPago().getEstado().equals(EstadoPago.COMPLETADO) ? "Pagado" : "Pendiente";
    }


}
