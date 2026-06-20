package br.com.criandoAPI.projeto.controllers;

import br.com.criandoAPI.projeto.domain.medico.Especialidade;
import br.com.criandoAPI.projeto.domain.medico.Medico;

public record DadosDetalhesMedico(
        Long id,
        String nome,
        String email,
        String crm,
        Especialidade especialidade
) {
    public DadosDetalhesMedico(Medico medico) {
        this(
                medico.getId(),
                medico.getNome(),
                medico.getEmail(),
                medico.getCrm(),
                medico.getEspecialidade()
        );
    }
}
