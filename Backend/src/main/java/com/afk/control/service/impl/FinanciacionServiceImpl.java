package com.afk.control.service.impl;

import com.afk.control.dto.FinanciacionDto;
import com.afk.control.mapper.FinanciacionMapper;
import com.afk.control.service.FinanciacionService;
import com.afk.model.entity.Financiacion;
import com.afk.model.repository.FinanciacionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;

@RequiredArgsConstructor
@Service
public class FinanciacionServiceImpl implements FinanciacionService {

    private final FinanciacionRepository repository;
    private final FinanciacionMapper mapper;

    @Override
    public FinanciacionDto crearFinanciacion(FinanciacionDto financiacionDto) {
        if (financiacionDto == null) throw new NullPointerException("El financiacion no puede ser nulo");
        Financiacion financiacion = mapper.toEntity(financiacionDto);
        return mapper.toDto(repository.save(financiacion));
    }

    @Override
    public void actualizarFinanciacion(Long id, FinanciacionDto financiacionDto) {
        if(id<0  || financiacionDto == null) throw new NoSuchElementException("El id del financiacion no puede ser nulo");
        Financiacion f = repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("El id del financiacion no existe"));
        f.setNumeroCuotas(financiacionDto.numeroCuotas());
        f.setValorCuota(financiacionDto.valorCuota());
        f.setMontoTotal(financiacionDto.montoTotal());
        f.setInteres(financiacionDto.interes());
        repository.save(f);
    }

    @Override
    public void eliminarFinanciacion(Long id) {
        if(id<0) throw new NoSuchElementException("El id del financiacion no puede ser nulo");
        Financiacion f = repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("El id del financiacion no existe"));
        repository.delete(f);
    }

    @Override
    public List<FinanciacionDto> listarFinanciaciones() {
        List<Financiacion> financiaciones = repository.findAll();
        if(financiaciones.isEmpty()) throw new NoSuchElementException("No existe el financiacion");
        return mapper.toDtoList(financiaciones);
    }

    @Override
    public FinanciacionDto buscarFinanciacion(Long id) {
        if(id<0) throw new NoSuchElementException("El id del financiacion no puede ser nulo");
        Financiacion f = repository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("El id del financiacion no existe"));
        return mapper.toDto(f);
    }
    private List<FinanciacionDto> getFinanciacionDtos(int totalCuotas, float montoTotal, float interes) {
        float montoConInteres = montoTotal + (montoTotal * interes / 100);
        float valorCuota = montoConInteres / totalCuotas;
        float saldoRestante = montoConInteres;
        List<FinanciacionDto> plan = new java.util.ArrayList<>();
        for (int cuota = 1; cuota <= totalCuotas; cuota++) {
            saldoRestante -= valorCuota;
            plan.add(new FinanciacionDto(
                            null,
                            cuota,
                            Math.round(valorCuota),
                            Math.max(saldoRestante, 0f),
                            interes
                    )
            );
        }

        return plan;
    }

    @Override
    public List<FinanciacionDto> generarPlanDePagos(Long financiacionId) {
        Financiacion f = repository.findById(financiacionId)
                .orElseThrow(() -> new NoSuchElementException("La financiación no existe"));
        int totalCuotas = f.getNumeroCuotas();
        float montoTotal = f.getMontoTotal();
        float interes = f.getInteres();
        return getFinanciacionDtos(totalCuotas, montoTotal, interes);
    }



    @Override
    public List<FinanciacionDto> simularPlanDePagos(Integer numeroCuotas, Float montoTotal, Float interes) {
        if (numeroCuotas == null || numeroCuotas <= 0) {
            throw new IllegalArgumentException("Número de cuotas inválido");
        }
        if (montoTotal == null || montoTotal <= 0) {
            throw new IllegalArgumentException("Monto total inválido");
        }
        if (interes == null || interes < 0) {
            throw new IllegalArgumentException("Interés inválido");
        }
        return getFinanciacionDtos(numeroCuotas, montoTotal, interes);
    }

    @Override
    public boolean esFinanciacionValida(Long financiacionId) {
        if (financiacionId == null || financiacionId < 0) {
            return false;
        }
        Financiacion f = repository.findById(financiacionId).orElse(null);
        if (f == null) {
            return false;
        }
        return f.getNumeroCuotas() != null && f.getNumeroCuotas() > 0
                && f.getMontoTotal() != null && f.getMontoTotal() > 0
                && f.getInteres() != null && f.getInteres() >= 0;
    }
}
