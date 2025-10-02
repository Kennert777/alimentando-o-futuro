package com.alimentandoofuturo.backend.services;

import com.alimentandoofuturo.backend.model.entity.Horta;
import com.alimentandoofuturo.backend.model.repository.HortaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class HortaService {

    @Autowired
    private HortaRepository hortaRepository;

    public Horta criarHorta(Horta horta) {
        horta.setDataCriacao(LocalDateTime.now());
        return hortaRepository.save(horta);
    }

    public List<Horta> buscarTodas() {
        return hortaRepository.findAll();
    }

    public Optional<Horta> buscarPorId(Long id) {
        return hortaRepository.findById(id);
    }

    public List<Horta> buscarPorUsuario(Long usuarioId) {
        return hortaRepository.findByUsuarioId(usuarioId);
    }

    public List<Horta> buscarPorStatus(Horta.StatusHorta status) {
        return hortaRepository.findByStatus(status);
    }

    public Horta atualizarHorta(Long id, Horta dadosAtualizacao) {
        Horta horta = hortaRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Horta não encontrada"));
        
        if (dadosAtualizacao.getNome() != null) {
            horta.setNome(dadosAtualizacao.getNome());
        }
        if (dadosAtualizacao.getDescricao() != null) {
            horta.setDescricao(dadosAtualizacao.getDescricao());
        }
        if (dadosAtualizacao.getTipoPlantio() != null) {
            horta.setTipoPlantio(dadosAtualizacao.getTipoPlantio());
        }
        if (dadosAtualizacao.getAreaM2() != null) {
            horta.setAreaM2(dadosAtualizacao.getAreaM2());
        }
        if (dadosAtualizacao.getStatus() != null) {
            horta.setStatus(dadosAtualizacao.getStatus());
        }
        
        return hortaRepository.save(horta);
    }

    public void excluirHorta(Long id) {
        hortaRepository.deleteById(id);
    }
}