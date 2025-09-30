package com.alimentandoofuturo.backend.config;

// Importações necessárias para configuração de segurança do Spring
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;

/**
 * Configuração de Segurança do Spring Security
 * 
 * Esta classe configura:
 * - Autenticação e autorização de endpoints
 * - Configuração CORS para permitir requisições do frontend
 * - Criptografia de senhas com BCrypt
 * - Políticas de segurança da aplicação
 */
@Configuration
@EnableWebSecurity
public class SecurityConfig {

    /**
     * Configura a cadeia de filtros de segurança
     * 
     * Define quais endpoints são públicos e quais requerem autenticação
     * Desabilita CSRF para APIs REST e configura CORS
     */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            // Habilita CORS com configuração personalizada
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            // Desabilita CSRF para APIs REST (não necessário para SPAs)
            .csrf(csrf -> csrf.disable())
            // Define regras de autorização para endpoints
            .authorizeHttpRequests(authz -> authz
                // Permite acesso público aos endpoints de health/ping
                .requestMatchers("/api/ping", "/api/health").permitAll()
                // Permite acesso público aos endpoints de usuários (login/cadastro)
                .requestMatchers("/api/usuarios/**").permitAll()
                // Permite acesso público aos endpoints de hortas
                .requestMatchers("/api/hortas/**").permitAll()
                // Permite acesso público aos endpoints de colheitas
                .requestMatchers("/api/colheitas/**").permitAll()
                // Permite acesso público aos endpoints de localizações
                .requestMatchers("/api/localizacoes/**").permitAll()
                // Permite acesso público aos endpoints de relatórios
                .requestMatchers("/api/relatorios/**").permitAll()
                // Permite acesso público aos endpoints de redefinição de senha
                .requestMatchers("/api/password-reset/**").permitAll()
                // Permite acesso público aos endpoints de suporte
                .requestMatchers("/api/support/**").permitAll()
                // Qualquer outra requisição requer autenticação
                .anyRequest().authenticated()
            );
        
        return http.build();
    }

    /**
     * Bean para criptografia de senhas usando BCrypt
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList(
            "https://alimentandoofuturo.netlify.app",
            "https://refactored-giggle-v6qpr5gjggwjfwq7-5173.app.github.dev"
        ));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        configuration.setExposedHeaders(Arrays.asList("Authorization", "Content-Disposition"));
        
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}