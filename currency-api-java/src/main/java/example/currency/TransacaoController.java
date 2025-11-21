package example.currency;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/transacoes")
public class TransacaoController {

    static {
        System.out.println("***** TRANSACAO CONTROLLER CARREGADO *****");
    }


    @Autowired
    private TransacaoRepository transacaoRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @GetMapping("/{cpf}")
    public ResponseEntity<?> listarPorCpf(
            @PathVariable String cpf,
            @RequestHeader("Authorization") String authHeader) {

        System.out.println("ENTROU NO CONTROLLER TRANSACAO");

        String token = authHeader.substring(7);

        String cpfToken = jwtUtil.extrairCpf(token);
        System.out.println("CPF do token: " + cpfToken);
        System.out.println("CPF da URL: " + cpf);

        if (!cpfToken.equals(cpf)) {
            return new ResponseEntity<>("Você não tem permissão para acessar este extrato", HttpStatus.FORBIDDEN);
        }

        List<Transacao> transacoes = transacaoRepository.findByCpf(cpf);

        if (transacoes.isEmpty()) {
            return new ResponseEntity<>("Nenhuma transação encontrada", HttpStatus.NOT_FOUND);
        }

        return ResponseEntity.ok(transacoes);
    }

}
