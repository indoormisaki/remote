package com.pokemon.form;

import com.pokemon.entity.BaseStats;

public class SelectLevelForm {
	private Long id;

	private String name;

	private Long fieldColumn;

	private Long fieldRow;

	private Long mine;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getFieldColumn() {
		return fieldColumn;
	}

	public void setFieldColumn(Long fieldColumn) {
		this.fieldColumn = fieldColumn;
	}

	public Long getFieldRow() {
		return fieldRow;
	}

	public void setFieldRow(Long fieldRow) {
		this.fieldRow = fieldRow;
	}

	public Long getMine() {
		return mine;
	}

	public void setMine(Long mine) {
		this.mine = mine;
	}

	public void setLevel(BaseStats level) {
		this.id = level.getId();
		this.name = level.getName();
		this.fieldColumn = getFieldColumn();
		this.fieldRow = getFieldRow();
		this.mine = level.getMine();
	}

}
