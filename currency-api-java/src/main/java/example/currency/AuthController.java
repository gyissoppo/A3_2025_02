package example.currency;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Usuario req) {
        System.out.println("=== LOGIN REQUISIÇÃO ===");
        System.out.println("Email recebido: " + req.getEmail());
        System.out.println("Senha recebida: " + req.getSenha());

        Usuario usuario = usuarioRepository.findByEmail(req.getEmail());
        System.out.println("Usuario encontrado no banco: " + usuario);

        if (usuario == null) {
            System.out.println("Nenhum usuário encontrado com esse email!");
            return ResponseEntity.status(401).body("Credenciais inválidas");
        }

        System.out.println("Senha do banco: " + usuario.getSenha());

        if (!usuario.getSenha().equals(req.getSenha())) {
            System.out.println("Senha incorreta!");
            return ResponseEntity.status(401).body("Credenciais inválidas");
        }

        System.out.println("Senha correta, gerando token...");
        String token = jwtUtil.gerarToken(usuario.getEmail(), usuario.getCpf());
        System.out.println("Token gerado: " + token);

        return ResponseEntity.ok(new LoginResponse(token, usuario.getCpf(), usuario.getNome()));
    }

    public static class LoginResponse {
        private String token;
        private String cpf;
        private String nome;

        public LoginResponse(String token, String cpf, String nome) {
            this.token = token;
            this.cpf = cpf;
            this.nome = nome;
        }

        public String getToken() {
            return token;
        }

        public void setToken(String token) {
            this.token = token;
        }

        public String getCpf() {
            return cpf;
        }

        public void setCpf(String cpf) {
            this.cpf = cpf;
        }

        public String getNome() {
            return nome;
        }

        public void setNome(String nome) {
            this.nome = nome;
        }
    }

    @PostMapping("/register")
    public Usuario register(@RequestBody Usuario usuario) {
        System.out.println("=== REGISTER ===");
        System.out.println("Registrando usuário: " + usuario);
        return usuarioRepository.save(usuario);
    }

    @GetMapping("/me")
    public ResponseEntity<?> getUserInfo(@RequestHeader("Authorization") String authHeader) {
        System.out.println("=== GET USER INFO ===");

        String token = authHeader.replace("Bearer ", "");

        if (!jwtUtil.tokenValido(token)) {
            System.out.println("Token inválido!");
            return ResponseEntity.status(403).body("Token inválido");
        }

        String email = jwtUtil.extrairEmail(token);
        System.out.println("Token válido! Email extraído do token: " + email);

        Usuario usuario = usuarioRepository.findByEmail(email);
        if (usuario == null) {
            System.out.println("Nenhum usuário encontrado para o email: " + email);
            return ResponseEntity.status(404).body("Usuário não encontrado");
        }

        System.out.println("Usuário encontrado: " + usuario);

        return ResponseEntity.ok(usuario);
    }
}
