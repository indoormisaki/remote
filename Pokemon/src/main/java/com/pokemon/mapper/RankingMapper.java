package com.pokemon.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pokemon.entity.PokemonData;

@Mapper
public interface RankingMapper {
	List<PokemonData> findAll(int levelId);

	int register(PokemonData entity);
}
