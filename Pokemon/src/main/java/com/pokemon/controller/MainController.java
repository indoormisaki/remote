package com.pokemon.controller;

import java.util.List;
import java.util.Map;
import java.util.Objects;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.github.oscar0812.pokeapi.models.pokemon.Pokemon;
import com.github.oscar0812.pokeapi.models.pokemon.PokemonAbility;
import com.github.oscar0812.pokeapi.models.pokemon.PokemonForm;
import com.github.oscar0812.pokeapi.models.pokemon.PokemonStat;
import com.github.oscar0812.pokeapi.models.pokemon.PokemonType;
import com.github.oscar0812.pokeapi.utils.Client;
import com.pokemon.entity.BaseStats;
import com.pokemon.entity.PokemonData;
import com.pokemon.entity.PokemonMoveEntity;
import com.pokemon.entity.PokemonStats;
import com.pokemon.service.CalculatePokemonStatsService;
import com.pokemon.service.GetAllPokemonsService;
import com.pokemon.service.GetBaseStatsService;
import com.pokemon.service.GetPokemonDataService;
import com.pokemon.service.GetPokemonMovesService;

@Controller
public class MainController {

	@Autowired
	private GetAllPokemonsService getAllPokemonsService;

	@Autowired
	private GetPokemonDataService getPokemonDataService;

	@Autowired
	private CalculatePokemonStatsService calculatePokemonStatsService;

	@Autowired
	private GetPokemonMovesService getPokemonMovesService;

	@GetMapping("/index")
	public String index(Model model) {
		List<String> allPokemons = getAllPokemonsService.getAllPokemons();
		model.addAttribute("allPokemons", allPokemons);

		return "index";
	}

	@GetMapping("/pokedex")
	public String pokedex(@RequestParam("id") int id, Model model) {
		Pokemon myPokemon = Client.getPokemonById(id);
		PokemonData pokemonData = getPokemonDataService.getPokemonData(myPokemon);
		model.addAttribute("pokemonData", pokemonData);

		return "pokedex";
	}

	@PostMapping("/battle")
	public String battle(@RequestParam("myPokemonId") int myPokemonId, @RequestParam("enemyPokemonId") int enemyPokemonId, Model model) {
		Pokemon myPokemon = Client.getPokemonById(myPokemonId);
		Pokemon enemyPokemon = Client.getPokemonById(enemyPokemonId);

		PokemonData myPokemonData = getPokemonDataService.getPokemonData(myPokemon);
		PokemonData enemyPokemonData = getPokemonDataService.getPokemonData(enemyPokemon);

		PokemonStats myPokemonStats = calculatePokemonStatsService.calculatePokemonStats(myPokemonData, 50);
		PokemonStats enemyPokemonStats = calculatePokemonStatsService.calculatePokemonStats(enemyPokemonData, 50);

		List<PokemonMoveEntity> myPokemonMoves = getPokemonMovesService.getPokemonMoves(myPokemon);
		List<PokemonMoveEntity> enemyPokemonMoves = getPokemonMovesService.getPokemonMoves(enemyPokemon);

		model.addAttribute("myPokemonData", myPokemonData);
		model.addAttribute("myPokemonStats", myPokemonStats);
		model.addAttribute("myPokemonMoves", myPokemonMoves);
		model.addAttribute("enemyPokemonData", enemyPokemonData);
		model.addAttribute("enemyPokemonStats", enemyPokemonStats);
		model.addAttribute("enemyPokemonMoves", enemyPokemonMoves);

		return "battle";
	}
}
