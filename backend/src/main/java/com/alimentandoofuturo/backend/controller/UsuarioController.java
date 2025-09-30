package com.alimentandoofuturo.backend.controller;

// Importações necessárias para o controller REST
import com.alimentandoofuturo.backend.model.Usuario;
import com.alimentandoofuturo.backend.service.UsuarioService;
import com.alimentandoofuturo.backend.service.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import jakarta.validation.Valid;

/**
 * Controller REST para gerenciamento de usuários
 * 
 * Endpoints disponíveis:
 * - POST /api/usuarios/cadastro - Cadastrar novo usuário
 * - POST /api/usuarios/login - Autenticar usuário
 * - GET /api/usuarios - Listar todos os usuários
 * - GET /api/usuarios/{id} - Buscar usuário por ID
 * - PUT /api/usuarios/{id} - Atualizar usuário
 * - DELETE /api/usuarios/{id} - Excluir usuário
 * - POST /api/usuarios/{id}/pontos - Adicionar pontos ao usuário
 */
@RestController
@RequestMapping("/api/usuarios")
@CrossOrigin(origins = "https://refactored-giggle-v6qpr5gjggwjfwq7-5173.app.github.dev")
public class UsuarioController {

    // Injeção de dependência do service de usuários
    @Autowired
    private UsuarioService usuarioService;
    
    @Autowired
    private JwtService jwtService;

    /**
     * Endpoint para cadastro de novos usuários
     * 
     * @param usuario Dados do usuário a ser cadastrado
     * @return ResponseEntity com o usuário criado ou erro
     */
    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrarUsuario(@Valid @RequestBody Usuario usuario) {
        try {
            // Log para debug (remover em produção)
            System.out.println("Dados recebidos: " + usuario.getNome() + ", " + usuario.getEmail());
            
            // Cria o usuário usando o service
            Usuario novoUsuario = usuarioService.criarUsuario(usuario);
            
            // Remove a senha da resposta por segurança
            novoUsuario.setSenha(null);
            
            return ResponseEntity.ok(novoUsuario);
        } catch (Exception e) {
            // Log do erro para debug
            System.out.println("Erro no cadastro: " + e.getMessage());
            e.printStackTrace();
            
            // Retorna erro 400 com mensagem
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        }
    }

    /**
     * Endpoint para autenticação de usuários
     * 
     * @param credentials Map contendo email e senha
     * @return ResponseEntity com dados do usuário autenticado ou erro
     */
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        try {
            // Extrai email e senha do corpo da requisição
            String email = credentials.get("email");
            String senha = credentials.get("senha");
            
            // Autentica o usuário usando o service
            Usuario usuario = usuarioService.autenticarUsuario(email, senha);
            
            // Gera token JWT
            String token = jwtService.generateToken(usuario.getEmail(), usuario.getId(), usuario.getTipoPerfil().toString());
            
            // Remove a senha da resposta por segurança
            usuario.setSenha(null);
            
            // Retorna token, role e username conforme especificado
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            response.put("role", usuario.getTipoPerfil().toString());
            response.put("username", usuario.getEmail());
            response.put("usuario", usuario); // Mantém para compatibilidade
            
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            // Retorna erro 400 para credenciais inválidas
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarUsuario(@PathVariable Long id) {
        return usuarioService.buscarPorId(id)
            .map(usuario -> {
                usuario.setSenha(null);
                return ResponseEntity.ok(usuario);
            })
            .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        List<Usuario> usuarios = usuarioService.buscarTodos();
        usuarios.forEach(u -> u.setSenha(null));
        return ResponseEntity.ok(usuarios);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> atualizarUsuario(@PathVariable Long id, @Valid @RequestBody Usuario dadosAtualizacao) {
        try {
            Usuario usuario = usuarioService.atualizarUsuario(id, dadosAtualizacao);
            usuario.setSenha(null);
            return ResponseEntity.ok(usuario);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> excluirUsuario(@PathVariable Long id) {
        try {
            usuarioService.excluirUsuario(id);
            return ResponseEntity.ok(Map.of("mensagem", "Usuário excluído com sucesso"));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        }
    }

    @PostMapping("/{id}/pontos")
    public ResponseEntity<?> adicionarPontos(@PathVariable Long id, @RequestBody Map<String, Integer> request) {
        try {
            Integer pontos = request.get("pontos");
            usuarioService.adicionarPontos(id, pontos);
            return ResponseEntity.ok(Map.of("mensagem", "Pontos adicionados com sucesso"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        }
    }
}