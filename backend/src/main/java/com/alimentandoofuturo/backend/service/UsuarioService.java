package com.alimentandoofuturo.backend.service;

import com.alimentandoofuturo.backend.model.Usuario;
import com.alimentandoofuturo.backend.repository.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Usuario criarUsuario(Usuario usuario) {
        if (usuarioRepository.existsByEmail(usuario.getEmail())) {
            throw new RuntimeException("Email já cadastrado");
        }
        
        usuario.setSenha(passwordEncoder.encode(usuario.getSenha()));
        usuario.setDataCadastro(LocalDateTime.now());
        
        return usuarioRepository.save(usuario);
    }

    public Usuario autenticarUsuario(String email, String senha) {
        Optional<Usuario> usuarioOpt = usuarioRepository.findByEmail(email);
        
        if (usuarioOpt.isEmpty() || !passwordEncoder.matches(senha, usuarioOpt.get().getSenha())) {
            throw new RuntimeException("Email ou senha incorretos");
        }
        
        Usuario usuario = usuarioOpt.get();
        usuario.setDataUltimoAcesso(LocalDateTime.now());
        return usuarioRepository.save(usuario);
    }

    public Optional<Usuario> buscarPorId(Long id) {
        return usuarioRepository.findById(id);
    }

    public Optional<Usuario> buscarPorEmail(String email) {
        return usuarioRepository.findByEmail(email);
    }

    public List<Usuario> buscarTodos() {
        return usuarioRepository.findAll();
    }

    public Usuario atualizarUsuario(Long id, Usuario dadosAtualizacao) {
        Usuario usuario = usuarioRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        if (dadosAtualizacao.getNome() != null) {
            usuario.setNome(dadosAtualizacao.getNome());
        }
        if (dadosAtualizacao.getTelefone() != null) {
            usuario.setTelefone(dadosAtualizacao.getTelefone());
        }
        if (dadosAtualizacao.getEndereco() != null) {
            usuario.setEndereco(dadosAtualizacao.getEndereco());
        }
        if (dadosAtualizacao.getCidade() != null) {
            usuario.setCidade(dadosAtualizacao.getCidade());
        }
        if (dadosAtualizacao.getEstado() != null) {
            usuario.setEstado(dadosAtualizacao.getEstado());
        }
        
        return usuarioRepository.save(usuario);
    }

    public void excluirUsuario(Long id) {
        usuarioRepository.deleteById(id);
    }

    public void adicionarPontos(Long usuarioId, Integer pontos) {
        Usuario usuario = usuarioRepository.findById(usuarioId)
            .orElseThrow(() -> new RuntimeException("Usuário não encontrado"));
        
        usuario.setPontos(usuario.getPontos() + pontos);
        usuario.setNivel((usuario.getPontos() / 100) + 1);
        
        usuarioRepository.save(usuario);
    }
}