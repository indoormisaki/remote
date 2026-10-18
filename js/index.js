// 図鑑番号1〜386の選択肢を作る
(function () {
	var selects = document.querySelectorAll(".pokemon-select");
	window.POKEMON_NAMES.forEach(function (en, i) {
		var label = (i + 1) + ". " + (window.TRANSLATIONS[en] || en);
		selects.forEach(function (select) {
			var option = document.createElement("option");
			option.value = i + 1;
			option.textContent = label;
			select.appendChild(option);
		});
	});
})();
