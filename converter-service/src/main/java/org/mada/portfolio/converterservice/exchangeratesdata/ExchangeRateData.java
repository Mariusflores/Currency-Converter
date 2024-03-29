package org.mada.portfolio.converterservice.exchangeratesdata;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;

import java.util.Map;

@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class ExchangeRateData {

    private String result;

    @JsonProperty("conversion_rates")
    private Map<String, Double> conversionRates;
}
