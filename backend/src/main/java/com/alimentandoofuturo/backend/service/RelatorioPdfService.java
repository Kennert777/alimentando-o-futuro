package com.alimentandoofuturo.backend.service;

import com.itextpdf.text.*;
import com.itextpdf.text.pdf.*;
import com.itextpdf.text.pdf.draw.LineSeparator;
import org.springframework.stereotype.Service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@Service
public class RelatorioPdfService {

    private static final BaseColor COR_VERDE_PRINCIPAL = new BaseColor(36, 88, 41); // #245829
    private static final BaseColor COR_VERDE_SECUNDARIA = new BaseColor(76, 175, 80); // #4CAF50
    private static final BaseColor COR_CINZA_CLARO = new BaseColor(248, 249, 250); // #f8f9fa

    public byte[] gerarRelatorioPdf(Long usuarioId, String nomeUsuario, List<Map<String, Object>> dados, byte[] graficoImagem) {
        try {
            Document document = new Document(PageSize.A4);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            PdfWriter.getInstance(document, baos);

            document.open();

            // Cabeçalho
            adicionarCabecalho(document);
            
            // Informações do usuário
            adicionarInfoUsuario(document, nomeUsuario);
            
            // Estatísticas resumo
            adicionarEstatisticas(document, dados);
            
            // Gráfico
            if (graficoImagem != null) {
                adicionarGrafico(document, graficoImagem);
            }
            
            // Tabela de dados
            adicionarTabelaDados(document, dados);
            
            // Rodapé
            adicionarRodape(document);

            document.close();
            return baos.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Erro ao gerar PDF: " + e.getMessage(), e);
        }
    }

    private void adicionarCabecalho(Document document) throws DocumentException {
        // Título principal
        Font tituloFont = new Font(Font.FontFamily.HELVETICA, 24, Font.BOLD, COR_VERDE_PRINCIPAL);
        Paragraph titulo = new Paragraph("🌱 Alimentando o Futuro", tituloFont);
        titulo.setAlignment(Element.ALIGN_CENTER);
        titulo.setSpacingAfter(10);
        document.add(titulo);

        // Subtítulo
        Font subtituloFont = new Font(Font.FontFamily.HELVETICA, 16, Font.NORMAL, COR_VERDE_SECUNDARIA);
        Paragraph subtitulo = new Paragraph("Relatório de Produção Agrícola", subtituloFont);
        subtitulo.setAlignment(Element.ALIGN_CENTER);
        subtitulo.setSpacingAfter(20);
        document.add(subtitulo);

        // Linha separadora
        LineSeparator linha = new LineSeparator();
        linha.setLineColor(COR_VERDE_PRINCIPAL);
        document.add(linha);
        document.add(Chunk.NEWLINE);
    }

