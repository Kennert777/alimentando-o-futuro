package com.alimentandoofuturo.backend.controller;

import com.alimentandoofuturo.backend.model.entity.Horta;
import com.alimentandoofuturo.backend.services.HortaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/horta")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:8686"})
public class HortaController {

    @Autowired
    private HortaService hortaService;

    @PostMapping
    public ResponseEntity<?> criarHorta(@Valid @RequestBody Horta horta) {
        try {
            Horta novaHorta = hortaService.criarHorta(horta);
            return ResponseEntity.ok(novaHorta);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<List<Horta>> listarHortas() {
        List<Horta> hortas = hortaService.buscarTodas();
        return ResponseEntity.ok(hortas);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarHorta(@PathVariable Long id) {
        return hortaService.buscarPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Horta>> buscarHortasPorUsuario(@PathVariable Long usuarioId) {
        List<Horta> hortas = hortaService.buscarPorUsuario(usuarioId);
        return ResponseEntity.ok(hortas);
    }

    @GetMapping("/status/{status}")
    public ResponseEntity<List<Horta>> buscarHortasPorStatus(@PathVariable Horta.StatusHorta status) {
        List<Horta> hortas = hortaService.buscarPorStatus(status);
        return ResponseEntity.ok(hortas);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarHorta(@PathVariable Long id, @Valid @RequestBody Horta dadosAtualizacao) {
        try {
            Horta horta = hortaService.atualizarHorta(id, dadosAtualizacao);
            return ResponseEntity.ok(horta);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluirHorta(@PathVariable Long id) {
        try {
            hortaService.excluirHorta(id);
            return ResponseEntity.ok(Map.of("mensagem", "Horta excluída com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        }
    }
}