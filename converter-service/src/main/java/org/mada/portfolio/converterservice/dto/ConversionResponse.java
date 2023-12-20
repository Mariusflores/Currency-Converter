package org.mada.portfolio.converterservice.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ConversionResponse {
    private Double conversionResult;
    private String fromCode;
    private String toCode;
}
