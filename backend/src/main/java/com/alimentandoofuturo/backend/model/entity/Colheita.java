package com.alimentandoofuturo.backend.model.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "Colheita")
public class Colheita {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false, length = 100)
    private String produto;

    @NotNull
    @Column(nullable = false)
    private Double quantidade;

    @Column(length = 20)
    private String unidadeMedida = "kg";

    @NotNull
    @Column(name = "data_colheita", nullable = false)
    private LocalDate dataColheita;

    @Enumerated(EnumType.STRING)
    private QualidadeColheita qualidade = QualidadeColheita.BOA;

    @Column(length = 500)
    private String observacoes;

    @Column(name = "data_registro")
    private LocalDateTime dataRegistro = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "horta_id", nullable = false)
    private Horta horta;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    public enum QualidadeColheita {
        EXCELENTE, BOA, REGULAR, RUIM
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getProduto() { return produto; }
    public void setProduto(String produto) { this.produto = produto; }

    public Double getQuantidade() { return quantidade; }
    public void setQuantidade(Double quantidade) { this.quantidade = quantidade; }

    public String getUnidadeMedida() { return unidadeMedida; }
    public void setUnidadeMedida(String unidadeMedida) { this.unidadeMedida = unidadeMedida; }

    public LocalDate getDataColheita() { return dataColheita; }
    public void setDataColheita(LocalDate dataColheita) { this.dataColheita = dataColheita; }

    public QualidadeColheita getQualidade() { return qualidade; }
    public void setQualidade(QualidadeColheita qualidade) { this.qualidade = qualidade; }

    public String getObservacoes() { return observacoes; }
    public void setObservacoes(String observacoes) { this.observacoes = observacoes; }

    public LocalDateTime getDataRegistro() { return dataRegistro; }
    public void setDataRegistro(LocalDateTime dataRegistro) { this.dataRegistro = dataRegistro; }

    public Horta getHorta() { return horta; }
    public void setHorta(Horta horta) { this.horta = horta; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }
}