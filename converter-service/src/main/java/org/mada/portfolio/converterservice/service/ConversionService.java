package org.mada.portfolio.converterservice.service;

import lombok.RequiredArgsConstructor;
import org.mada.portfolio.converterservice.dto.ConversionRequest;
import org.mada.portfolio.converterservice.dto.ConversionResponse;
import org.mada.portfolio.converterservice.exchangeratesdata.ExchangeRateData;
import org.mada.portfolio.converterservice.exchangeratesdata.ExchangeRatesFetcher;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.env.Environment;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class ConversionService {

    private final ExchangeRatesFetcher fetcher;
    private final Environment environment;

    @Cacheable("exchangeRatesCache")
    public ExchangeRateData fetchData(){

        return fetcher.fetchExchangeRates(this.getApiUrl());
    }

    public ConversionResponse convertAmount(ConversionRequest conversionRequest) {

        ExchangeRateData data = fetchData();
        Map<String, Double> conversionRates = data.getConversionRates();

        // Retrieve the exchange rates for fromCurrency and toCurrency
        Double fromRate = conversionRates.get(conversionRequest.getFromCode());
        Double toRate = conversionRates.get(conversionRequest.getToCode());


        if (fromRate != null && toRate != null){
            //Convert the amount using exchange rates
            Double convertedAmount = conversionRequest.getAmount() * (toRate / fromRate);

            return ConversionResponse.builder()
                    .fromCode(conversionRequest.getFromCode())
                    .toCode(conversionRequest.getToCode())
                    .conversionResult(convertedAmount)
                    .build();
        }else{
            throw new IllegalArgumentException("Invalid Currency codes");
        }
    }

    private String getApiUrl(){
        String apiUrl = environment.getProperty("api.url");

        if (apiUrl == null){
            throw new IllegalStateException("Api url not found");
        }
        return apiUrl;
    }
}
