package br.com.criandoAPI.projeto.domain.medico;

import jakarta.persistence.*;
import lombok.*;

@Table (name = "medico")
@Entity(name = "Medico")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@EqualsAndHashCode
public class Medico {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nome;
    private String email;
    private String cpf;
    private String crm;
    private boolean ativo;

    @Enumerated(EnumType.STRING)
    private Especialidade especialidade;


    public  Medico (DadosCadastroMedico dados){
        this.ativo = true;
        this.nome = dados.nome();
        this.email = dados.email();
        this.especialidade = dados.especialidade();
        this.crm = dados.crm();
    }

    public void AtualizarInformacoes(DadosAtualizarMedico dados){
        if (dados.nome() != null){
            this.nome = dados.nome();
        }if (dados.email() != null){
            this.email = dados.email();
        } if (dados.crm() != null){
            this.crm = dados.crm();
        }
        if (dados.especialidade() != null){
            this.especialidade = dados.especialidade();
        }
    }

    public void excluir(){this.ativo = false;}
}
