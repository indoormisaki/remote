// 図鑑ページ: id なしなら一覧、id ありなら詳細を表示する
(function () {
	var STATS = [
		["HP", "hp"], ["こうげき", "attack"], ["ぼうぎょ", "defense"],
		["とくこう", "specialAttack"], ["とくぼう", "specialDefense"], ["すばやさ", "speed"]
	];

	function show(id) {
		document.getElementById("loading").classList.add("hidden");
		document.getElementById(id).classList.remove("hidden");
	}

	function fail(err) {
		document.getElementById("loading").classList.add("hidden");
		Pokemon.showError(err);
	}

	function set(id, value) {
		document.getElementById(id).textContent = value;
	}

	function renderStats(base) {
		var list = document.getElementById("stats");
		var total = 0;
		STATS.forEach(function (s) {
			var value = base[s[1]];
			total += value;
			var li = document.createElement("li");
			li.className = "stat-row";
			var k = document.createElement("span");
			k.className = "k";
			k.textContent = s[0];
			var n = document.createElement("span");
			n.className = "n";
			n.textContent = value;
			var bar = document.createElement("div");
			bar.className = "bar";
			var fill = document.createElement("span");
			fill.style.width = Math.min(100, value / 255 * 100) + "%";
			bar.appendChild(fill);
			li.appendChild(k);
			li.appendChild(n);
			li.appendChild(bar);
			list.appendChild(li);
		});
		set("total", total);
	}

	function renderDetail(id) {
		Pokemon.getPokemon(id).then(function (p) {
			var d = Pokemon.toPokemonData(p);
			document.title = d.name + " | ポケモン図鑑";
			document.getElementById("front-sprite").src = d.frontSprite || "";
			document.getElementById("back-sprite").src = d.backSprite || "";
			set("no", String(d.id).padStart(3, "0"));
			set("name", d.name);
			d.types.forEach(function (t) {
				document.getElementById("types").appendChild(Pokemon.typeBadge(t));
			});
			d.abilities.forEach(function (a) {
				var chip = document.createElement("span");
				chip.className = "chip";
				chip.textContent = a;
				document.getElementById("abilities").appendChild(chip);
			});
			set("height", d.height);
			set("weight", d.weight);
			renderStats(d.baseStats);

			var prev = document.getElementById("prev");
			var next = document.getElementById("next");
			if (id > 1) { prev.href = "pokedex.html?id=" + (id - 1); } else { prev.classList.add("hidden"); }
			if (id < Pokemon.MAX_ID) { next.href = "pokedex.html?id=" + (id + 1); } else { next.classList.add("hidden"); }
			document.getElementById("battle-link").href = "battle.html?my=" + id;
			show("detail-view");
		}).catch(fail);
	}

	var param = Pokemon.getParam("id");
	if (param === null) {
		Pokemon.createPicker(document.getElementById("list"), {
			mode: "link",
			href: function (id) { return "pokedex.html?id=" + id; }
		});
		show("list-view");
		return;
	}
	var id = Pokemon.parseId(param);
	if (id === null) {
		fail(new Error("図鑑番号は1〜" + Pokemon.MAX_ID + "で指定してください"));
		return;
	}
	renderDetail(id);
})();
