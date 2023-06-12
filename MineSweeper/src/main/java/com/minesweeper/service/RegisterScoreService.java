package com.minesweeper.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.minesweeper.entity.Ranking;
import com.minesweeper.form.RegisterScoreForm;
import com.minesweeper.mapper.RankingMapper;

@Service
public class RegisterScoreService {

	@Autowired
	private RankingMapper mapper;

	@Transactional
	public int register(RegisterScoreForm form) {
		Ranking entity = new Ranking();
		entity.setName(form.getName());
		entity.setScore(form.getScore());
		entity.setLevelId(form.getLevelId());

		return mapper.register(entity);
	}
}
