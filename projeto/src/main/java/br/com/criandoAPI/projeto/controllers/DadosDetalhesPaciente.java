package br.com.criandoAPI.projeto.controllers;

import br.com.criandoAPI.projeto.domain.paciente.Paciente;

public record DadosDetalhesPaciente(Long id, String nome, String email, String telefone, String cpf) {
    public DadosDetalhesPaciente(Paciente paciente){
        this (paciente.getId(), paciente.getNome(), paciente.getEmail(), paciente.getTelefone(), paciente.getCpf());
    }
}
