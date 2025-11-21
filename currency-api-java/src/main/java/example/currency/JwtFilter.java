package example.currency;

import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Autowired
    private JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        System.out.println(">>> MÉTODO HTTP CHEGANDO: " + request.getMethod());
        String path = request.getRequestURI();
        System.out.println("Filtro JWT - Path: " + path);

        if (path.equals("/auth/login") || path.equals("/auth/register")) {
            System.out.println("Rota de login/register ignorada pelo filtro");
            filterChain.doFilter(request, response);
            return;
        }

        String header = request.getHeader("Authorization");
        System.out.println("Header Authorization: " + header);

        if (header == null || !header.startsWith("Bearer ")) {
            System.out.println("Token não encontrado ou formato inválido.");
            response.setStatus(401);
            response.getWriter().write("Token não fornecido ou malformado.");
            return;
        }

        String token = header.substring(7);
        System.out.println("Token extraído: " + token);

        if (!jwtUtil.tokenValido(token)) {
            System.out.println("Token inválido ou expirado.");
            response.setStatus(403); 
            response.getWriter().write("Token inválido ou expirado.");
            return;
        }

        System.out.println("Token válido. Continuando com a requisição.");
        filterChain.doFilter(request, response);
    }
}
