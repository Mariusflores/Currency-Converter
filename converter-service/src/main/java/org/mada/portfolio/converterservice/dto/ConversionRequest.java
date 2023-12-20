package org.mada.portfolio.converterservice.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ConversionRequest {

    private String fromCode;
    private String toCode;
    private Double amount;

}
