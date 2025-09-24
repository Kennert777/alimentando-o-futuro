package com.alimentandoofuturo.backend.repository;

import com.alimentandoofuturo.backend.model.Localizacao;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocalizacaoRepository extends JpaRepository<Localizacao, Long> {
    
    List<Localizacao> findByEstado(String estado);
    
    List<Localizacao> findByEstadoAndCidade(String estado, String cidade);
    
    List<Localizacao> findByTipo(String tipo);
    
    @Query("SELECT l FROM Localizacao l WHERE l.estado = :estado AND l.cidade = :cidade AND l.tipo = :tipo")
    List<Localizacao> findByRegiaoAndTipo(@Param("estado") String estado, 
                                         @Param("cidade") String cidade, 
                                         @Param("tipo") String tipo);
}