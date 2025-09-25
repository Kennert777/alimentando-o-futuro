package com.alimentandoofuturo.backend.repository;

import com.alimentandoofuturo.backend.model.SupportRequest;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SupportRequestRepository extends JpaRepository<SupportRequest, Long> {
    List<SupportRequest> findByEmailOrderByDataCriacaoDesc(String email);
    List<SupportRequest> findByStatusOrderByDataCriacaoDesc(SupportRequest.Status status);
}