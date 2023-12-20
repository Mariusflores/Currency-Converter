package org.mada.portfolio.converterservice.controllers;

import org.mada.portfolio.converterservice.dto.ConversionRequest;
import org.mada.portfolio.converterservice.dto.ConversionResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ConversionController {

    @GetMapping("/convert")
    @ResponseStatus(HttpStatus.OK)
    public ConversionResponse convertAmount(@RequestBody ConversionRequest conversionRequest){

    }
}
