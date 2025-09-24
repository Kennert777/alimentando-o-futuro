package com.alimentandoofuturo.backend.service;

import com.alimentandoofuturo.backend.model.Colheita;
import com.alimentandoofuturo.backend.model.Horta;
import com.alimentandoofuturo.backend.model.Usuario;
import com.alimentandoofuturo.backend.repository.ColheitaRepository;
import com.alimentandoofuturo.backend.repository.HortaRepository;
import com.alimentandoofuturo.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.PrintWriter;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class RelatorioService {

    @Autowired
    private ColheitaRepository colheitaRepository;

    @Autowired
    private HortaRepository hortaRepository;
    
    @Autowired
    private UsuarioRepository usuarioRepository;

    public byte[] gerarRelatorioCsv(Long usuarioId) {
        try {
            List<Colheita> colheitas = colheitaRepository.findByUsuarioId(usuarioId);
            Usuario usuario = usuarioRepository.findById(usuarioId).orElse(null);
            List<Horta> hortas = usuario != null ? hortaRepository.findByUsuarioResponsavel(usuario) : new ArrayList<>();

            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            PrintWriter writer = new PrintWriter(baos);

            // Cabeçalho do CSV
            writer.println("Data,Horta,Planta,Quantidade,Qualidade,Observacoes");

            // Dados das colheitas
            for (Colheita colheita : colheitas) {
                writer.printf("%s,%s,%s,%.2f,%s,%s%n",
                    colheita.getDataColheita().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")),
                    colheita.getHorta().getNome(),
                    colheita.getTipoPlanta(),
                    colheita.getQuantidadeKg().doubleValue(),
                    colheita.getQualidade(),
                    colheita.getObservacoes() != null ? colheita.getObservacoes().replace(",", ";") : ""
                );
            }

            writer.flush();
            writer.close();

            return baos.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Erro ao gerar relatório CSV", e);
        }
    }

    public Map<String, Object> gerarDadosGraficos(Long usuarioId) {
        List<Colheita> colheitas = colheitaRepository.findByUsuarioId(usuarioId);
        Usuario usuario = usuarioRepository.findById(usuarioId).orElse(null);
        List<Horta> hortas = usuario != null ? hortaRepository.findByUsuarioResponsavel(usuario) : new ArrayList<>();

        Map<String, Object> dados = new HashMap<>();

        // Total de colheitas por mês
        Map<String, Double> colheitasPorMes = colheitas.stream()
            .collect(Collectors.groupingBy(
                c -> c.getDataColheita().format(DateTimeFormatter.ofPattern("MM/yyyy")),
                Collectors.summingDouble(c -> c.getQuantidadeKg().doubleValue())
            ));

        // Colheitas por qualidade
        Map<String, Long> colheitasPorQualidade = colheitas.stream()
            .collect(Collectors.groupingBy(
                c -> c.getQualidade().toString(),
                Collectors.counting()
            ));

        // Hortas por status
        Map<String, Long> hortasPorStatus = hortas.stream()
            .collect(Collectors.groupingBy(
                h -> h.getStatus().toString(),
                Collectors.counting()
            ));

        dados.put("colheitasPorMes", colheitasPorMes);
        dados.put("colheitasPorQualidade", colheitasPorQualidade);
        dados.put("hortasPorStatus", hortasPorStatus);
        dados.put("totalColheitas", colheitas.size());
        dados.put("totalHortas", hortas.size());

        return dados;
    }

    public Map<String, Object> gerarProducaoMensal(Long usuarioId) {
        List<Colheita> colheitas = colheitaRepository.findByUsuarioId(usuarioId);

        Map<String, Object> dados = new HashMap<>();
        
        // Últimos 12 meses
        List<Map<String, Object>> producaoMensal = new ArrayList<>();
        LocalDate hoje = LocalDate.now();
        
        for (int i = 11; i >= 0; i--) {
            LocalDate mes = hoje.minusMonths(i);
            String mesAno = mes.format(DateTimeFormatter.ofPattern("MM/yyyy"));
            
            double totalProducao = colheitas.stream()
                .filter(c -> c.getDataColheita().getMonth() == mes.getMonth() && 
                           c.getDataColheita().getYear() == mes.getYear())
                .mapToDouble(c -> c.getQuantidadeKg().doubleValue())
                .sum();
            
            Map<String, Object> dadosMes = new HashMap<>();
            dadosMes.put("mes", mesAno);
            dadosMes.put("producao", totalProducao);
            producaoMensal.add(dadosMes);
        }

        dados.put("producaoMensal", producaoMensal);
        return dados;
    }
}