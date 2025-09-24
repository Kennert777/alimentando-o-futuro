package com.alimentandoofuturo.backend.controller;

import com.alimentandoofuturo.backend.service.RelatorioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/relatorios")
@CrossOrigin(origins = {"http://localhost:5173", "https://*.netlify.app", "https://alimentando-o-futuro.netlify.app"})
public class RelatorioController {

    @Autowired
    private RelatorioService relatorioService;

    @GetMapping("/csv/{usuarioId}")
    public ResponseEntity<byte[]> exportarCsv(@PathVariable Long usuarioId) {
        try {
            byte[] csvData = relatorioService.gerarRelatorioCsv(usuarioId);
            
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
            headers.setContentDispositionFormData("attachment", "relatorio-hortas.csv");
            
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(csvData);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/graficos/{usuarioId}")
    public ResponseEntity<Map<String, Object>> dadosGraficos(@PathVariable Long usuarioId) {
        try {
            Map<String, Object> dados = relatorioService.gerarDadosGraficos(usuarioId);
            return ResponseEntity.ok(dados);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/producao-mensal/{usuarioId}")
    public ResponseEntity<Map<String, Object>> producaoMensal(@PathVariable Long usuarioId) {
        try {
            Map<String, Object> dados = relatorioService.gerarProducaoMensal(usuarioId);
            return ResponseEntity.ok(dados);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}