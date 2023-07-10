package com.pokemon.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.github.oscar0812.pokeapi.models.moves.Move;
import com.github.oscar0812.pokeapi.models.pokemon.Pokemon;
import com.pokemon.entity.PokemonMoveEntity;

@Service
public class GetPokemonMovesService {

	@Autowired
	private TranslationService translationService;

	@Transactional
	public List<PokemonMoveEntity> getPokemonMoves(Pokemon pokemon) {
		List<PokemonMoveEntity> pokemonMoveList = new ArrayList<PokemonMoveEntity>();

		for (int i = 0; pokemonMoveList.size() < 4; i++) {
			PokemonMoveEntity pokemonMove = new PokemonMoveEntity();
			Random rand = new Random();
			Move move = pokemon.getMoves().get(rand.nextInt(pokemon.getMoves().size())).getMove();
			pokemonMove.setName(move.getNames().get(0).getName());
			pokemonMove.setPp(move.getPp());
			if (move.getAccuracy() == 0) {
				pokemonMove.setAccuracy(100);
			} else {
				pokemonMove.setAccuracy(move.getAccuracy());
			}
			pokemonMove.setPriority(move.getPriority());
			pokemonMove.setPower(move.getPower());
			pokemonMove.setDamageClass(move.getDamageClass().getName());
			pokemonMove.setType(translationService.translation(move.getType().getName()));
			if (move.getMeta().getMinHits() == 0) {
				pokemonMove.setMinHits(1);
			} else {
				pokemonMove.setMinHits(move.getMeta().getMinHits());
			}
			if (move.getMeta().getMaxHits() == 0) {
				pokemonMove.setMaxHits(1);
			} else {
				pokemonMove.setMaxHits(move.getMeta().getMaxHits());
			}
			pokemonMove.setDrain(move.getMeta().getDrain());
			pokemonMove.setAilment(translationService.translation(move.getMeta().getAilment().getName()));
			pokemonMove.setAilmentChance(move.getMeta().getAilmentChance());
			if (move.getDamageClass().getName() != "status" && move.getPower() != 0
					&& !pokemonMoveList.contains(pokemonMove)) {
				pokemonMoveList.add(pokemonMove);
			}
		}

		return pokemonMoveList;
	}
}
