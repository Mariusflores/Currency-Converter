package org.mada.portfolio.converterservice.exchangeratesdata;

import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
public class ExchangeRatesFetcher {

    private final WebClient webClient;
    private final ObjectMapper objectMapper;

    public ExchangeRateData fetchExchangeRates(String apiUrl){
        try{

            String responseBody = webClient.get()
                    .uri(apiUrl)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();
            return objectMapper.readValue(responseBody, ExchangeRateData.class);

        }catch (Exception e){
            throw new RuntimeException("Error fetching exchange rates", e);
        }

    }
}
