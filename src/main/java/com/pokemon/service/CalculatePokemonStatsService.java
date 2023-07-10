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
import com.pokemon.entity.PokemonStats;

@Service
public class CalculatePokemonStatsService {

	@Transactional
	public PokemonStats calculatePokemonStats(PokemonData pokemonData, int level) {
		PokemonStats pokemonStats = new PokemonStats();
		//HP
		pokemonStats.setHp((pokemonData.getBaseStats().getHp() * 2 + 31 + 0 / 4) * level /100 + level + 10);
		//こうげき
		pokemonStats.setAttack((pokemonData.getBaseStats().getAttack() * 2 + 31 + 0 / 4) * level / 100 + 5);
		//ぼうぎょ
		pokemonStats.setDefense((pokemonData.getBaseStats().getDefense() * 2 + 31 + 0 / 4) * level / 100 + 5);
		//とくこう
		pokemonStats.setSpecialAttack((pokemonData.getBaseStats().getSpecialAttack() * 2 + 31 + 0 / 4) * level / 100 + 5);
		//とくぼう
		pokemonStats.setSpecialDefense((pokemonData.getBaseStats().getSpecialDefense() * 2 + 31 + 0 / 4) * level / 100 + 5);
		//すばやさ
		pokemonStats.setSpeed((pokemonData.getBaseStats().getSpeed() * 2 + 31 + 0 / 4) * level / 100 + 5);

		return pokemonStats;
	}
}
