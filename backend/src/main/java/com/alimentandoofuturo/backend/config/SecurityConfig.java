package com.alimentandoofuturo.backend.config;

// Importações necessárias para configuração de segurança do Spring
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
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
                // Permite acesso público aos endpoints de usuários (login/cadastro)
                .requestMatchers("/api/usuarios/**").permitAll()
                // Permite acesso público aos endpoints de hortas
                .requestMatchers("/api/hortas/**").permitAll()
                // Permite acesso público aos endpoints de colheitas
                .requestMatchers("/api/colheitas/**").permitAll()
                // Qualquer outra requisição requer autenticação
                .anyRequest().authenticated()
            );
        
        return http.build();
    }

    /**
     * Configura o encoder de senhas usando BCrypt
     * 
     * BCrypt é um algoritmo de hash seguro que inclui salt automático
     * e é resistente a ataques de força bruta
     */
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /**
     * Configura CORS (Cross-Origin Resource Sharing)
     * 
     * Permite que o frontend React (rodando em porta diferente)
     * faça requisições para a API backend
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        // Permite requisições de qualquer origem (desenvolvimento)
        configuration.setAllowedOriginPatterns(Arrays.asList("*"));
        // Permite todos os métodos HTTP necessários para a API REST
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        // Permite todos os headers nas requisições
        configuration.setAllowedHeaders(Arrays.asList("*"));
        // Não permite credenciais (cookies, auth headers) por segurança
        configuration.setAllowCredentials(false);
        
        // Aplica a configuração CORS para todos os endpoints
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}