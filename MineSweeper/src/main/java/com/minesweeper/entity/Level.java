package com.minesweeper.entity;

public class Level {
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
}
