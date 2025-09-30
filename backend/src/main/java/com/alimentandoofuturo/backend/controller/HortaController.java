
// Controller REST para gerenciamento de hortas
// Expõe endpoints para criar e listar hortas
package com.alimentandoofuturo.backend.controller;


// Importações necessárias para o controller de hortas
import com.alimentandoofuturo.backend.model.Horta;
import com.alimentandoofuturo.backend.service.HortaService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import jakarta.validation.Valid;


// Indica que esta classe é um controller REST
@RestController
// Define o prefixo dos endpoints deste controller
@RequestMapping("/api/hortas")
// Permite requisições de qualquer origem (CORS)
@CrossOrigin(origins = "*")
public class HortaController {


    // Logger para registrar informações e erros
    private static final Logger logger = LoggerFactory.getLogger(HortaController.class);
    // Service responsável pela lógica de hortas
    private final HortaService hortaService;

    // Injeção de dependência via construtor
    public HortaController(HortaService hortaService) {
        this.hortaService = hortaService;
    }


    /**
     * Endpoint para criar uma nova horta
     * Recebe os dados da horta via JSON
     * Retorna a horta criada ou erro
     */
    @PostMapping
    public ResponseEntity<?> criarHorta(@Valid @RequestBody Horta horta) {
        try {
            logger.info("Criando horta: {}", horta.getNome());
            Horta novaHorta = hortaService.criarHorta(horta, horta.getUsuarioResponsavel().getId());
            return ResponseEntity.ok(novaHorta);
        } catch (Exception e) {
            logger.error("Erro ao criar horta: {}", e.getMessage(), e);
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        }
    }


    /**
     * Endpoint para listar todas as hortas cadastradas
     * Retorna uma lista de hortas
     */
    @GetMapping
    public ResponseEntity<List<Horta>> listarHortas() {
        return ResponseEntity.ok(hortaService.buscarTodas());
    }

    @GetMapping("/usuario/{usuarioId}")
    public ResponseEntity<List<Horta>> listarHortasPorUsuario(@PathVariable Long usuarioId) {
        return ResponseEntity.ok(hortaService.buscarPorUsuario(usuarioId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Horta> buscarHorta(@PathVariable Long id) {
        return hortaService.buscarPorId(id)
            .map(ResponseEntity::ok)
            .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarHorta(@PathVariable Long id, @RequestBody Horta dadosAtualizacao) {
        try {
            Horta horta = hortaService.atualizarHorta(id, dadosAtualizacao);
            return ResponseEntity.ok(horta);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        }
    }
}