    private void adicionarInfoUsuario(Document document, String nomeUsuario) throws DocumentException {
        Font infoFont = new Font(Font.FontFamily.HELVETICA, 12, Font.NORMAL);
        
        Paragraph info = new Paragraph();
        info.add(new Chunk("Usuário: ", new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD)));
        info.add(new Chunk(nomeUsuario, infoFont));
        info.add(Chunk.NEWLINE);
        info.add(new Chunk("Data de Geração: ", new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD)));
        info.add(new Chunk(LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")), infoFont));
        info.setSpacingAfter(20);
        
        document.add(info);
    }

    private void adicionarEstatisticas(Document document, List<Map<String, Object>> dados) throws DocumentException {
        // Título da seção
        Font secaoFont = new Font(Font.FontFamily.HELVETICA, 16, Font.BOLD, COR_VERDE_PRINCIPAL);
        Paragraph secaoTitulo = new Paragraph("📊 Estatísticas Resumo", secaoFont);
        secaoTitulo.setSpacingAfter(15);
        document.add(secaoTitulo);

        // Calcular estatísticas
        int totalColheitas = dados.size();
        double totalQuantidade = dados.stream()
            .mapToDouble(d -> ((Number) d.getOrDefault("quantidade", 0)).doubleValue())
            .sum();
        
        long tiposUnicos = dados.stream()
            .map(d -> d.get("tipoVegetal"))
            .distinct()
            .count();

        // Criar tabela de estatísticas
        PdfPTable tabelaStats = new PdfPTable(3);
        tabelaStats.setWidthPercentage(100);
        tabelaStats.setSpacingAfter(20);

        // Cabeçalhos
        adicionarCelulaEstatistica(tabelaStats, "Total de Colheitas", String.valueOf(totalColheitas));
        adicionarCelulaEstatistica(tabelaStats, "Quantidade Total (kg)", String.format("%.2f", totalQuantidade));
        adicionarCelulaEstatistica(tabelaStats, "Tipos de Vegetais", String.valueOf(tiposUnicos));

        document.add(tabelaStats);
    }

    private void adicionarCelulaEstatistica(PdfPTable tabela, String titulo, String valor) {
        Font tituloFont = new Font(Font.FontFamily.HELVETICA, 10, Font.BOLD, BaseColor.WHITE);
        Font valorFont = new Font(Font.FontFamily.HELVETICA, 14, Font.BOLD, COR_VERDE_PRINCIPAL);

        PdfPCell celulaTitulo = new PdfPCell(new Phrase(titulo, tituloFont));
        celulaTitulo.setBackgroundColor(COR_VERDE_PRINCIPAL);
        celulaTitulo.setHorizontalAlignment(Element.ALIGN_CENTER);
        celulaTitulo.setPadding(8);
        tabela.addCell(celulaTitulo);

        PdfPCell celulaValor = new PdfPCell(new Phrase(valor, valorFont));
        celulaValor.setBackgroundColor(COR_CINZA_CLARO);
        celulaValor.setHorizontalAlignment(Element.ALIGN_CENTER);
        celulaValor.setPadding(12);
        tabela.addCell(celulaValor);

        // Espaço entre colunas
        PdfPCell celulaEspaco = new PdfPCell();
        celulaEspaco.setBorder(Rectangle.NO_BORDER);
        celulaEspaco.setFixedHeight(5);
        tabela.addCell(celulaEspaco);
    }

    private void adicionarGrafico(Document document, byte[] graficoImagem) throws DocumentException, IOException {
        Font secaoFont = new Font(Font.FontFamily.HELVETICA, 16, Font.BOLD, COR_VERDE_PRINCIPAL);
        Paragraph secaoTitulo = new Paragraph("📈 Gráfico de Produção Mensal", secaoFont);
        secaoTitulo.setSpacingAfter(15);
        document.add(secaoTitulo);

        Image imagem = Image.getInstance(graficoImagem);
        imagem.scaleToFit(500, 300);
        imagem.setAlignment(Element.ALIGN_CENTER);
        imagem.setSpacingAfter(20);
        document.add(imagem);
    }

    private void adicionarTabelaDados(Document document, List<Map<String, Object>> dados) throws DocumentException {
        if (dados.isEmpty()) return;

        Font secaoFont = new Font(Font.FontFamily.HELVETICA, 16, Font.BOLD, COR_VERDE_PRINCIPAL);
        Paragraph secaoTitulo = new Paragraph("📋 Detalhes das Colheitas", secaoFont);
        secaoTitulo.setSpacingAfter(15);
        document.add(secaoTitulo);

        PdfPTable tabela = new PdfPTable(4);
        tabela.setWidthPercentage(100);
        tabela.setWidths(new float[]{3, 2, 2, 2});

        // Cabeçalhos
        Font headerFont = new Font(Font.FontFamily.HELVETICA, 12, Font.BOLD, BaseColor.WHITE);
        String[] headers = {"Tipo de Vegetal", "Quantidade (kg)", "Qualidade", "Data"};
        
        for (String header : headers) {
            PdfPCell cell = new PdfPCell(new Phrase(header, headerFont));
            cell.setBackgroundColor(COR_VERDE_PRINCIPAL);
            cell.setHorizontalAlignment(Element.ALIGN_CENTER);
            cell.setPadding(8);
            tabela.addCell(cell);
        }

        // Dados
        Font dataFont = new Font(Font.FontFamily.HELVETICA, 10, Font.NORMAL);
        for (Map<String, Object> item : dados) {
            tabela.addCell(new PdfPCell(new Phrase(String.valueOf(item.get("tipoVegetal")), dataFont)));
            tabela.addCell(new PdfPCell(new Phrase(String.valueOf(item.get("quantidade")), dataFont)));
            tabela.addCell(new PdfPCell(new Phrase(String.valueOf(item.get("qualidade")), dataFont)));
            tabela.addCell(new PdfPCell(new Phrase(String.valueOf(item.get("dataColheita")), dataFont)));
        }

        document.add(tabela);
    }

    private void adicionarRodape(Document document) throws DocumentException {
        document.add(Chunk.NEWLINE);
        
        Font rodapeFont = new Font(Font.FontFamily.HELVETICA, 10, Font.ITALIC, BaseColor.GRAY);
        Paragraph rodape = new Paragraph("Relatório gerado automaticamente pelo sistema Alimentando o Futuro", rodapeFont);
        rodape.setAlignment(Element.ALIGN_CENTER);
        rodape.setSpacingBefore(20);
        
        document.add(rodape);
    }
}