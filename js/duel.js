// 2人対戦: プレイヤー1が選ぶ -> 決定 -> 画面を渡す -> プレイヤー2が選ぶ -> 決定 -> バトル画面
// 選んだポケモンは画面にもURLにも残さず、決定までは変数にだけ持つ。
(function () {
	var picks = [null, null];
	var current = 0;
	var selected = null;

	var stepCover = document.getElementById("step-cover");
	var stepPick = document.getElementById("step-pick");
	var decide = document.getElementById("decide");

	function pokemonLabel(id) {
		return "No." + String(id).padStart(3, "0") + " " + Pokemon.translate(window.POKEMON_NAMES[id - 1]);
	}

	function showPick(index) {
		current = index;
		selected = null;
		var who = "プレイヤー" + (index + 1);
		document.getElementById("pick-title").textContent = who + "のポケモンを選んでください";
		document.getElementById("pick-lead").textContent = index === 0
			? "選んだら「決定」を押して、画面をプレイヤー2に渡します。"
			: "選んだら「決定」を押すと、バトルが始まります。";
		document.getElementById("picked").textContent = "未選択";
		decide.textContent = index === 0 ? "決定して、プレイヤー2に渡す" : "決定して、バトル開始";
		decide.disabled = true;

		// 前の人の選択が残らないよう、毎回つくり直す
		var container = document.getElementById("picker");
		while (container.firstChild) { container.removeChild(container.firstChild); }
		Pokemon.createPicker(container, {
			mode: "select",
			onSelect: function (id) {
				selected = id;
				document.getElementById("picked").textContent = pokemonLabel(id);
				decide.disabled = false;
			}
		});

		stepCover.classList.add("hidden");
		stepPick.classList.remove("hidden");
		window.scrollTo(0, 0);
	}

	function showCover(index) {
		document.getElementById("cover-text").textContent = "プレイヤー" + (index + 1) + "にわたしてください";
		document.getElementById("cover-ok").textContent = "プレイヤー" + (index + 1) + "です。ポケモンを選ぶ";
		document.getElementById("cover-ok").onclick = function () { showPick(index); };
		stepPick.classList.add("hidden");
		stepCover.classList.remove("hidden");
		window.scrollTo(0, 0);
	}

	decide.addEventListener("click", function () {
		if (selected === null) { return; }
		picks[current] = selected;
		if (current === 0) {
			showCover(1);
			return;
		}
		// 保存できないブラウザでは、やむなくURLで渡す
		var saved = Pokemon.saveDuel(picks[0], picks[1]);
		location.href = "battle.html?mode=2p" + (saved ? "" : "&my=" + picks[0] + "&enemy=" + picks[1]);
	});

	showPick(0);
})();
