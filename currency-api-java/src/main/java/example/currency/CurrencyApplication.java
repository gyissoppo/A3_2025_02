package example.currency;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication(scanBasePackages = "example.currency")
public class CurrencyApplication {

    public static void main(String[] args) {
        SpringApplication.run(CurrencyApplication.class, args);
    }

    @Bean
    public CommandLineRunner testDatabase(TransacaoRepository repo) {
        return args -> {
            System.out.println("===== TESTE DO REPOSITÓRIO =====");

            try {
                var lista = repo.findAll();
                System.out.println("Transações encontradas: " + lista.size());

                for (Transacao t : lista) {
                    System.out.println(
                            "ID: " + t.getId() +
                            " | CPF: " + t.getCpf() +
                            " | Valor: " + t.getValor() +
                            " | Tipo: " + t.getTipo()
                    );
                }
            } catch (Exception e) {
                System.out.println("ERRO AO ACESSAR O REPOSITÓRIO:");
                e.printStackTrace();
            }

            System.out.println("===== FIM DO TESTE DO REPOSITÓRIO =====");
        };
    }
}
