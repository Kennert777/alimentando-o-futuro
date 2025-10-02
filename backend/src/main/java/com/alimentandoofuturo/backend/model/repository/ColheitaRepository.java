package com.alimentandoofuturo.backend.model.repository;

import com.alimentandoofuturo.backend.model.entity.Colheita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.time.LocalDate;
import java.util.List;

@Repository
public interface ColheitaRepository extends JpaRepository<Colheita, Long> {
    List<Colheita> findByUsuarioId(Long usuarioId);
    List<Colheita> findByHortaId(Long hortaId);
    List<Colheita> findByDataColheitaBetween(LocalDate inicio, LocalDate fim);
    
    @Query("SELECT SUM(c.quantidade) FROM Colheita c WHERE c.usuario.id = :usuarioId")
    Double getTotalProducaoByUsuario(Long usuarioId);
}