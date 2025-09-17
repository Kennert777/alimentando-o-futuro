package com.alimentandoofuturo.backend.repository;

import com.alimentandoofuturo.backend.model.Colheita;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ColheitaRepository extends JpaRepository<Colheita, Long> {
    List<Colheita> findByUsuarioId(Long usuarioId);
}