//変数定義
let row; // 行数
let column; // 列数
let allCells; // 総マス数
let mine; // 地雷の数
let gameOver = false; // ゲーム継続を判定
let isFirstOpen = true; // 最初に開けたマスかどうかを判定
let progress = 0; // ゲームの進行状況を判定
// タイマーの変数定義
let startTime = 0; // 開始時間
let elapsedTime = 0; // 経過時間
let timerInterval; // タイマーのインターバル

// 初期化
window.onload = function() {
	row = parseInt(document.getElementById("level-row").innerHTML);
	column = parseInt(document.getElementById("level-column").innerHTML);
	mine = parseInt(document.getElementById("level-mine").innerHTML);
	allCells = row * column;

	// 初手フラグ追加
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
				checkRemainingMine();
			}
		});
	});
};

// タイマー機能
// テキスト表示のフォーマット関数
function formatTime(time) {
	const seconds = Math.floor(time / 1000);
	return `${seconds}`;
}

// タイマーの更新関数
function updateTimer() {
	const currentTime = Date.now();
	elapsedTime += currentTime - startTime;
	startTime = currentTime;
	document.getElementById("timer").textContent = formatTime(elapsedTime);
}

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

		// 初手フラグ削除
		document.removeEventListener("click", firstOpen);

		// タイマーを開始する
		startTime = Date.now();
		timerInterval = setInterval(updateTimer, 1000);
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

function getAroundFlag(around) {
	// 周囲のフラッグをカウントする変数
	let flagCounter = 0;
	// 周囲8マスのフラッグの数を集計
	for (let i = 0; i < around.length; i++) {
		if ($('#board td').eq(around[i]).hasClass("flag")) {
			flagCounter++;
		}
	}
	return flagCounter;
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
	let cellElement = $('#board td').eq(cellIndex);
	if (gameOver || cellElement.hasClass("flag")) {
		return;
	}

	if (cellElement.hasClass("is-mine")) {
		cellElement.addClass("open");
		cellElement.removeClass("closed");
		gameOver = true;
		$(".game-message").text("GAME OVER");
		clearInterval(timerInterval);
	} else {
		// 周囲8マスの位置を配列で取得
		let around = getAroundCellIndex(cellIndex);
		cellElement.addClass("open");
		cellElement.removeClass("closed");
		cellElement.text(getAroundMine(around));

		// 数字別で色分け
		switch (cellElement.text()) {
		case "1":
			cellElement.addClass("is-one");
			break;
		case "2":
			cellElement.addClass("is-two");
			break;
		case "3":
			cellElement.addClass("is-three");
			break;
		case "4":
			cellElement.addClass("is-four");
			break;
		case "5":
			cellElement.addClass("is-five");
			break;
		case "6":
			cellElement.addClass("is-six");
			break;
		case "7":
			cellElement.addClass("is-seven");
			break;
		case "8":
			cellElement.addClass("is-eight");
			break;
		}

		// ゲームクリアかどうかを判定
		checkProgress();

		// 開けたマスが0の場合の処理
		if (getAroundMine(around) == 0) {
			cellElement.addClass("is-zero");
		}
		if (cellElement.hasClass("is-zero")) {
			for (let i = 0; i < around.length; i++) {
				if (!$('#board td').eq(around[i]).hasClass("open")) {
					openCell(around[i]);
				}
			}
		}
	}
}

// 残りの爆弾数を表示
function checkRemainingMine() {
	let flagCell = document.querySelectorAll(".flag").length;
	let remainingMine = mine - flagCell;
	$("#remaining-mine").text(remainingMine);
}

// ゲームクリア判定
function checkProgress() {
	let openCells = document.querySelectorAll(".open");
	progress = openCells.length;
	if (progress == allCells - mine) {
		gameOver = true;
		$(".game-message").text("GAME CLEAR");
		$(".score-form").removeClass("hidden");
		clearInterval(timerInterval);
		document.getElementById("score").textContent = formatTime(elapsedTime);
		document.getElementById("score-form").value = formatTime(elapsedTime);
		document.getElementById("level-form").value = document.getElementById("level-id").innerHTML;
	}
}

// 開いていないマスをクリックするとマスを開く
// 1.地雷のあるマスの場合…「GAME OVER」を表示
// 2.地雷のないマスの場合…クリックしたマスにgetAroundMineメソッドの戻り値を表示
$(function() {
	$(".closed").click(function() {
		if (isFirstOpen) {
			isFirstOpen = false;
		} else {
			// クリックされたマスの位置を取得
			let clickedCellIndex = getClickedCellIndex(this);
			// クリックされたマスを開き、周囲の地雷の数を表示する
			openCell(clickedCellIndex);
		}
	});
});

// 開いているマスをクリックしたときの処理
// マスの数字と周囲のフラグ数が一致した場合、周囲のフラグ以外のマスを開く
$(function() {
	$(document).on("click", ".open", function() {
		let around = getAroundCellIndex(getClickedCellIndex(this));
		if ($(this).text() == getAroundFlag(around)) {
			for (let i = 0; i < around.length; i++) {
				if (!$('#board td').eq(around[i]).hasClass("open")) {
					openCell(around[i]);
				}
			}
		}
	});
});

// リセットボタン押下時、ゲームを初期状態に戻す
$(function() {
	$(".reset-game").click(function() {
		// 全てのマスの持つクラスをclosedクラスのみにする
		$(".open").addClass("closed");
		$(".open").removeClass("open");
		$(".flag").removeClass("flag");
		$(".game-message").text("");
		$("#score").text("");
		$(".score-form").addClass("hidden");
		$(".is-zero").removeClass("is-zero");
		$(".is-one").removeClass("is-one");
		$(".is-two").removeClass("is-two");
		$(".is-three").removeClass("is-three");
		$(".is-four").removeClass("is-four");
		$(".is-five").removeClass("is-five");
		$(".is-six").removeClass("is-six");
		$(".is-seven").removeClass("is-seven");
		$(".is-eight").removeClass("is-eight");
		$(".is-mine").removeClass("is-mine");

		// 全てのマスを空白にする
		$("td").text("");

		// ゲームの進行状況を初期状態に戻す
		gameOver = false;
		isFirstOpen = true;
		progress = 0;

		// タイマーをリセットする
		clearInterval(timerInterval);
		elapsedTime = 0;
		document.getElementById("timer").textContent = formatTime(elapsedTime);
		document.addEventListener("click", firstOpen);
	});
});
