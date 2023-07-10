package com.pokemon.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.oscar0812.pokeapi.models.pokemon.Pokemon;
import com.github.oscar0812.pokeapi.models.pokemon.PokemonAbility;
import com.github.oscar0812.pokeapi.models.pokemon.PokemonSprites;
import com.github.oscar0812.pokeapi.models.pokemon.PokemonType;
import com.pokemon.entity.BaseStats;
import com.pokemon.entity.PokemonData;

@Service
public class GetPokemonDataService {

	@Autowired
	private TranslationService translationService;

	@Autowired
	private GetBaseStatsService getBaseStatsService;

	@Transactional
	public PokemonData getPokemonData(Pokemon pokemon) {
		PokemonData pokemonData = new PokemonData();
		pokemonData.setId(pokemon.getId());
		pokemonData.setName(translationService.translation(pokemon.getName()));
		List<PokemonType> types = pokemon.getTypes();
		List<String> typeList = new ArrayList<String>();
		for (int i = 0; i <types.size(); i++) {
			String type = translationService.translation(types.get(i).getType().getName());
			typeList.add(type);
		}
		pokemonData.setTypes(typeList);
		List<PokemonAbility> abilities = pokemon.getAbilities();
		List<String> abilityList = new ArrayList<String>();
		for (int i = 0; i <abilities.size(); i++) {
			String ability = abilities.get(i).getAbility().getName();
			abilityList.add(ability);
		}
		pokemonData.setAbilities(abilityList);
		pokemonData.setHeight((double)pokemon.getHeight() / 10);
		pokemonData.setWeight((double)pokemon.getWeight() / 10);
		pokemonData.setBaseStats(getBaseStatsService.getBaseStats(pokemon));
		pokemonData.setFrontSprite(pokemon.getSprites().getFrontDefault());
		pokemonData.setBackSprite(pokemon.getSprites().getBackDefault());

		return pokemonData;
	}
}
