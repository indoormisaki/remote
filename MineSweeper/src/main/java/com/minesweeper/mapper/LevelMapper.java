package com.minesweeper.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.minesweeper.entity.Level;

@Mapper
public interface LevelMapper {
	List<Level> findAll();

	Level selectLevel(Long id);
}
