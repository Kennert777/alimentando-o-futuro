package com.alimentandoofuturo.backend.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {
    
    private final JavaMailSender mailSender;
    
    @Value("${mail.username}")
    private String fromEmail;
    
    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }
    
    public void sendPasswordResetToken(String toEmail, String token) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject("Redefinição de Senha - Alimentando o Futuro");
            
            String htmlContent = """
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #4F732C;">Redefinição de Senha</h2>
                    <p>Você solicitou a redefinição de sua senha no Alimentando o Futuro.</p>
                    <p>Seu código de redefinição é: <strong style="font-size: 18px; color: #558C03;">%s</strong></p>
                    <p>Este código expira em 15 minutos.</p>
                    <p>Se você não solicitou esta redefinição, ignore este email.</p>
                    <hr>
                    <p style="color: #666; font-size: 12px;">Alimentando o Futuro - Sustentabilidade e Saúde</p>
                </div>
                """.formatted(token);
            
            helper.setText(htmlContent, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Erro ao enviar email: " + e.getMessage());
        }
    }
    
    public void sendSupportConfirmation(String toEmail, String nome, String assunto) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject("Solicitação de Suporte Recebida - Alimentando o Futuro");
            
            String htmlContent = """
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #4F732C;">Suporte Recebido</h2>
                    <p>Olá %s,</p>
                    <p>Sua solicitação de suporte foi recebida com sucesso!</p>
                    <p><strong>Assunto:</strong> %s</p>
                    <p>Nossa equipe entrará em contato em breve.</p>
                    <hr>
                    <p style="color: #666; font-size: 12px;">Alimentando o Futuro - Sustentabilidade e Saúde</p>
                </div>
                """.formatted(nome, assunto);
            
            helper.setText(htmlContent, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Erro ao enviar email: " + e.getMessage());
        }
    }
    
    public void sendSupportNotificationToAdmin(String nome, String email, String assunto, String mensagem) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");
            
            helper.setFrom(fromEmail);
            helper.setTo("rm94720@estudante.fieb.edu.br");
            helper.setSubject("Nova Solicitação de Suporte - " + assunto);
            
            String htmlContent = """
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #4F732C;">Nova Solicitação de Suporte</h2>
                    <p><strong>Nome:</strong> %s</p>
                    <p><strong>Email:</strong> %s</p>
                    <p><strong>Assunto:</strong> %s</p>
                    <p><strong>Mensagem:</strong></p>
                    <div style="background: #f5f5f5; padding: 15px; border-radius: 5px;">
                        %s
                    </div>
                    <hr>
                    <p style="color: #666; font-size: 12px;">Sistema Alimentando o Futuro</p>
                </div>
                """.formatted(nome, email, assunto, mensagem.replace("\n", "<br>"));
            
            helper.setText(htmlContent, true);
            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Erro ao enviar email: " + e.getMessage());
        }
    }
}