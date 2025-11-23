package example.currency;

import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import java.util.Map;



@RestController
public class CurrencyController {

    @GetMapping("/api/currency")
public Map<String, Object> getRates() {
    String url = "https://economia.awesomeapi.com.br/json/last/USD-BRL,EUR-BRL,ARS-BRL,BTC-BRL,JPY-BRL,ETH-BRL";
    RestTemplate restTemplate = new RestTemplate();

    ResponseEntity<Map<String, Object>> response = restTemplate.exchange(
        url,
        HttpMethod.GET,
        null,
        new ParameterizedTypeReference<Map<String, Object>>() {}
    );

    return response.getBody();
}
}
