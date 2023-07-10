package com.pokemon.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.oscar0812.pokeapi.models.pokemon.Pokemon;
import com.github.oscar0812.pokeapi.models.pokemon.PokemonStat;
import com.pokemon.entity.BaseStats;
import com.pokemon.entity.Stats;
import com.pokemon.mapper.LevelMapper;

@Service
public class GetBaseStatsService {

	@Transactional
	public BaseStats getBaseStats(Pokemon pokemon) {
		List<PokemonStat> stats = pokemon.getStats();
		BaseStats baseStats = new BaseStats();
		baseStats.setHp(stats.get(0).getBaseStat());
		baseStats.setAttack(stats.get(1).getBaseStat());
		baseStats.setDefense(stats.get(2).getBaseStat());
		baseStats.setSpecialAttack(stats.get(3).getBaseStat());
		baseStats.setSpecialDefense(stats.get(4).getBaseStat());
		baseStats.setSpeed(stats.get(5).getBaseStat());
		return baseStats;
	}
}
