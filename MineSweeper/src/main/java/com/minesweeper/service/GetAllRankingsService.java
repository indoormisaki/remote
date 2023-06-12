package com.minesweeper.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.minesweeper.entity.Ranking;
import com.minesweeper.mapper.RankingMapper;

@Service
public class GetAllRankingsService {

	@Autowired
	private RankingMapper mapper;

	@Transactional
	public List<Ranking> getAllRankings(int levelId) {
		return mapper.findAll(levelId);
	}
}
