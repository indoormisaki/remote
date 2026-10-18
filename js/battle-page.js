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

	// 技の選択ボタン (2人対戦用。タイプ色つき)
	function choiceButton(move, onClick) {
		var b = document.createElement("button");
		b.type = "button";
		var cls = Pokemon.typeClass(move.type) || "normal";
		b.className = "move " + cls;
		b.textContent = move.name;
		b.dataset.meta = move.type + "・威力" + move.power;
		b.dataset.initial = move.type.charAt(0);
		b.addEventListener("click", onClick);
		return b;
	}

	// 2人対戦の進行: プレイヤー1が選ぶ -> 画面を渡す -> プレイヤー2が選ぶ -> 技を実行
	function startDuel(my, enemy) {
		var panel = document.getElementById("duel-panel");
		var title = document.getElementById("duel-title");
		var body = document.getElementById("duel-body");
		var players = [
			{ label: "プレイヤー1", pokemon: my },
			{ label: "プレイヤー2", pokemon: enemy }
		];
		var picks = [];

		window.myLabel = "プレイヤー1の　";
		window.enemyLabel = "プレイヤー2の";
		document.getElementById("battle").classList.add("duel-mode");
		document.getElementById("enemy-hp-value").classList.remove("hidden");
		[["my-name", "p1", "P1"], ["enemy-name", "p2", "P2"]].forEach(function (t) {
			var tag = document.createElement("span");
			tag.className = "player-tag " + t[1];
			tag.textContent = t[2];
			document.getElementById(t[0]).closest(".stats-window").appendChild(tag);
		});
		panel.classList.remove("hidden");

		function clear() {
			while (body.firstChild) { body.removeChild(body.firstChild); }
		}

		function text(tag, cls, value) {
			var el = document.createElement(tag);
			if (cls) { el.className = cls; }
			el.textContent = value;
			return el;
		}

		// 相手に技が見えないよう、選ぶ前に画面を渡してもらう
		function cover(index) {
			var player = players[index];
			title.textContent = "";
			clear();
			var box = text("div", "duel-cover", "");
			box.appendChild(text("p", "", player.label + "（" + player.pokemon.data.name + "）にわたしてください"));
			box.appendChild(text("p", "sub", "ほかの人は画面を見ないでください"));
			var ok = text("button", "btn primary", player.label + "です。技を選ぶ");
			ok.type = "button";
			ok.addEventListener("click", function () { choose(index); });
			box.appendChild(ok);
			body.appendChild(box);
		}

		function choose(index) {
			var player = players[index];
			title.textContent = player.label + "（" + player.pokemon.data.name + "）のわざをえらぶ";
			clear();
			var grid = text("div", "command", "");
			player.pokemon.moves.forEach(function (move, i) {
				grid.appendChild(choiceButton(move, function () {
					picks[index] = i + 1;
					if (index === 0) {
						cover(1);
					} else {
						execute();
					}
				}));
			});
			body.appendChild(grid);
		}

		function execute() {
			title.textContent = "";
			clear();
			body.appendChild(text("div", "duel-wait", "たたかい中..."));
			isAvailable = false;
			turn(picks[0], picks[1]);
			var timer = setInterval(function () {
				if (!isFighting) {
					clearInterval(timer);
					setTimeout(finish, 3500);
				} else if (isAvailable) {
					clearInterval(timer);
					cover(0);
				}
			}, 200);
		}

		function finish() {
			var winner = myCurrentHp > 0 ? players[0] : players[1];
			title.textContent = "";
			clear();
			var box = text("div", "duel-result", "");
			box.appendChild(text("p", "win", winner.label + "（" + winner.pokemon.data.name + "）のかち！"));
			var row = text("div", "row after", "");
			var again = text("button", "btn primary", "もう一度戦う");
			again.type = "button";
			again.addEventListener("click", function () { location.reload(); });
			var pick = text("a", "btn", "ポケモンを選びなおす");
			pick.href = "duel.html";
			row.appendChild(again);
			row.appendChild(pick);
			box.appendChild(row);
			body.appendChild(box);
		}

		cover(0);
	}

	function startBattle(myId, enemyId, duel) {
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
			if (duel) {
				// battle.js の読み込み後に2人対戦の進行を始める。専用の操作ボタンがあるので下の共通ボタンは隠す
				script.onload = function () { startDuel(my, enemy); };
				document.querySelector(".after").classList.add("hidden");
			}
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

	var duel = Pokemon.getParam("mode") === "2p";
	var myParam = Pokemon.getParam("my");
	var enemyParam = Pokemon.getParam("enemy");
	var myId = Pokemon.parseId(myParam);
	var enemyId = Pokemon.parseId(enemyParam);

	if (duel) {
		// 2人対戦: 選んだポケモンは2人対戦の選択画面から受け取る
		document.querySelector('.site-nav a[aria-current]').removeAttribute("aria-current");
		document.querySelector('.site-nav a[href="duel.html"]').setAttribute("aria-current", "page");
		var picks = Pokemon.loadDuel() || (myId !== null && enemyId !== null ? { my: myId, enemy: enemyId } : null);
		if (picks) {
			startBattle(picks.my, picks.enemy, true);
		} else {
			location.replace("duel.html");
		}
	} else if (myParam === null && enemyParam === null) {
		showSelect(null);
	} else if (myId !== null && enemyParam === null) {
		showSelect(myId);
	} else if (myId === null || enemyId === null) {
		Pokemon.showError(new Error("図鑑番号は1〜" + Pokemon.MAX_ID + "で指定してください"));
	} else {
		startBattle(myId, enemyId, false);
	}
})();
