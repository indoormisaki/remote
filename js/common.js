// PokeAPI から取得したデータを画面用に整形する (旧 Java のサービス層に相当)
(function () {
	var API = "https://pokeapi.co/api/v2/";
	var LEVEL = 50;
	var MAX_ID = 386;
	var memory = {};

	function translate(en) {
		return window.TRANSLATIONS[en] || en;
	}

	function load(key) {
		try {
			var v = localStorage.getItem(key);
			return v ? JSON.parse(v) : null;
		} catch (e) {
			return null;
		}
	}

	function save(key, value) {
		try {
			localStorage.setItem(key, JSON.stringify(value));
		} catch (e) {
			// 容量超過・無効化時はキャッシュなしで続行
		}
	}

	// メモリ -> localStorage -> ネットワークの順で取得する
	function cached(key, fetcher) {
		if (memory[key]) {
			return memory[key];
		}
		var stored = load("pokemon:" + key);
		if (stored) {
			memory[key] = Promise.resolve(stored);
			return memory[key];
		}
		memory[key] = fetcher().then(function (value) {
			save("pokemon:" + key, value);
			return value;
		}, function (err) {
			delete memory[key];
			throw err;
		});
		return memory[key];
	}

	function getJson(path) {
		return fetch(API + path).then(function (res) {
			if (!res.ok) {
				throw new Error("PokeAPI の取得に失敗しました (" + res.status + "): " + path);
			}
			return res.json();
		});
	}

	function getPokemon(id) {
		return cached("p/" + id, function () {
			return getJson("pokemon/" + id).then(function (p) {
				return {
					id: p.id,
					name: p.name,
					types: p.types.map(function (t) { return t.type.name; }),
					abilities: p.abilities.map(function (a) { return a.ability.name; }),
					height: p.height,
					weight: p.weight,
					stats: p.stats.map(function (s) { return s.base_stat; }),
					front: p.sprites.front_default,
					back: p.sprites.back_default,
					moves: p.moves.map(function (m) { return m.move.name; })
				};
			});
		});
	}

	function getMove(name) {
		return cached("m/" + name, function () {
			return getJson("move/" + name).then(function (m) {
				var meta = m.meta || {};
				var jaName = m.names.filter(function (n) { return n.language.name === "ja-Hrkt"; })[0]
					|| m.names.filter(function (n) { return n.language.name === "ja"; })[0]
					|| m.names[0];
				return {
					name: jaName ? jaName.name : name,
					pp: m.pp || 0,
					accuracy: m.accuracy || 100,
					priority: m.priority || 0,
					power: m.power || 0,
					damageClass: m.damage_class.name,
					type: translate(m.type.name),
					minHits: meta.min_hits || 1,
					maxHits: meta.max_hits || 1,
					drain: meta.drain || 0,
					ailment: translate(meta.ailment ? meta.ailment.name : "none"),
					ailmentChance: meta.ailment_chance || 0
				};
			});
		});
	}

	// 画面表示用のポケモン情報 (旧 GetPokemonDataService)
	function toPokemonData(p) {
		var s = p.stats;
		return {
			id: p.id,
			name: translate(p.name),
			types: p.types.map(translate),
			abilities: p.abilities,
			height: p.height / 10,
			weight: p.weight / 10,
			baseStats: { hp: s[0], attack: s[1], defense: s[2], specialAttack: s[3], specialDefense: s[4], speed: s[5] },
			frontSprite: p.front,
			backSprite: p.back
		};
	}

	// 個体値31・努力値0・補正なしの実数値 (旧 CalculatePokemonStatsService)
	function calcStats(base, level) {
		function other(b) { return Math.floor((b * 2 + 31) * level / 100) + 5; }
		return {
			hp: Math.floor((base.hp * 2 + 31) * level / 100) + level + 10,
			attack: other(base.attack),
			defense: other(base.defense),
			specialAttack: other(base.specialAttack),
			specialDefense: other(base.specialDefense),
			speed: other(base.speed)
		};
	}

	function shuffle(array) {
		var a = array.slice();
		for (var i = a.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var t = a[i]; a[i] = a[j]; a[j] = t;
		}
		return a;
	}

	// 威力のある技からランダムに4つ選ぶ (旧 GetPokemonMovesService)
	function pickMoves(p) {
		var candidates = shuffle(p.moves);
		var picked = [];
		var names = {};

		function next() {
			if (picked.length >= 4 || candidates.length === 0) {
				return Promise.resolve();
			}
			var batch = candidates.splice(0, 4 - picked.length);
			return Promise.all(batch.map(getMove)).then(function (moves) {
				moves.forEach(function (m) {
					if (picked.length < 4 && m.damageClass !== "status" && m.power !== 0 && !names[m.name]) {
						names[m.name] = true;
						picked.push(m);
					}
				});
				return next();
			});
		}

		return next().then(function () {
			if (picked.length >= 4) {
				return picked;
			}
			// 攻撃技が4つ未満のポケモン(メタモンなど)は「たいあたり」で埋める
			return getMove("tackle").then(function (tackle) {
				while (picked.length < 4) {
					picked.push(tackle);
				}
				return picked;
			});
		});
	}

	var TYPE_CLASS = {
		"ノーマル": "normal", "ほのお": "fire", "みず": "water", "でんき": "electric", "くさ": "grass",
		"こおり": "ice", "かくとう": "fighting", "どく": "poison", "じめん": "ground", "ひこう": "flying",
		"エスパー": "psychic", "むし": "bug", "いわ": "rock", "ゴースト": "ghost", "ドラゴン": "dragon",
		"あく": "dark", "はがね": "steel", "フェアリー": "fairy"
	};

	function typeBadge(typeName) {
		var span = document.createElement("span");
		span.className = "type-badge t-" + (TYPE_CLASS[typeName] || "normal");
		span.textContent = typeName;
		return span;
	}

	function getParam(name) {
		return new URLSearchParams(location.search).get(name);
	}

	function parseId(value) {
		var id = parseInt(value, 10);
		return id >= 1 && id <= MAX_ID ? id : null;
	}

	function showError(err) {
		var box = document.getElementById("message");
		if (box) {
			box.textContent = err && err.message ? err.message : String(err);
			box.classList.remove("hidden");
		}
		if (window.console) {
			console.error(err);
		}
	}

	window.Pokemon = {
		LEVEL: LEVEL,
		MAX_ID: MAX_ID,
		translate: translate,
		getPokemon: getPokemon,
		toPokemonData: toPokemonData,
		calcStats: calcStats,
		pickMoves: pickMoves,
		typeBadge: typeBadge,
		getParam: getParam,
		parseId: parseId,
		showError: showError
	};
})();
