// ポケモン一覧 (検索つき)。図鑑ではリンク、バトル選択ではボタンとして使う
(function () {
	var SPRITE = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";

	// ひらがなをカタカナにそろえて検索しやすくする
	function normalize(text) {
		return text.trim().toLowerCase().replace(/[ぁ-ゖ]/g, function (c) {
			return String.fromCharCode(c.charCodeAt(0) + 0x60);
		});
	}

	// options: { mode: "link" | "select", href(id), onSelect(id) }
	function createPicker(container, options) {
		var entries = window.POKEMON_NAMES.map(function (en, i) {
			var name = window.TRANSLATIONS[en] || en;
			return { id: i + 1, name: name, key: normalize(name) + " " + en + " " + (i + 1) };
		});

		var search = document.createElement("input");
		search.type = "search";
		search.className = "search";
		search.placeholder = "名前や番号で検索（例: ピカ、25）";
		search.setAttribute("aria-label", "ポケモンを検索");

		var meta = document.createElement("div");
		meta.className = "picker-meta";

		var grid = document.createElement("div");
		grid.className = "mon-grid";

		container.appendChild(search);
		container.appendChild(meta);
		container.appendChild(grid);

		var selected = null;
		var nodes = entries.map(function (e) {
			var node = document.createElement(options.mode === "link" ? "a" : "button");
			node.className = "mon";
			if (options.mode === "link") {
				node.href = options.href(e.id);
			} else {
				node.type = "button";
				node.setAttribute("aria-pressed", "false");
				node.addEventListener("click", function () {
					select(e.id);
					if (options.onSelect) {
						options.onSelect(e.id);
					}
				});
			}
			var img = document.createElement("img");
			img.loading = "lazy";
			img.alt = "";
			img.src = SPRITE + e.id + ".png";
			img.addEventListener("error", function () { img.style.visibility = "hidden"; });
			var no = document.createElement("span");
			no.className = "no";
			no.textContent = "No." + String(e.id).padStart(3, "0");
			var nm = document.createElement("span");
			nm.className = "nm";
			nm.textContent = e.name;
			node.appendChild(img);
			node.appendChild(no);
			node.appendChild(nm);
			grid.appendChild(node);
			return node;
		});

		function select(id) {
			selected = id;
			nodes.forEach(function (n, i) {
				n.setAttribute("aria-pressed", entries[i].id === id ? "true" : "false");
			});
		}

		function filter() {
			var q = normalize(search.value);
			var count = 0;
			entries.forEach(function (e, i) {
				var show = q === "" || e.key.indexOf(q) !== -1;
				nodes[i].classList.toggle("hidden", !show);
				if (show) { count++; }
			});
			meta.textContent = count === 0 ? "" : count + "匹";
			var empty = container.querySelector(".empty");
			if (count === 0 && !empty) {
				empty = document.createElement("div");
				empty.className = "empty";
				empty.textContent = "見つかりませんでした。別の名前で試してください。";
				container.appendChild(empty);
			} else if (count > 0 && empty) {
				empty.remove();
			}
		}

		search.addEventListener("input", filter);
		filter();

		return {
			select: select,
			get selected() { return selected; }
		};
	}

	window.Pokemon = window.Pokemon || {};
	window.Pokemon.createPicker = createPicker;
	window.Pokemon.spriteUrl = function (id) { return SPRITE + id + ".png"; };
})();
