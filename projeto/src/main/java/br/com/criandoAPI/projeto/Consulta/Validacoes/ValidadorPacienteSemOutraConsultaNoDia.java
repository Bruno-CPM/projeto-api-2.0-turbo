package br.com.criandoAPI.projeto.Consulta.Validacoes;

import br.com.criandoAPI.domain.ValidacaoException;
import br.com.criandoAPI.projeto.Consulta.ConsultaRepository;
import br.com.criandoAPI.projeto.Consulta.DadosAgendamentoConsulta;
import org.aspectj.apache.bcel.Repository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class ValidadorPacienteSemOutraConsultaNoDia implements ValidadorAgendamentoConsulta{

    @Autowired
    private ConsultaRepository repository;

    public void validar(DadosAgendamentoConsulta dados) {
        var primeiroHorario = dados.data().withHour(7);
        var ultimoHorario = dados.data().withHour(18);

        var pacientePossuiOutraConsultaNoDia =
                repository.existsByPaciente_IdAndDataConsultaBetween(dados.idPaciente(), primeiroHorario, ultimoHorario);
        if ( pacientePossuiOutraConsultaNoDia) {
            throw new ValidacaoException("Paciente ja possui uma consulta agendada nesse dia!");
        }
    }
}
