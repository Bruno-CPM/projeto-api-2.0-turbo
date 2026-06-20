package br.com.criandoAPI.projeto.domain.paciente;

import org.antlr.v4.runtime.misc.NotNull;

public record DadosAtualizarPaciente(
        @NotNull
        Long id,
        String nome,
        String email,
        String telefone
) {
}
