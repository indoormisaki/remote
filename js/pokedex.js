(function () {
	function set(id, value) {
		document.getElementById(id).textContent = value;
	}

	function list(id, label, values) {
		var box = document.getElementById(id);
		values.forEach(function (v) {
			var row = document.createElement("div");
			row.textContent = label + "：" + v;
			box.appendChild(row);
		});
	}

	var id = Pokemon.parseId(Pokemon.getParam("id"));
	if (id === null) {
		document.getElementById("loading").classList.add("hidden");
		Pokemon.showError(new Error("図鑑番号は1〜" + Pokemon.MAX_ID + "で指定してください"));
		return;
	}

	Pokemon.getPokemon(id).then(function (p) {
		var d = Pokemon.toPokemonData(p);
		document.getElementById("front-sprite").src = d.frontSprite || "";
		document.getElementById("back-sprite").src = d.backSprite || "";
		set("no", d.id);
		set("name", d.name);
		list("types", "タイプ", d.types);
		list("abilities", "とくせい", d.abilities);
		set("height", d.height);
		set("weight", d.weight);
		set("hp", d.baseStats.hp);
		set("attack", d.baseStats.attack);
		set("defense", d.baseStats.defense);
		set("special-attack", d.baseStats.specialAttack);
		set("special-defense", d.baseStats.specialDefense);
		set("speed", d.baseStats.speed);
		document.getElementById("loading").classList.add("hidden");
		document.getElementById("pokedex").classList.remove("hidden");
	}).catch(function (err) {
		document.getElementById("loading").classList.add("hidden");
		Pokemon.showError(err);
	});
})();
