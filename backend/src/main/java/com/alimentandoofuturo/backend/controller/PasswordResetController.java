package com.alimentandoofuturo.backend.controller;

import com.alimentandoofuturo.backend.service.PasswordResetService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/password-reset")
@CrossOrigin(origins = {"http://localhost:5173", "https://alimentando-o-futuro.netlify.app"})
public class PasswordResetController {
    
    private final PasswordResetService passwordResetService;
    
    public PasswordResetController(PasswordResetService passwordResetService) {
        this.passwordResetService = passwordResetService;
    }
    
    @PostMapping("/request")
    public ResponseEntity<?> requestPasswordReset(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            passwordResetService.requestPasswordReset(email);
            return ResponseEntity.ok(Map.of("message", "Código enviado para seu email"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
    
    @PostMapping("/reset")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String, String> request) {
        try {
            String token = request.get("token");
            String newPassword = request.get("newPassword");
            passwordResetService.resetPassword(token, newPassword);
            return ResponseEntity.ok(Map.of("message", "Senha redefinida com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}