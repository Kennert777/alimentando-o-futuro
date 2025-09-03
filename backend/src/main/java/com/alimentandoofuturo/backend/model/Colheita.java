package com.alimentandoofuturo.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "Colheita")
public class Colheita {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "horta_id", nullable = false)
    private Horta horta;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    @Column(name = "tipo_planta", nullable = false, length = 100)
    private String tipoPlanta;

    @Column(name = "quantidade_kg", nullable = false, precision = 8, scale = 2)
    private BigDecimal quantidadeKg;

    @Column(name = "data_colheita", nullable = false)
    private LocalDate dataColheita;

    @Column(name = "data_registro")
    private LocalDateTime dataRegistro = LocalDateTime.now();

    @Enumerated(EnumType.STRING)
    private Qualidade qualidade;

    private String destino;
    private String observacoes;

    @Column(name = "foto_url")
    private String fotoUrl;

    public enum Qualidade {
        EXCELENTE, BOA, REGULAR, RUIM
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Horta getHorta() { return horta; }
    public void setHorta(Horta horta) { this.horta = horta; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public String getTipoPlanta() { return tipoPlanta; }
    public void setTipoPlanta(String tipoPlanta) { this.tipoPlanta = tipoPlanta; }

    public BigDecimal getQuantidadeKg() { return quantidadeKg; }
    public void setQuantidadeKg(BigDecimal quantidadeKg) { this.quantidadeKg = quantidadeKg; }

    public LocalDate getDataColheita() { return dataColheita; }
    public void setDataColheita(LocalDate dataColheita) { this.dataColheita = dataColheita; }

    public LocalDateTime getDataRegistro() { return dataRegistro; }
    public void setDataRegistro(LocalDateTime dataRegistro) { this.dataRegistro = dataRegistro; }

    public Qualidade getQualidade() { return qualidade; }
    public void setQualidade(Qualidade qualidade) { this.qualidade = qualidade; }

    public String getDestino() { return destino; }
    public void setDestino(String destino) { this.destino = destino; }

    public String getObservacoes() { return observacoes; }
    public void setObservacoes(String observacoes) { this.observacoes = observacoes; }

    public String getFotoUrl() { return fotoUrl; }
    public void setFotoUrl(String fotoUrl) { this.fotoUrl = fotoUrl; }
}