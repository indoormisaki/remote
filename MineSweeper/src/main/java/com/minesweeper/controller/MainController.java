package com.minesweeper.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.minesweeper.entity.Level;
import com.minesweeper.entity.Ranking;
import com.minesweeper.form.RegisterScoreForm;
import com.minesweeper.form.SelectLevelForm;
import com.minesweeper.service.GetAllLevelsService;
import com.minesweeper.service.GetAllRankingsService;
import com.minesweeper.service.RegisterScoreService;
import com.minesweeper.service.SelectLevelService;


@Controller
public class MainController {
	@Autowired
	private GetAllLevelsService getAllLevelsService;

	@Autowired
	private SelectLevelService selectLevelService;

	@Autowired
	private RegisterScoreService registerScoreService;

	@Autowired
	private GetAllRankingsService getAllRankingsService;

	@GetMapping("/index")
	public String index(Model model) {
		List<Level> levels = getAllLevelsService.getAllLevels();
		List<Ranking> easyRankings = getAllRankingsService.getAllRankings(1);
		List<Ranking> normalRankings = getAllRankingsService.getAllRankings(2);
		List<Ranking> hardRankings = getAllRankingsService.getAllRankings(3);
		model.addAttribute("levelForm", new SelectLevelForm());
		model.addAttribute("levels", levels);
		model.addAttribute("easyRankings", easyRankings);
		model.addAttribute("normalRankings", normalRankings);
		model.addAttribute("hardRankings", hardRankings);
		return "index";
	}

	@PostMapping("/game")
	public String game(@ModelAttribute("levelForm") SelectLevelForm levelForm, Model model) {
		Level level = selectLevelService.selectLevel(levelForm.getId());
		SelectLevelForm form = new SelectLevelForm();
		form.setLevel(level);
		model.addAttribute("level", level);
		model.addAttribute("levelForm", form);
		model.addAttribute("form", new RegisterScoreForm());
		return "game";
	}

	@PostMapping("/index")
	public String register(@ModelAttribute("form") RegisterScoreForm form, BindingResult result, Model model) {
		if (result.hasErrors()) {
			model.addAttribute("form", form);
			return "game";
		}
		registerScoreService.register(form);
		return "redirect:/index";
	}

}
