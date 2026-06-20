package br.com.criandoAPI.projeto.Consulta.Validacoes;

import br.com.criandoAPI.domain.ValidacaoException;
import br.com.criandoAPI.projeto.Consulta.DadosAgendamentoConsulta;
import br.com.criandoAPI.projeto.domain.medico.MedicoRepository;
import br.com.criandoAPI.projeto.domain.paciente.PacienteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ValidadorPacienteAtivo implements ValidadorAgendamentoConsulta{

    @Autowired
    private PacienteRepository repository;

    public void validar(DadosAgendamentoConsulta dados){
        if (dados.idPaciente() == null){
            return;
        }

        boolean pacienteEstaAtivo = repository.findAtivoById(dados.idPaciente());
        if(!pacienteEstaAtivo){
            throw new ValidacaoException("Consulta nao pode ser agendada com paciente excluido!");
        }
    }
}
