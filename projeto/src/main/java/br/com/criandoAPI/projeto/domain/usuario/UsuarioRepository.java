package br.com.criandoAPI.projeto.domain.usuario;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.security.core.userdetails.UserDetails;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    UserDetails findByLogin(String login);

    @Modifying
    @Query("UPDATE Usuario u SET u.senha = :senha WHERE u.login = :login")
    void atualizarSenha(String login, String senha);
}
