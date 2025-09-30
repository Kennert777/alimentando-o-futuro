
// Controller REST para geração e exportação de relatórios
// Permite exportar dados em CSV, PDF e gráficos
package com.alimentandoofuturo.backend.controller;

import com.alimentandoofuturo.backend.service.RelatorioService;
import com.alimentandoofuturo.backend.service.RelatorioPdfService;
import com.alimentandoofuturo.backend.model.Usuario;
import com.alimentandoofuturo.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


// Indica que esta classe é um controller REST
@RestController
// Define o prefixo dos endpoints deste controller
@RequestMapping("/api/relatorios")
// Permite requisições de origens específicas (CORS)
@CrossOrigin(origins = {"http://localhost:5173", "https://*.netlify.app", "https://alimentando-o-futuro.netlify.app"})
public class RelatorioController {


    // Service para geração de relatórios em CSV e gráficos
    @Autowired
    private RelatorioService relatorioService;
    // Service para geração de relatórios em PDF
    @Autowired
    private RelatorioPdfService relatorioPdfService;
    // Repositório de usuários
    @Autowired
    private UsuarioRepository usuarioRepository;


    /**
     * Endpoint para exportar relatório em CSV
     * Recebe o ID do usuário
     * Retorna o arquivo CSV para download
     */
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


    /**
     * Endpoint para obter dados para gráficos
     * Recebe o ID do usuário
     * Retorna dados para visualização gráfica
     */
    @GetMapping("/graficos/{usuarioId}")
    public ResponseEntity<Map<String, Object>> dadosGraficos(@PathVariable Long usuarioId) {
        try {
            Map<String, Object> dados = relatorioService.gerarDadosGraficos(usuarioId);
            return ResponseEntity.ok(dados);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }


    /**
     * Endpoint para obter dados de produção mensal
     * Recebe o ID do usuário
     * Retorna dados agregados por mês
     */
    @GetMapping("/producao-mensal/{usuarioId}")
    public ResponseEntity<Map<String, Object>> producaoMensal(@PathVariable Long usuarioId) {
        try {
            Map<String, Object> dados = relatorioService.gerarProducaoMensal(usuarioId);
            return ResponseEntity.ok(dados);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
    

    /**
     * Endpoint para gerar relatório em PDF
     * Recebe o ID do usuário
     * Gera PDF com dados, gráfico e colheitas
     * Retorna o arquivo PDF para download
     */
    @GetMapping("/pdf/{usuarioId}")
    public ResponseEntity<byte[]> gerarRelatorioPdf(@PathVariable Long usuarioId) {
        try {
            // Obter dados do usuário
            Usuario usuario = usuarioRepository.findById(usuarioId)
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
            // Obter dados das colheitas
            List<Map<String, Object>> dadosColheitas = relatorioService.obterDadosColheitas(usuarioId);
            // Gerar gráfico como imagem
            byte[] graficoImagem = relatorioService.gerarGraficoProducaoMensalComoPng(usuarioId);
            // Gerar PDF
            byte[] pdfData = relatorioPdfService.gerarRelatorioPdf(
                usuarioId, 
                usuario.getNome(), 
                dadosColheitas, 
                graficoImagem
            );
            // Configurar headers para download
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_PDF);
            headers.setContentDispositionFormData("attachment", "relatorio-producao.pdf");
            headers.setContentLength(pdfData.length);
            return ResponseEntity.ok()
                    .headers(headers)
                    .body(pdfData);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}