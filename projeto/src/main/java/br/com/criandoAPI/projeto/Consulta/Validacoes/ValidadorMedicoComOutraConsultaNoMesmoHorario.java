package br.com.criandoAPI.projeto.Consulta.Validacoes;

import br.com.criandoAPI.projeto.Consulta.ConsultaRepository;
import br.com.criandoAPI.projeto.Consulta.DadosAgendamentoConsulta;
import org.springframework.stereotype.Component;

@Component
public class ValidadorMedicoComOutraConsultaNoMesmoHorario implements ValidadorAgendamentoConsulta{
    private ConsultaRepository repository;

    public void validar(DadosAgendamentoConsulta dados){
        var medicoPossuiOutraConsultaNoMesmoHorario =
                repository.existsByMedico_IdAndDataConsulta(dados.idMedico(), dados.data());

        if (medicoPossuiOutraConsultaNoMesmoHorario) {
            throw new ValidacaoException("Medico já possui outra consulta agendada nesse mesmo horário!");
        }
    }

}
