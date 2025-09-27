package com.afk.control.service;

import com.afk.control.dto.DepositoDto;

import java.util.List;

public interface DepositoService {
    DepositoDto createDeposito(DepositoDto depositoDto);
    DepositoDto findDepositoById(Long id);
    List<DepositoDto> findAllDepositos();
    void deleteDepositoById(Long id);
    DepositoDto updateDeposito(Long id,DepositoDto depositoDto);
}
