package com.pokemon.entity;

import java.util.Objects;

public class PokemonMoveEntity {
	private String name;

	private int pp;

	private int accuracy;

	private int priority;

	private int power;

	private String damageClass;

	private String type;

	private int minHits;

	private int maxHits;

	private int drain;

	private String ailment;

	private int ailmentChance;

	@Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (obj == null || getClass() != obj.getClass()) {
            return false;
        }
        PokemonMoveEntity other = (PokemonMoveEntity) obj;
        // 各フィールドを比較して同じであればtrueを返す
        return Objects.equals(name, other.name)
                && pp == other.pp
                && Objects.equals(accuracy, other.accuracy)
                && priority == other.priority
                && power == other.power
                && Objects.equals(damageClass, other.damageClass)
                && Objects.equals(type, other.type);
    }

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public int getPp() {
		return pp;
	}

	public void setPp(int pp) {
		this.pp = pp;
	}

	public int getAccuracy() {
		return accuracy;
	}

	public void setAccuracy(int accuracy) {
		this.accuracy = accuracy;
	}

	public int getPriority() {
		return priority;
	}

	public void setPriority(int priority) {
		this.priority = priority;
	}

	public int getPower() {
		return power;
	}

	public void setPower(int power) {
		this.power = power;
	}

	public String getDamageClass() {
		return damageClass;
	}

	public void setDamageClass(String damageClass) {
		this.damageClass = damageClass;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public int getMinHits() {
		return minHits;
	}

	public void setMinHits(int minHits) {
		this.minHits = minHits;
	}

	public int getMaxHits() {
		return maxHits;
	}

	public void setMaxHits(int maxHits) {
		this.maxHits = maxHits;
	}

	public int getDrain() {
		return drain;
	}

	public void setDrain(int drain) {
		this.drain = drain;
	}

	public String getAilment() {
		return ailment;
	}

	public void setAilment(String ailment) {
		this.ailment = ailment;
	}

	public int getAilmentChance() {
		return ailmentChance;
	}

	public void setAilmentChance(int ailmentChance) {
		this.ailmentChance = ailmentChance;
	}
}
