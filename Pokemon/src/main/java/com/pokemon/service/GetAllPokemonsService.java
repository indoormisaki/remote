package com.pokemon.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.oscar0812.pokeapi.utils.Client;

@Service
public class GetAllPokemonsService {

	@Autowired
	private TranslationService translationService;

	@Transactional
	public List<String> getAllPokemons() {
		List<String> allPokemons = new ArrayList<String>();
		for (int i = 1; i < 387; i++) {
			String pokemonName = translationService.translation(Client.getPokemonById(i).getName());
			allPokemons.add(pokemonName);
		}

		return allPokemons;
	}
}
