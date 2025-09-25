package com.alimentandoofuturo.backend.service;

import com.alimentandoofuturo.backend.model.SupportRequest;
import com.alimentandoofuturo.backend.repository.SupportRequestRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class SupportService {
    
    private final SupportRequestRepository supportRepository;
    private final EmailService emailService;
    
    public SupportService(SupportRequestRepository supportRepository, EmailService emailService) {
        this.supportRepository = supportRepository;
        this.emailService = emailService;
    }
    
    @Transactional
    public SupportRequest createSupportRequest(String nome, String email, String assunto, String mensagem) {
        SupportRequest request = new SupportRequest();
        request.setNome(nome);
        request.setEmail(email);
        request.setAssunto(assunto);
        request.setMensagem(mensagem);
        
        SupportRequest saved = supportRepository.save(request);
        
        // Envia confirmação para o usuário
        emailService.sendSupportConfirmation(email, nome, assunto);
        
        // Notifica o administrador
        emailService.sendSupportNotificationToAdmin(nome, email, assunto, mensagem);
        
        return saved;
    }
    
    public List<SupportRequest> getAllRequests() {
        return supportRepository.findAll();
    }
    
    public List<SupportRequest> getRequestsByEmail(String email) {
        return supportRepository.findByEmailOrderByDataCriacaoDesc(email);
    }
    
    @Transactional
    public SupportRequest updateStatus(Long id, SupportRequest.Status status) {
        SupportRequest request = supportRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Solicitação não encontrada"));
        
        request.setStatus(status);
        return supportRepository.save(request);
    }
}