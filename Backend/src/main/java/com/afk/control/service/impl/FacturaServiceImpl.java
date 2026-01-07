package com.afk.control.service.impl;
import com.afk.control.dto.FacturaDto;
import com.afk.control.dto.PagoDto;
import com.afk.control.mapper.FacturaMapper;
import com.afk.control.mapper.PagoMapper;
import com.afk.control.service.FacturaService;
import com.afk.model.entity.*;
import com.afk.model.entity.enums.EstadoPago;
import com.afk.model.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class FacturaServiceImpl implements FacturaService {

    private final FacturaRepository facturaRepository;
    private final UsuarioRepository usuarioRepository;
    private final ContratoRepository contratoRepository;
    private final FacturaMapper facturaMapper;
    private final TipoPagoRepository tipoPagoRepository;
    private final PagoMapper pagoMapper;

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

        Factura newFactura = Factura.builder()
                .fechaEmision(LocalDateTime.now())
                .detalle("Factura generada automáticamente para contrato " + contrato.getId())
                .usuario(contrato.getUsuarioArrendatario())
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

    @Override
    @Transactional
    public FacturaDto generarFacturaDesdePago(PagoDto pago) {
        TipoPago tipoPago = tipoPagoRepository.findById(pago.idTipo())
                .orElseThrow(() -> new RuntimeException("Tipo de pago no encontrado"));

        Usuario usuario = usuarioRepository.findById(pago.idUsuario())
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        String detalleEspecifico = "Pago por concepto de " + tipoPago.getDescripcion();
        Contrato contratoRef = null;

        if ("CONTRATO".equalsIgnoreCase(tipoPago.getDescripcion())) {
            contratoRef = contratoRepository.findById(pago.origenId()).orElse(null);
            if (contratoRef != null) {
                detalleEspecifico += " #" + contratoRef.getId() + " - Inmueble: " + contratoRef.getInmueble().getNombre();
            }
        }
        Factura factura = Factura.builder()
                .fechaEmision(LocalDateTime.now())
                .detalle(detalleEspecifico)
                .usuario(usuario)
                .pago(pagoMapper.toEntity(pago))
                .contrato(contratoRef)
                .estado(pago.estado())
                .servicio(null)
                .build();

        return facturaMapper.toDto(facturaRepository.save(factura));
    }


}
