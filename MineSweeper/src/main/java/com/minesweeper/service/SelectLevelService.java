package com.minesweeper.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.minesweeper.entity.Level;
import com.minesweeper.mapper.LevelMapper;

@Service
public class SelectLevelService {

	@Autowired
	private LevelMapper mapper;

	@Transactional
	public Level selectLevel(Long id) {
		return mapper.selectLevel(id);
	}
}
