package com.afk.control.service.impl;

import com.afk.control.dto.DepositoDto;
import com.afk.control.mapper.DepositoMapper;
import com.afk.control.service.DepositoService;
import com.afk.model.entity.Deposito;
import com.afk.model.repository.DepositoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DepositoServiceImpl implements DepositoService {

    private final DepositoRepository depositoRepository;
    private final DepositoMapper depositoMapper;

    @Override
    @Transactional
    public DepositoDto createDeposito(DepositoDto depositoDto) {
        Deposito deposito = depositoMapper.toEntity(depositoDto);
        Deposito savedDeposito = depositoRepository.save(deposito);
        return depositoMapper.toDto(savedDeposito);
    }

    @Override
    @Transactional(readOnly = true)
    public DepositoDto findDepositoById(Long id) {
        Deposito deposito = depositoRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Deposito con ID " + id + " no encontrado"));
        return depositoMapper.toDto(deposito);
    }

    @Override
    @Transactional(readOnly = true)
    public List<DepositoDto> findAllDepositos() {
        List<Deposito> depositos = depositoRepository.findAll();
        return depositos.stream()
                .map(depositoMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional
    public void deleteDepositoById(Long id) {
        if (!depositoRepository.existsById(id)) {
            throw new NoSuchElementException("Deposito con ID " + id + " no encontrado");
        }
        depositoRepository.deleteById(id);
    }

    @Override
    @Transactional
    public DepositoDto updateDeposito(Long id, DepositoDto depositoDto) {
        Deposito deposito = depositoRepository.findById(id)
                .orElseThrow(() -> new NoSuchElementException("Deposito con ID " + id + " no encontrado"));
        deposito.setMontoTotal(depositoDto.montoTotal());
        Deposito updatedDeposito = depositoRepository.save(deposito);
        return depositoMapper.toDto(updatedDeposito);
    }
}
