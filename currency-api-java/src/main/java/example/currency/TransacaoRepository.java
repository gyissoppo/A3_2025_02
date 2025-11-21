package example.currency;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TransacaoRepository extends JpaRepository<Transacao, Integer> {
    // Consulta as transações pelo CPF
    List<Transacao> findByCpf(String cpf);
}
