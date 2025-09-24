package com.alimentandoofuturo.backend.controller;

import com.alimentandoofuturo.backend.model.Localizacao;
import com.alimentandoofuturo.backend.service.LocalizacaoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/localizacoes")
@CrossOrigin(origins = {"http://localhost:5173", "https://*.netlify.app", "https://alimentando-o-futuro.netlify.app"})
public class LocalizacaoController {

    @Autowired
    private LocalizacaoService localizacaoService;

    @PostMapping
    public ResponseEntity<Localizacao> criarLocalizacao(@RequestBody Localizacao localizacao) {
        try {
            Localizacao novaLocalizacao = localizacaoService.salvar(localizacao);
            return ResponseEntity.ok(novaLocalizacao);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping
    public ResponseEntity<List<Localizacao>> listarLocalizacoes() {
        List<Localizacao> localizacoes = localizacaoService.listarTodas();
        return ResponseEntity.ok(localizacoes);
    }

    @GetMapping("/regiao")
    public ResponseEntity<List<Localizacao>> buscarPorRegiao(
            @RequestParam(required = false) String estado,
            @RequestParam(required = false) String cidade) {
        List<Localizacao> localizacoes = localizacaoService.buscarPorRegiao(estado, cidade);
        return ResponseEntity.ok(localizacoes);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Localizacao> atualizarLocalizacao(
            @PathVariable Long id, 
            @RequestBody Localizacao localizacao) {
        try {
            localizacao.setId(id);
            Localizacao localizacaoAtualizada = localizacaoService.salvar(localizacao);
            return ResponseEntity.ok(localizacaoAtualizada);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluirLocalizacao(@PathVariable Long id) {
        try {
            localizacaoService.excluir(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }
}