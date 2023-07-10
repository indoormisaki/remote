package com.pokemon.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.pokemon.entity.BaseStats;

@Mapper
public interface LevelMapper {
	List<BaseStats> findAll();

	BaseStats selectLevel(Long id);
}
