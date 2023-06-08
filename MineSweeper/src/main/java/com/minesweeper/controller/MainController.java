package com.minesweeper.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;

import com.minesweeper.entity.Level;
import com.minesweeper.form.SelectLevelForm;
import com.minesweeper.service.GetAllLevelsService;
import com.minesweeper.service.SelectLevelService;


@Controller
public class MainController {
	@Autowired
	private GetAllLevelsService getAllLevelsService;

	@Autowired
	private SelectLevelService selectLevelService;

	@GetMapping("/index")
	public String index(Model model) {
		List<Level> levels = getAllLevelsService.getAllLevels();
		model.addAttribute("levelForm", new SelectLevelForm());
		model.addAttribute("levels", levels);
		return "index";
	}

	@PostMapping("/game")
	public String game(@ModelAttribute("levelForm") SelectLevelForm levelForm, Model model) {
		Level level = selectLevelService.selectLevel(levelForm.getId());
		SelectLevelForm form = new SelectLevelForm();
		form.setLevel(level);
		model.addAttribute("level", level);
		model.addAttribute("levelForm", form);
		return "game";
	}

}
