
// Configuração de envio de e-mails para o backend
// Permite que o sistema envie notificações e mensagens por e-mail
// Os dados de acesso (host, porta, usuário, senha) são definidos no application.yml
package com.alimentandoofuturo.backend.config;


// Importações necessárias para configuração do envio de e-mails
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;


import java.util.Properties;

// Indica que esta classe é uma configuração do Spring
@Configuration
/**
 * Configuração do serviço de e-mail
 * Permite enviar e-mails pelo backend usando SMTP
 * Os dados de acesso são lidos do arquivo de configuração
 */
public class EmailConfig {


    // Endereço do servidor SMTP
    @Value("${mail.host}")
    private String host;

    // Porta do servidor SMTP
    @Value("${mail.port}")
    private int port;

    // Usuário para autenticação SMTP
    @Value("${mail.username}")
    private String username;

    // Senha para autenticação SMTP
    @Value("${mail.password}")
    private String password;

    /**
     * Bean que configura o JavaMailSender
     * Define as propriedades de conexão SMTP
     * Utilizado para enviar e-mails pelo sistema
     */
    @Bean
    public JavaMailSender getJavaMailSender() {
        JavaMailSenderImpl mailSender = new JavaMailSenderImpl();
        // Configurações básicas de acesso
        mailSender.setHost(host);
        mailSender.setPort(port);
        mailSender.setUsername(username);
        mailSender.setPassword(password);

        // Propriedades do protocolo SMTP
        Properties props = mailSender.getJavaMailProperties();
        props.put("mail.transport.protocol", "smtp"); // Protocolo de envio
        props.put("mail.smtp.auth", "true"); // Requer autenticação
        props.put("mail.smtp.starttls.enable", "true"); // Usa TLS
        props.put("mail.debug", "false"); // Desativa debug

        return mailSender;
    }
}