package com.alimentandoofuturo.backend.service;

import com.alimentandoofuturo.backend.model.Horta;
import com.alimentandoofuturo.backend.model.Usuario;
import com.alimentandoofuturo.backend.repository.HortaRepository;
import com.alimentandoofuturo.backend.repository.UsuarioRepository;
import com.alimentandoofuturo.backend.exception.UserNotFoundException;
import com.alimentandoofuturo.backend.config.AppConstants;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class HortaService {

    private final HortaRepository hortaRepository;
    private final UsuarioRepository usuarioRepository;
    private final UsuarioService usuarioService;

    public HortaService(HortaRepository hortaRepository, UsuarioRepository usuarioRepository, UsuarioService usuarioService) {
        this.hortaRepository = hortaRepository;
        this.usuarioRepository = usuarioRepository;
        this.usuarioService = usuarioService;
    }

    public Horta criarHorta(Horta horta, Long usuarioId) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
            .orElseThrow(() -> new UserNotFoundException("Usuário não encontrado"));
        
        horta.setUsuarioResponsavel(usuario);
        horta.setDataCriacao(LocalDateTime.now());
        horta.setDataUltimaAtualizacao(LocalDateTime.now());
        
        Horta novaHorta = hortaRepository.save(horta);
        
        // Adicionar pontos ao usuário
        usuarioService.adicionarPontos(usuarioId, AppConstants.POINTS_FOR_CREATING_HORTA);
        
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