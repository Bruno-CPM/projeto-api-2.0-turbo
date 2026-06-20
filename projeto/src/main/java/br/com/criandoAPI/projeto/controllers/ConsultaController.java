package br.com.criandoAPI.projeto.controllers;

import br.com.criandoAPI.projeto.Consulta.AgendaDeConsulta;
import br.com.criandoAPI.projeto.Consulta.DadosAgendamentoConsulta;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("consultas")
public class ConsultaController {

    @Autowired
    private AgendaDeConsulta agenda;

    @PostMapping
    @Transactional
    public ResponseEntity agendar (@RequestBody @Valid DadosAgendamentoConsulta dados){

       var dto = agenda.agendar(dados);
        return ResponseEntity.ok(dto);
    }
}
