package com.alimentandoofuturo.backend.model.repository;

import com.alimentandoofuturo.backend.model.entity.Horta;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HortaRepository extends JpaRepository<Horta, Long> {
    List<Horta> findByUsuarioId(Long usuarioId);
    List<Horta> findByStatus(Horta.StatusHorta status);
}