package com.alimentandoofuturo.backend.repository;

import com.alimentandoofuturo.backend.model.Horta;
import com.alimentandoofuturo.backend.model.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface HortaRepository extends JpaRepository<Horta, Long> {
    List<Horta> findByUsuarioResponsavel(Usuario usuario);
    List<Horta> findByAprovada(Boolean aprovada);
}