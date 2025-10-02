package com.alimentandoofuturo.backend.controller;

import com.alimentandoofuturo.backend.model.entity.Usuario;
import com.alimentandoofuturo.backend.services.UsuarioService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import jakarta.validation.Valid;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/usuario")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:8686"})
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    @PostMapping("/cadastro")
    public ResponseEntity<?> cadastrarUsuario(@Valid @RequestBody Usuario usuario) {
        try {
            Usuario novoUsuario = usuarioService.criarUsuario(usuario);
            novoUsuario.setSenha(null); // Remove senha da resposta
            return ResponseEntity.ok(novoUsuario);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> credentials) {
        try {
            String email = credentials.get("email");
            String senha = credentials.get("senha");
            
            Usuario usuario = usuarioService.autenticarUsuario(email, senha);
            usuario.setSenha(null); // Remove senha da resposta
            
            return ResponseEntity.ok(Map.of(
                "usuario", usuario,
                "token", "jwt-token-placeholder",
                "role", usuario.getTipoPerfil().toString()
            ));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("erro", e.getMessage()));
        }
    }

    @GetMapping
    public ResponseEntity<List<Usuario>> listarUsuarios() {
        List<Usuario> usuarios = usuarioService.buscarTodos();
        usuarios.forEach(u -> u.setSenha(null));
        return ResponseEntity.ok(usuarios);
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