package br.com.criandoAPI.projeto.Consulta.Validacoes;

import br.com.criandoAPI.projeto.Consulta.DadosAgendamentoConsulta;
import br.com.criandoAPI.projeto.domain.medico.MedicoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ValidadorMedicoAtivo implements ValidadorAgendamentoConsulta {

    @Autowired
    private MedicoRepository repository;

    public void validar(DadosAgendamentoConsulta dados){
        if (dados.idMedico() == null){
            return;
        }

        boolean medicoEstaAtivo = repository.findAllByAtivoTrue(dados.idMedico());
        if(!medicoEstaAtivo){
            throw new ValidacaoException("Consulta nao pode ser agendada com medico excluido!");
        }
    }
}
