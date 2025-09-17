package com.alimentandoofuturo.backend.service;

import com.alimentandoofuturo.backend.model.Colheita;
import com.alimentandoofuturo.backend.repository.ColheitaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class ColheitaService {

    @Autowired
    private ColheitaRepository colheitaRepository;
    
    @Autowired
    private UsuarioService usuarioService;

    public Colheita criarColheita(Colheita colheita) {
        colheita.setDataRegistro(LocalDateTime.now());
        Colheita novaColheita = colheitaRepository.save(colheita);
        
        // Adicionar pontos ao usuário (50 pontos por colheita)
        usuarioService.adicionarPontos(colheita.getUsuario().getId(), 50);
        
        return novaColheita;
    }

    public List<Colheita> buscarPorUsuario(Long usuarioId) {
        return colheitaRepository.findByUsuarioId(usuarioId);
    }

    public List<Colheita> buscarTodas() {
        return colheitaRepository.findAll();
    }
}