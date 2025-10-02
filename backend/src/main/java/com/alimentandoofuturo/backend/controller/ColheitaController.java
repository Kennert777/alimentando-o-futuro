package com.alimentandoofuturo.backend.controller;

import com.alimentandoofuturo.backend.model.entity.Colheita;
import com.alimentandoofuturo.backend.services.ColheitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/colheita")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:8686"})
public class ColheitaController {

    @Autowired
    private ColheitaService colheitaService;

    @PostMapping
    public ResponseEntity<?> registrarColheita(@Valid @RequestBody Colheita colheita) {
        try {
            Colheita novaColheita = colheitaService.registrarColheita(colheita);
            return ResponseEntity.ok(novaColheita);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<List<Colheita>> listarColheitas() {
        List<Colheita> colheitas = colheitaService.buscarTodas();
        return ResponseEntity.ok(colheitas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarColheita(@PathVariable Long id) {
        return colheitaService.buscarPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Colheita>> buscarColheitasPorUsuario(@PathVariable Long usuarioId) {
        List<Colheita> colheitas = colheitaService.buscarPorUsuario(usuarioId);
        return ResponseEntity.ok(colheitas);
    }

    @GetMapping("/horta/{hortaId}")
    public ResponseEntity<List<Colheita>> buscarColheitasPorHorta(@PathVariable Long hortaId) {
        List<Colheita> colheitas = colheitaService.buscarPorHorta(hortaId);
        return ResponseEntity.ok(colheitas);
    }

    @GetMapping("/periodo")
    public ResponseEntity<List<Colheita>> buscarColheitasPorPeriodo(
            @RequestParam LocalDate inicio, 
            @RequestParam LocalDate fim) {
        List<Colheita> colheitas = colheitaService.buscarPorPeriodo(inicio, fim);
        return ResponseEntity.ok(colheitas);
    }

    @GetMapping("/producao/total/{usuarioId}")
    public ResponseEntity<Map<String, Double>> getTotalProducao(@PathVariable Long usuarioId) {
        Double total = colheitaService.getTotalProducao(usuarioId);
        return ResponseEntity.ok(Map.of("totalProducao", total != null ? total : 0.0));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarColheita(@PathVariable Long id, @Valid @RequestBody Colheita dadosAtualizacao) {
        try {
            Colheita colheita = colheitaService.atualizarColheita(id, dadosAtualizacao);
            return ResponseEntity.ok(colheita);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluirColheita(@PathVariable Long id) {
        try {
            colheitaService.excluirColheita(id);
            return ResponseEntity.ok(Map.of("mensagem", "Colheita excluída com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        }
    }
}