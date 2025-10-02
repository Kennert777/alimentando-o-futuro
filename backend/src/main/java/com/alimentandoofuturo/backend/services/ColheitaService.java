package com.alimentandoofuturo.backend.services;

import com.alimentandoofuturo.backend.model.entity.Colheita;
import com.alimentandoofuturo.backend.model.repository.ColheitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ColheitaService {

    @Autowired
    private ColheitaRepository colheitaRepository;

    public Colheita registrarColheita(Colheita colheita) {
        colheita.setDataRegistro(LocalDateTime.now());
        return colheitaRepository.save(colheita);
    }

    public List<Colheita> buscarTodas() {
        return colheitaRepository.findAll();
    }

    public Optional<Colheita> buscarPorId(Long id) {
        return colheitaRepository.findById(id);
    }

    public List<Colheita> buscarPorUsuario(Long usuarioId) {
        return colheitaRepository.findByUsuarioId(usuarioId);
    }

    public List<Colheita> buscarPorHorta(Long hortaId) {
        return colheitaRepository.findByHortaId(hortaId);
    }

    public List<Colheita> buscarPorPeriodo(LocalDate inicio, LocalDate fim) {
        return colheitaRepository.findByDataColheitaBetween(inicio, fim);
    }

    public Double getTotalProducao(Long usuarioId) {
        return colheitaRepository.getTotalProducaoByUsuario(usuarioId);
    }

    public Colheita atualizarColheita(Long id, Colheita dadosAtualizacao) {
        Colheita colheita = colheitaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Colheita não encontrada"));
        
        if (dadosAtualizacao.getProduto() != null) {
            colheita.setProduto(dadosAtualizacao.getProduto());
        }
        if (dadosAtualizacao.getQuantidade() != null) {
            colheita.setQuantidade(dadosAtualizacao.getQuantidade());
        }
        if (dadosAtualizacao.getQualidade() != null) {
            colheita.setQualidade(dadosAtualizacao.getQualidade());
        }
        if (dadosAtualizacao.getObservacoes() != null) {
            colheita.setObservacoes(dadosAtualizacao.getObservacoes());
        }
        
        return colheitaRepository.save(colheita);
    }

    public void excluirColheita(Long id) {
        colheitaRepository.deleteById(id);
    }
}