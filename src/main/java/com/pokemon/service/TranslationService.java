package com.pokemon.service;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.pokemon.entity.TranslationData;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;

import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;

@Service
public class TranslationService {
    private List<TranslationData> translationList;

    public String translation(String enPokemonName) {
        ObjectMapper objectMapper = new ObjectMapper();
        String ja = "";
        try {
            ClassPathResource resource = new ClassPathResource("pokemon.json");
            InputStream inputStream = resource.getInputStream();
            translationList = objectMapper.readValue(inputStream, new TypeReference<List<TranslationData>>() {});
            ja = translateEnToJa(enPokemonName);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return ja;
    }

    private String translateEnToJa(String enPokemonName) {
        for (TranslationData translation : translationList) {
            if (translation.getEn().equals(enPokemonName)) {
                return translation.getJa();
            }
        }
        return "Translation not found";
    }
}
