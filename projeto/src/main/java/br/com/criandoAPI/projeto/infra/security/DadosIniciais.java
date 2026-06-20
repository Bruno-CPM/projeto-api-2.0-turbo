package br.com.criandoAPI.projeto.infra.security;

import br.com.criandoAPI.projeto.domain.usuario.Usuario;
import br.com.criandoAPI.projeto.domain.usuario.UsuarioRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

@Component
public class DadosIniciais implements CommandLineRunner {

    private static final String LOGIN_PADRAO = "admin";
    private static final String SENHA_PADRAO = "123456";

    private final UsuarioRepository repository;
    private final PasswordEncoder passwordEncoder;

    public DadosIniciais(UsuarioRepository repository, PasswordEncoder passwordEncoder) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    @Transactional
    public void run(String... args) {
        var usuario = repository.findByLogin(LOGIN_PADRAO);
        var senhaCodificada = passwordEncoder.encode(SENHA_PADRAO);

        if (usuario == null) {
            repository.save(new Usuario(null, LOGIN_PADRAO, senhaCodificada));
            return;
        }

        if (!passwordEncoder.matches(SENHA_PADRAO, usuario.getPassword())) {
            repository.atualizarSenha(LOGIN_PADRAO, senhaCodificada);
        }
    }
}
