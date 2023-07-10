package com.pokemon.entity;

import java.util.List;

public class PokemonData {
	private int id;

	private String name;

	private List<String> types;

	private List<String> abilities;

	private double height;

	private double weight;

	private BaseStats baseStats;

	private String frontSprite;

	private String backSprite;

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public double getHeight() {
		return height;
	}

	public void setHeight(double height) {
		this.height = height;
	}

	public double getWeight() {
		return weight;
	}

	public void setWeight(double weight) {
		this.weight = weight;
	}

	public List<String> getTypes() {
		return types;
	}

	public void setTypes(List<String> types) {
		this.types = types;
	}

	public List<String> getAbilities() {
		return abilities;
	}

	public void setAbilities(List<String> abilities) {
		this.abilities = abilities;
	}

	public BaseStats getBaseStats() {
		return baseStats;
	}

	public void setBaseStats(BaseStats baseStats) {
		this.baseStats = baseStats;
	}

	public String getFrontSprite() {
		return frontSprite;
	}

	public void setFrontSprite(String frontSprite) {
		this.frontSprite = frontSprite;
	}

	public String getBackSprite() {
		return backSprite;
	}

	public void setBackSprite(String backSprite) {
		this.backSprite = backSprite;
	}

}