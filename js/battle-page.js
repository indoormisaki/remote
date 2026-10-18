// バトル画面のDOMを組み立て、完成後に battle.js (DOMの値を読んで進行する) を読み込む
(function () {
	var MOVE_FIELDS = [
		["type", "type"], ["power", "power"], ["pp", "pp"], ["accuracy", "accuracy"],
		["damage-class", "damageClass"], ["min-hits", "minHits"], ["max-hits", "maxHits"],
		["drain", "drain"], ["ailment", "ailment"], ["ailment-chance", "ailmentChance"]
	];

	function set(id, value) {
		document.getElementById(id).textContent = value;
	}

	function fillSide(prefix, data, stats) {
		set(prefix + "-name", data.name);
		set(prefix + "-pokemon-level", Pokemon.LEVEL);
		set(prefix + "-current-hp", stats.hp);
		set(prefix + "-max-hp", stats.hp);
		set(prefix + "-attack", stats.attack);
		set(prefix + "-defense", stats.defense);
		set(prefix + "-special-attack", stats.specialAttack);
		set(prefix + "-special-defense", stats.specialDefense);
		set(prefix + "-speed", stats.speed);
		var types = document.getElementById(prefix + "-types");
		data.types.forEach(function (type, i) {
			var div = document.createElement("div");
			div.id = prefix + "-pokemon-type-" + (i + 1);
			div.textContent = type;
			types.appendChild(div);
		});
	}

	function fillMoves(prefix, moves, hideEach) {
		var box = document.getElementById(prefix + "-commands");
		moves.forEach(function (move, i) {
			var n = i + 1;
			var wrap = document.createElement("div");
			if (hideEach) {
				wrap.className = "hidden";
			}
			var button = document.createElement("button");
			button.className = "move";
			button.id = prefix + "-move-" + n;
			button.textContent = move.name;
			wrap.appendChild(button);
			MOVE_FIELDS.forEach(function (f) {
				var div = document.createElement("div");
				div.id = prefix + "-" + f[0] + "-" + n;
				div.className = "move-" + f[0] + " hidden";
				div.textContent = move[f[1]];
				wrap.appendChild(div);
			});
			box.appendChild(wrap);
		});
	}

	function loadSide(id) {
		return Pokemon.getPokemon(id).then(function (p) {
			return Pokemon.pickMoves(p).then(function (moves) {
				var data = Pokemon.toPokemonData(p);
				return { data: data, stats: Pokemon.calcStats(data.baseStats, Pokemon.LEVEL), moves: moves };
			});
		});
	}

	var myId = Pokemon.parseId(Pokemon.getParam("my"));
	var enemyId = Pokemon.parseId(Pokemon.getParam("enemy"));
	if (myId === null || enemyId === null) {
		document.getElementById("loading").classList.add("hidden");
		Pokemon.showError(new Error("図鑑番号は1〜" + Pokemon.MAX_ID + "で指定してください"));
		return;
	}

	Promise.all([loadSide(myId), loadSide(enemyId)]).then(function (sides) {
		var my = sides[0];
		var enemy = sides[1];
		document.getElementById("myImg").src = my.data.backSprite || "";
		document.getElementById("enemyImg").src = enemy.data.frontSprite || "";
		fillSide("my", my.data, my.stats);
		fillSide("enemy", enemy.data, enemy.stats);
		fillMoves("my", my.moves, false);
		fillMoves("enemy", enemy.moves, true);

		document.getElementById("loading").classList.add("hidden");
		document.getElementById("battle").classList.remove("hidden");

		var script = document.createElement("script");
		script.src = "js/battle.js";
		document.body.appendChild(script);
	}).catch(function (err) {
		document.getElementById("loading").classList.add("hidden");
		Pokemon.showError(err);
	});
})();
