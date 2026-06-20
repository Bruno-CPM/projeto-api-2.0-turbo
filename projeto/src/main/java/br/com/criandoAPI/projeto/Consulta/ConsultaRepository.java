package br.com.criandoAPI.projeto.Consulta;


import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDateTime;

public interface ConsultaRepository extends JpaRepository<Consulta, Long> {

    boolean existsByMedico_IdAndDataConsultaBetween(Long idMedico, LocalDateTime primeiroHorario, LocalDateTime ultimoHorario);

    boolean existsByMedico_IdAndDataConsulta(Long idMedico, LocalDateTime data);

    boolean existsByPaciente_IdAndDataConsultaBetween(Long idPaciente, LocalDateTime primeiroHorario, LocalDateTime ultimoHorario);
}
