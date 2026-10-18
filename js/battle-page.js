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
			button.dataset.meta = move.type + "・威力" + move.power;
			button.dataset.initial = move.type.charAt(0);
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

	function startBattle(myId, enemyId) {
		document.getElementById("loading").classList.remove("hidden");
		Promise.all([loadSide(myId), loadSide(enemyId)]).then(function (sides) {
			var my = sides[0];
			var enemy = sides[1];
			document.title = my.data.name + " vs " + enemy.data.name + " | ポケモンバトル";
			var field = document.getElementById("game-screen");
			var enemyType = Pokemon.typeClass(enemy.data.types[0]);
			if (enemyType) {
				field.style.setProperty("--field-tint", "var(--t-" + enemyType + ")");
			}
			document.getElementById("myImg").src = my.data.backSprite || "";
			document.getElementById("enemyImg").src = enemy.data.frontSprite || "";
			fillSide("my", my.data, my.stats);
			fillSide("enemy", enemy.data, enemy.stats);
			fillMoves("my", my.moves, false);
			fillMoves("enemy", enemy.moves, true);

			document.getElementById("loading").classList.add("hidden");
			document.getElementById("battle").classList.remove("hidden");
			document.getElementById("rematch").addEventListener("click", function () {
				location.reload();
			});

			var script = document.createElement("script");
			script.src = "js/battle.js";
			document.body.appendChild(script);
		}).catch(function (err) {
			document.getElementById("loading").classList.add("hidden");
			Pokemon.showError(err);
		});
	}

	// ポケモン選択画面
	function showSelect(presetMy) {
		var chosen = { my: presetMy, enemy: null };
		var start = document.getElementById("start");

		function label(id) {
			return id ? "No." + String(id).padStart(3, "0") + " " + Pokemon.translate(window.POKEMON_NAMES[id - 1]) : "未選択";
		}

		function update() {
			document.getElementById("my-picked").textContent = label(chosen.my);
			document.getElementById("enemy-picked").textContent = label(chosen.enemy);
			start.disabled = !(chosen.my && chosen.enemy);
		}

		var myPicker = Pokemon.createPicker(document.getElementById("my-picker"), {
			mode: "select",
			onSelect: function (id) { chosen.my = id; update(); }
		});
		var enemyPicker = Pokemon.createPicker(document.getElementById("enemy-picker"), {
			mode: "select",
			onSelect: function (id) { chosen.enemy = id; update(); }
		});
		if (presetMy) {
			myPicker.select(presetMy);
		}

		document.getElementById("random-enemy").addEventListener("click", function () {
			chosen.enemy = 1 + Math.floor(Math.random() * Pokemon.MAX_ID);
			enemyPicker.select(chosen.enemy);
			update();
		});
		start.addEventListener("click", function () {
			location.href = "battle.html?my=" + chosen.my + "&enemy=" + chosen.enemy;
		});

		update();
		document.getElementById("select-view").classList.remove("hidden");
	}

	var myParam = Pokemon.getParam("my");
	var enemyParam = Pokemon.getParam("enemy");
	var myId = Pokemon.parseId(myParam);
	var enemyId = Pokemon.parseId(enemyParam);

	if (myParam === null && enemyParam === null) {
		showSelect(null);
	} else if (myId !== null && enemyParam === null) {
		showSelect(myId);
	} else if (myId === null || enemyId === null) {
		Pokemon.showError(new Error("図鑑番号は1〜" + Pokemon.MAX_ID + "で指定してください"));
	} else {
		startBattle(myId, enemyId);
	}
})();
