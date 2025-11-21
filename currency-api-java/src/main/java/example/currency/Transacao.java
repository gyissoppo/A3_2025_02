package example.currency;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "transacoes")
public class Transacao {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String cpf;
    private Double valor;
    private String tipo;

    @Column(name = "data_transacao")
    private LocalDate dataTransacao;

    @Column(name = "hora_transacao")
    private String horaTransacao;

    public Transacao() {}

    // GETTERS
    public Integer getId() { return id; }
    public String getCpf() { return cpf; }
    public Double getValor() { return valor; }
    public String getTipo() { return tipo; }
    public LocalDate getDataTransacao() { return dataTransacao; }
    public String getHoraTransacao() { return horaTransacao; }

    // SETTERS
    public void setId(Integer id) { this.id = id; }
    public void setCpf(String cpf) { this.cpf = cpf; }
    public void setValor(Double valor) { this.valor = valor; }
    public void setTipo(String tipo) { this.tipo = tipo; }
    public void setDataTransacao(LocalDate dataTransacao) { this.dataTransacao = dataTransacao; }
    public void setHoraTransacao(String horaTransacao) { this.horaTransacao = horaTransacao; }
}
