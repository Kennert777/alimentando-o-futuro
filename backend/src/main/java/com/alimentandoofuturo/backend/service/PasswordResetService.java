package com.alimentandoofuturo.backend.service;

import com.alimentandoofuturo.backend.model.PasswordResetToken;
import com.alimentandoofuturo.backend.model.Usuario;
import com.alimentandoofuturo.backend.repository.PasswordResetTokenRepository;
import com.alimentandoofuturo.backend.repository.UsuarioRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Random;

@Service
public class PasswordResetService {
    
    private final PasswordResetTokenRepository tokenRepository;
    private final UsuarioRepository usuarioRepository;
    private final EmailService emailService;
    private final PasswordEncoder passwordEncoder;
    
    public PasswordResetService(PasswordResetTokenRepository tokenRepository,
                               UsuarioRepository usuarioRepository,
                               EmailService emailService,
                               PasswordEncoder passwordEncoder) {
        this.tokenRepository = tokenRepository;
        this.usuarioRepository = usuarioRepository;
        this.emailService = emailService;
        this.passwordEncoder = passwordEncoder;
    }
    
    @Transactional
    public void requestPasswordReset(String email) {
        usuarioRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("Email não encontrado"));
        
        // Remove tokens antigos
        tokenRepository.deleteByEmail(email);
        
        // Gera token de 6 dígitos
        String token = String.format("%06d", new Random().nextInt(1000000));
        
        // Cria novo token com expiração de 15 minutos
        PasswordResetToken resetToken = new PasswordResetToken(
            token, 
            email, 
            LocalDateTime.now().plusMinutes(15)
        );
        
        tokenRepository.save(resetToken);
        emailService.sendPasswordResetToken(email, token);
    }
    
    @Transactional
    public void resetPassword(String token, String newPassword) {
        PasswordResetToken resetToken = tokenRepository.findByToken(token)
            .orElseThrow(() -> new RuntimeException("Token inválido"));
        
        if (resetToken.isUsed()) {
            throw new RuntimeException("Token já utilizado");
        }
        
        if (resetToken.isExpired()) {
            throw new RuntimeException("Token expirado");
        }
        
        Usuario usuario = usuarioRepository.findByEmail(resetToken.getEmail())
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        usuario.setSenha(passwordEncoder.encode(newPassword));
        usuarioRepository.save(usuario);
        
        resetToken.setUsed(true);
        tokenRepository.save(resetToken);
    }
}