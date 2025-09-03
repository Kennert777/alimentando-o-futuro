package com.alimentandoofuturo.backend.service;

import com.alimentandoofuturo.backend.model.Horta;
import com.alimentandoofuturo.backend.model.Usuario;
import com.alimentandoofuturo.backend.repository.HortaRepository;
import com.alimentandoofuturo.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class HortaService {

    @Autowired
    private HortaRepository hortaRepository;

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private UsuarioService usuarioService;

    public Horta criarHorta(Horta horta, Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        horta.setUsuarioResponsavel(usuario);
        horta.setDataCriacao(LocalDateTime.now());
        horta.setDataUltimaAtualizacao(LocalDateTime.now());
        
        Horta novaHorta = hortaRepository.save(horta);
        
        // Adicionar pontos ao usuário
        usuarioService.adicionarPontos(usuarioId, 50);
        
        return novaHorta;
    }

    public List<Horta> buscarTodas() {
        return hortaRepository.findAll();
    }

    public List<Horta> buscarPorUsuario(Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        return hortaRepository.findByUsuarioResponsavel(usuario);
    }

    public Optional<Horta> buscarPorId(Long id) {
        return hortaRepository.findById(id);
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
        if (dadosAtualizacao.getStatus() != null) {
            horta.setStatus(dadosAtualizacao.getStatus());
        }
        
        horta.setDataUltimaAtualizacao(LocalDateTime.now());
        
        return hortaRepository.save(horta);
    }
}