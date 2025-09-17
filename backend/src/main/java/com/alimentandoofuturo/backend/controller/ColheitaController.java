package com.alimentandoofuturo.backend.controller;

import com.alimentandoofuturo.backend.model.Colheita;
import com.alimentandoofuturo.backend.service.ColheitaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/colheitas")
@CrossOrigin(origins = "*")
public class ColheitaController {

    @Autowired
    private ColheitaService colheitaService;

    @PostMapping
    public ResponseEntity<?> criarColheita(@RequestBody Colheita colheita) {
        try {
            System.out.println("Recebendo colheita: " + colheita.getTipoPlanta());
            Colheita novaColheita = colheitaService.criarColheita(colheita);
            return ResponseEntity.ok(novaColheita);
        } catch (Exception e) {
            System.out.println("Erro ao criar colheita: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        }
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Colheita>> listarColheitasPorUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(colheitaService.buscarPorUsuario(usuarioId));
    }

    @GetMapping
    public ResponseEntity<List<Colheita>> listarColheitas() {
        return ResponseEntity.ok(colheitaService.buscarTodas());
    }
}