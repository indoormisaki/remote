package com.minesweeper.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.minesweeper.entity.Ranking;

@Mapper
public interface RankingMapper {
	List<Ranking> findAll(int levelId);

	int register(Ranking entity);
}
