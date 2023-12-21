package org.mada.portfolio.converterservice.controllers;

import lombok.RequiredArgsConstructor;
import org.mada.portfolio.converterservice.dto.ConversionRequest;
import org.mada.portfolio.converterservice.dto.ConversionResponse;
import org.mada.portfolio.converterservice.service.ConversionService;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ConversionController {

    private final ConversionService conversionService;
    private Environment environment;

    @PostMapping("/convert")
    @ResponseStatus(HttpStatus.OK)
    public ConversionResponse convertAmount(@RequestBody ConversionRequest conversionRequest){

        return conversionService.convertAmount(conversionRequest);
    }
}
