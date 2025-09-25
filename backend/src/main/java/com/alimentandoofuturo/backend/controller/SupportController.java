package com.alimentandoofuturo.backend.controller;

import com.alimentandoofuturo.backend.model.SupportRequest;
import com.alimentandoofuturo.backend.service.SupportService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/support")
@CrossOrigin(origins = {"http://localhost:5173", "https://alimentando-o-futuro.netlify.app"})
public class SupportController {
    
    private final SupportService supportService;
    
    public SupportController(SupportService supportService) {
        this.supportService = supportService;
    }
    
    @PostMapping("/request")
    public ResponseEntity<?> createSupportRequest(@RequestBody Map<String, String> request) {
        try {
            String nome = request.get("nome");
            String email = request.get("email");
            String assunto = request.get("assunto");
            String mensagem = request.get("mensagem");
            
            SupportRequest supportRequest = supportService.createSupportRequest(nome, email, assunto, mensagem);
            return ResponseEntity.ok(supportRequest);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<SupportRequest>> getAllRequests() {
        return ResponseEntity.ok(supportService.getAllRequests());
    }
    
    @GetMapping("/user/{email}")
    public ResponseEntity<List<SupportRequest>> getRequestsByEmail(@PathVariable String email) {
        return ResponseEntity.ok(supportService.getRequestsByEmail(email));
    }
    
    @PutMapping("/{id}/status")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        try {
            SupportRequest.Status status = SupportRequest.Status.valueOf(request.get("status"));
            SupportRequest updated = supportService.updateStatus(id, status);
            return ResponseEntity.ok(updated);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}