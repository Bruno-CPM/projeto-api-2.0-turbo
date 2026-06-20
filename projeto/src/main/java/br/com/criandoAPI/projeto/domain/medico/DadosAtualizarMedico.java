package br.com.criandoAPI.projeto.domain.medico;

import jakarta.validation.constraints.NotNull;

public record DadosAtualizarMedico(
        @NotNull
        String id,
        String nome,
        String email,
        String crm,
        Especialidade especialidade) {

}
