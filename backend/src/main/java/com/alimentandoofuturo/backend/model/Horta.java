package com.alimentandoofuturo.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "Horta")
public class Horta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Column(nullable = false, length = 100)
    private String nome;

    @Column(length = 500)
    private String descricao;

    @NotBlank
    @Column(nullable = false)
    private String localizacao;

    @Column(precision = 10, scale = 8)
    private BigDecimal latitude;

    @Column(precision = 11, scale = 8)
    private BigDecimal longitude;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_cultivo", nullable = false)
    private TipoCultivo tipoCultivo;

    @Column(name = "area_m2", precision = 8, scale = 2)
    private BigDecimal areaM2;

    @Column(name = "capacidade_pessoas")
    private Integer capacidadePessoas;

    @Enumerated(EnumType.STRING)
    private Status status = Status.PLANEJAMENTO;

    @ManyToOne
    @JoinColumn(name = "usuario_responsavel_id", nullable = false)
    private Usuario usuarioResponsavel;

    @Column(name = "data_criacao")
    private LocalDateTime dataCriacao = LocalDateTime.now();

    @Column(name = "data_ultima_atualizacao")
    private LocalDateTime dataUltimaAtualizacao = LocalDateTime.now();

    @Column(columnDefinition = "bit default 0")
    private Boolean aprovada = false;

    @Column(name = "data_aprovacao")
    private LocalDateTime dataAprovacao;

    @ManyToOne
    @JoinColumn(name = "admin_aprovador_id")
    private Usuario adminAprovador;

    public enum TipoCultivo {
        ORGANICO, HIDROPONICO, PERMACULTURA, TRADICIONAL
    }

    public enum Status {
        PLANEJAMENTO, PLANTIO, CRESCIMENTO, COLHEITA, INATIVO
    }

    // Getters e Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNome() { return nome; }
    public void setNome(String nome) { this.nome = nome; }

    public String getDescricao() { return descricao; }
    public void setDescricao(String descricao) { this.descricao = descricao; }

    public String getLocalizacao() { return localizacao; }
    public void setLocalizacao(String localizacao) { this.localizacao = localizacao; }

    public BigDecimal getLatitude() { return latitude; }
    public void setLatitude(BigDecimal latitude) { this.latitude = latitude; }

    public BigDecimal getLongitude() { return longitude; }
    public void setLongitude(BigDecimal longitude) { this.longitude = longitude; }

    public TipoCultivo getTipoCultivo() { return tipoCultivo; }
    public void setTipoCultivo(TipoCultivo tipoCultivo) { this.tipoCultivo = tipoCultivo; }

    public BigDecimal getAreaM2() { return areaM2; }
    public void setAreaM2(BigDecimal areaM2) { this.areaM2 = areaM2; }

    public Integer getCapacidadePessoas() { return capacidadePessoas; }
    public void setCapacidadePessoas(Integer capacidadePessoas) { this.capacidadePessoas = capacidadePessoas; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public Usuario getUsuarioResponsavel() { return usuarioResponsavel; }
    public void setUsuarioResponsavel(Usuario usuarioResponsavel) { this.usuarioResponsavel = usuarioResponsavel; }

    public LocalDateTime getDataCriacao() { return dataCriacao; }
    public void setDataCriacao(LocalDateTime dataCriacao) { this.dataCriacao = dataCriacao; }

    public LocalDateTime getDataUltimaAtualizacao() { return dataUltimaAtualizacao; }
    public void setDataUltimaAtualizacao(LocalDateTime dataUltimaAtualizacao) { this.dataUltimaAtualizacao = dataUltimaAtualizacao; }

    public Boolean getAprovada() { return aprovada; }
    public void setAprovada(Boolean aprovada) { this.aprovada = aprovada; }

    public LocalDateTime getDataAprovacao() { return dataAprovacao; }
    public void setDataAprovacao(LocalDateTime dataAprovacao) { this.dataAprovacao = dataAprovacao; }

    public Usuario getAdminAprovador() { return adminAprovador; }
    public void setAdminAprovador(Usuario adminAprovador) { this.adminAprovador = adminAprovador; }
}