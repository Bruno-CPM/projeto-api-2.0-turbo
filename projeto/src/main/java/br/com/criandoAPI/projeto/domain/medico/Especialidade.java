package br.com.criandoAPI.projeto.domain.medico;

import com.fasterxml.jackson.annotation.JsonCreator;

public enum Especialidade {
    PEDIATRIA,
    GINECOLOGIA,
    DERMATOLOGIA,
    UROLOGIA;

    @JsonCreator
    public static Especialidade from(String value) {
        if (value == null) return null;
        return Especialidade.valueOf(value.trim().toUpperCase());
    }

}
