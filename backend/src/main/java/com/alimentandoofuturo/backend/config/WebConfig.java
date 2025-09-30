
// Configuração global de CORS para o backend
// Permite que o frontend hospedado no Netlify acesse a API
// Edite o domínio em .allowedOrigins se mudar o endereço do frontend
package com.alimentandoofuturo.backend.config;


// Importações necessárias para configuração do CORS
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

// Indica que esta classe é uma configuração do Spring
@Configuration
/**
 * Configuração global de CORS para toda a API
 * Permite que o frontend publicado acesse os endpoints do backend
 * Edite o domínio em .allowedOrigins conforme necessário
 */
public class WebConfig {
    /**
     * Bean que configura o CORS para toda a aplicação
     *
     * allowedOrigins: define quais domínios podem acessar a API
     * allowedMethods: define os métodos HTTP permitidos
     * allowedHeaders: permite todos os headers
     * allowCredentials: permite envio de cookies/autenticação
     */
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(@org.springframework.lang.NonNull CorsRegistry registry) {
                // Aplica CORS para todos os endpoints
                registry.addMapping("/**")
                    // Domínio do frontend publicado
                    .allowedOrigins("https://alimentandoofuturo.netlify.app", "https://refactored-giggle-v6qpr5gjggwjfwq7-5173.app.github.dev")
                    // Métodos HTTP permitidos
                    .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                    // Permite todos os headers
                    .allowedHeaders("*")
                    // Permite envio de credenciais (cookies, auth)
                    .allowCredentials(true);
            }
        };
    }
}
