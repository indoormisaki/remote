let row;
let column;
let allCells;
let mine;
let gameOver = false;
let isFirstOpen = true;
let progress = 0;

// 初期化
window.onload = function() {
	row = parseInt(document.getElementById("levelRow").innerHTML);
	console.log(row);
	column = parseInt(document.getElementById("levelColumn").innerHTML);
	console.log(column);
	mine = parseInt(document.getElementById("levelMine").innerHTML);
	console.log(mine);
	allCells = row * column;

	document.addEventListener("click", firstOpen);

	// 右クリック時に旗を立てる処理
	let targetElements = document.getElementsByClassName("closed");
	Array.from(targetElements).forEach(function(targetElement) {
		targetElement.addEventListener("contextmenu", function(event) {
			// 右クリックのデフォルト処理を削除
			event.preventDefault();
			// ゲームが継続中かつ開いていないマスの場合のみ旗を立てる
			if (!gameOver && $(event.target).hasClass("closed")) {
				if ($(event.target).hasClass("flag")) {
					event.target.classList.remove("flag");
					if ($(event.target).hasClass("is-mine")) {
						event.target.textContent = "×";
					} else {
						event.target.textContent = "";
					}
				} else {
					event.target.classList.add("flag");
					event.target.textContent = "▲";
				}
			}
		});
	});
};

// 最初に開けたマスを0として地雷を生成する
function firstOpen(event) {
	if (event.target.matches("td")) {
		// 最初にクリックされたマスとその周囲8マスを地雷生成から除外
		let firstCellIndex = getClickedCellIndex(event.target)
		let excludeCells = getAroundCellIndex(firstCellIndex);
		excludeCells.push(firstCellIndex);

		// 地雷配置の生成
		let mineIndexes = [];
		while (mineIndexes.length < mine) {
			let n = Math.trunc(Math.random() * allCells);
			if ($.inArray(n, mineIndexes) == -1
					&& $.inArray(n, excludeCells) == -1) {
				$('#board td').eq(n).addClass("is-mine");
				mineIndexes.push(n);
			}
		}

		// 地雷であるマスのテキストを"×"に設定する
		$(".is-mine").text("×");

		// 初手のマスを開ける
		openCell(firstCellIndex);
		document.removeEventListener("click", firstOpen);
	}
}

// すべてのtd要素を配列に変換
// クリックされたマスのインデックスを取得
function getClickedCellIndex(cell) {
	var tableCells = Array.from(document.getElementsByTagName("td"));
	var cellIndex = tableCells.indexOf(cell);
	return cellIndex;
}

// 周囲8マスの位置を取得(戻り値はaround[])
function getAroundCellIndex(currentCellIndex) {
	// 右上のマス
	let upperRight = currentCellIndex - column + 1;
	// 上のマス
	let upper = currentCellIndex - column;
	// 左上のマス
	let upperLeft = currentCellIndex - column - 1;
	// 右のマス
	let right = currentCellIndex + 1;
	// 左のマス
	let left = currentCellIndex - 1;
	// 右下のマス
	let bottomRight = currentCellIndex + column + 1;
	// 下のマス
	let bottom = currentCellIndex + column;
	// 左下のマス
	let bottomLeft = currentCellIndex + column - 1;
	// 周囲のマスを配列として取得
	let around = [ upperRight, upper, upperLeft, right, left, bottomRight,
			bottom, bottomLeft ];
	if (currentCellIndex == 0) {
		around = [ right, bottom, bottomRight ];
	} else if (currentCellIndex == column - 1) {
		around = [ left, bottom, bottomLeft ];
	} else if (currentCellIndex == (column * row - column)) {
		around = [ upperRight, upper, right ];
	} else if (currentCellIndex == (column * row - 1)) {
		around = [ upper, upperLeft, left ];
	} else if (currentCellIndex < column) {
		around = [ right, left, bottomRight, bottom, bottomLeft ];
	} else if (currentCellIndex > (column * row - column)) {
		around = [ upperRight, upper, upperLeft, right, left ];
	} else if (currentCellIndex % column == 0) {
		around = [ upper, upperRight, right, bottomRight, bottom ];
	} else if (currentCellIndex % column == column - 1) {
		around = [ upper, upperLeft, left, bottomLeft, bottom ];
	}
	return around;
}

// クリックされたマスの周囲8マスの地雷の数を取得する
function getAroundMine(around) {
	// 周囲の地雷をカウントする変数
	let mineCounter = 0;
	// 周囲8マスの地雷の数を集計
	for (let i = 0; i < around.length; i++) {
		if ($('#board td').eq(around[i]).hasClass("is-mine")) {
			mineCounter++;
		}
	}
	return mineCounter;
}

// マスを開き、周囲の地雷の数を表示する
// 周囲の地雷が0個の場合、クラス"is-zero"を付与する
function openCell(cellIndex) {
	if (gameOver) {
		return;
	}
	if ($('#board td').eq(cellIndex).hasClass("flag")) {
		return;
	}
	// 周囲8マスの位置を配列で取得
	let around = getAroundCellIndex(cellIndex);
	$('#board td').eq(cellIndex).addClass("open");
	$('#board td').eq(cellIndex).removeClass("closed");
	$('#board td').eq(cellIndex).text(getAroundMine(around));
	progress += 1;
	if (progress == allCells - mine) {
		gameClear();
	}
	if (getAroundMine(around) == 0) {
		$('#board td').eq(cellIndex).addClass("is-zero");
	}
	if ($('#board td').eq(cellIndex).hasClass("is-zero")) {
		for (let i = 0; i < around.length; i++) {
			if (!$('#board td').eq(around[i]).hasClass("open")) {
				openCell(around[i], getAroundCellIndex(around[i]));
			}
		}
	}
}

// ゲームクリア時の処理
function gameClear() {
	$(".game-message").text("GAME CLEAR");
	gameOver = true;
}

// クリックするとマスを開く
// 1.地雷のあるマスの場合…「GAME OVER」を表示
// 2.地雷のないマスの場合…クリックしたマスにgetAroundMineメソッドの戻り値を表示
$(function() {
	$(".closed").click(function() {
		if ($(this).hasClass("is-mine")) {
			if (gameOver == false && !$(this).hasClass("flag")) {
				$(this).addClass("open");
				$(this).removeClass("closed");
				gameOver = true;
				$(".game-message").text("GAME OVER");
			}
		} else if (isFirstOpen) {
			isFirstOpen = false;
		} else {
			// クリックされたマスの位置を取得
			let clickedCellIndex = getClickedCellIndex(this);
			// クリックされたマスを開き、周囲の地雷の数を表示する
			openCell(clickedCellIndex);
		}
	});
});

// リセットボタン押下時、ゲームを初期状態に戻す
$(function() {
	$(".reset").click(function() {
		$(".open").addClass("closed");
		$(".open").removeClass("open");
		$(".flag").removeClass("flag");
		$(".game-message").text("");
		$(".is-zero").removeClass("is-zero");
		gameOver = false;
		progress = 0;
	});
});