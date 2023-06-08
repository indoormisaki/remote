package com.minesweeper.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.minesweeper.entity.Level;
import com.minesweeper.mapper.LevelMapper;

@Service
public class GetAllLevelsService {

	@Autowired
	private LevelMapper mapper;

	@Transactional
	public List<Level> getAllLevels() {
		return mapper.findAll();
	}
}
