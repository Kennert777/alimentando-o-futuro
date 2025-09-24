package com.alimentandoofuturo.backend.service;

import com.alimentandoofuturo.backend.model.Localizacao;
import com.alimentandoofuturo.backend.repository.LocalizacaoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class LocalizacaoService {

    @Autowired
    private LocalizacaoRepository localizacaoRepository;

    public Localizacao salvar(Localizacao localizacao) {
        return localizacaoRepository.save(localizacao);
    }

    public List<Localizacao> listarTodas() {
        return localizacaoRepository.findAll();
    }

    public List<Localizacao> buscarPorRegiao(String estado, String cidade) {
        if (estado != null && cidade != null) {
            return localizacaoRepository.findByEstadoAndCidade(estado, cidade);
        } else if (estado != null) {
            return localizacaoRepository.findByEstado(estado);
        } else {
            return localizacaoRepository.findAll();
        }
    }

    public void excluir(Long id) {
        localizacaoRepository.deleteById(id);
    }
}