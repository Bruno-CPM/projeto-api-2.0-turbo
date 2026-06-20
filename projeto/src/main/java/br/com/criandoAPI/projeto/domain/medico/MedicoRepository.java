package br.com.criandoAPI.projeto.domain.medico;

import br.com.criandoAPI.projeto.domain.paciente.Paciente;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDateTime;

public interface MedicoRepository extends JpaRepository<Medico, Long> {
    Page<Medico> findAllByAtivoTrue(Pageable paginacao);

    Medico getReferenceById(Long id);

    @Query(value = """
                select m from Medico m
                where
                m.ativo = 1
                and
                m.especialidade = :especialidade
                and
                m.id not in(
                        select c.medico.id from Consulta c
                        where
                        c.data = :data
                )
                order by rand()
                limit 1
               """, nativeQuery = true)

    Medico escolherMedicoAleatorioLivreNaData(Especialidade especialidade, LocalDateTime data);

    @Query("""
           select m.ativo
           from Medico m 
           where 
           m.id = :id
            """)
    boolean findAllByAtivoTrue(Long id);


    boolean existsById(Long id);
}
