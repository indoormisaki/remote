//	コマンド受付
let isAvailable = true;
let isFighting = true;

// HPバー
const myHpBar = document.getElementById("my-hp-bar");
const enemyHpBar = document.getElementById("enemy-hp-bar");
// 現在の残りHP
let myCurrentHp = parseInt(document.getElementById("my-current-hp").textContent);
let enemyCurrentHp = parseInt(document.getElementById("enemy-current-hp").textContent);
// 最大HP
let myMaxHp = parseInt(document.getElementById("my-max-hp").textContent);
let enemyMaxHp = parseInt(document.getElementById("enemy-max-hp").textContent);
// HP初期幅
enemyHpBar.style.width = "100%";
myHpBar.style.width = "100%";
// 自分のステータス
let myName = document.getElementById("my-name").textContent;
let myLevel = parseInt(document.getElementById("my-pokemon-level").textContent);	// レベル
let myAttack = parseInt(document.getElementById("my-attack").textContent);	// こうげき
let myDefense = parseInt(document.getElementById("my-defense").textContent);	// ぼうぎょ
let mySpecialAttack = parseInt(document.getElementById("my-special-attack").textContent);	// とくこう
let mySpecialDefense = parseInt(document.getElementById("my-special-defense").textContent);	// とくぼう
let mySpeed = parseInt(document.getElementById("my-speed").textContent);	// すばやさ
let myAlimentStats = document.getElementById("my-ailment-stats").textContent;
// 敵のステータス
let enemyName = document.getElementById("enemy-name").textContent;
let enemyLevel = parseInt(document.getElementById("enemy-pokemon-level").textContent);	// レベル
let enemyAttack = parseInt(document.getElementById("enemy-attack").textContent);	// こうげき
let enemyDefense = parseInt(document.getElementById("enemy-defense").textContent);	// ぼうぎょ
let enemySpecialAttack = parseInt(document.getElementById("enemy-special-attack").textContent);	// とくこう
let enemySpecialDefense = parseInt(document.getElementById("enemy-special-defense").textContent);	// とくぼう
let enemySpeed = parseInt(document.getElementById("enemy-speed").textContent);	// すばやさ
let enemyAlimentStats = document.getElementById("enemy-ailment-stats").textContent;
// 自分のタイプ
let myTypes = document.getElementById("my-types");
let myType = myTypes.children;
let myTypesArray = [];
for (let i = 0; i < myType.length; i++) {
	myTypesArray.push(myType[i].textContent);
}
// 敵のタイプ
let enemyTypes = document.getElementById("enemy-types");
let enemyType = enemyTypes.children;
let enemyTypesArray = [];
for (let i = 0; i < enemyType.length; i++) {
	enemyTypesArray.push(enemyType[i].textContent);
}
// 技のタイプ判定
for (let i = 1; i <= 4; i++) {
	let moveType = document.getElementById("my-type-" + i);
	if (moveType.textContent == "ノーマル") {
		document.getElementById("my-move-" + i).classList.add("normal");
	} else if (moveType.textContent == "ほのお") {
		document.getElementById("my-move-" + i).classList.add("fire");
	} else if (moveType.textContent == "みず") {
		document.getElementById("my-move-" + i).classList.add("water");
	} else if (moveType.textContent == "でんき") {
		document.getElementById("my-move-" + i).classList.add("electric");
	} else if (moveType.textContent == "くさ") {
		document.getElementById("my-move-" + i).classList.add("grass");
	} else if (moveType.textContent == "こおり") {
		document.getElementById("my-move-" + i).classList.add("ice");
	} else if (moveType.textContent == "かくとう") {
		document.getElementById("my-move-" + i).classList.add("fighting");
	} else if (moveType.textContent == "どく") {
		document.getElementById("my-move-" + i).classList.add("poison");
	} else if (moveType.textContent == "じめん") {
		document.getElementById("my-move-" + i).classList.add("ground");
	} else if (moveType.textContent == "ひこう") {
		document.getElementById("my-move-" + i).classList.add("flying");
	} else if (moveType.textContent == "エスパー") {
		document.getElementById("my-move-" + i).classList.add("psychic");
	} else if (moveType.textContent == "むし") {
		document.getElementById("my-move-" + i).classList.add("bug");
	} else if (moveType.textContent == "いわ") {
		document.getElementById("my-move-" + i).classList.add("rock");
	} else if (moveType.textContent == "ゴースト") {
		document.getElementById("my-move-" + i).classList.add("ghost");
	} else if (moveType.textContent == "ドラゴン") {
		document.getElementById("my-move-" + i).classList.add("dragon");
	} else if (moveType.textContent == "あく") {
		document.getElementById("my-move-" + i).classList.add("dark");
	} else if (moveType.textContent == "はがね") {
		document.getElementById("my-move-" + i).classList.add("steel");
	} else if (moveType.textContent == "フェアリー") {
		document.getElementById("my-move-" + i).classList.add("fairy");
	}
}

// リセットボタン
$("#reset").click(function() {
	enemyHpBar.style.width = "100%";
	myHpBar.style.width = "100%";
});

// 技選択
$("#my-move-1").click(function() {
	if (isAvailable && isFighting) {
		isAvailable = false;
		turn(1);
		endProcess();
	}
});

$("#my-move-2").click(function() {
	if (isAvailable && isFighting) {
		isAvailable = false;
		turn(2);
		endProcess();
	}
});

$("#my-move-3").click(function() {
	if (isAvailable && isFighting) {
		isAvailable = false;
		turn(3);
		endProcess();
	}
});

$("#my-move-4").click(function() {
	if (isAvailable && isFighting) {
		isAvailable = false;
		turn(4);
		endProcess();
	}
});

// *** ターン処理 ***
function turn(myMoveNum) {

	// 自分の技情報
	let myMovePower = parseInt(document.getElementById("my-power-" + myMoveNum).textContent);	// 技の威力を取得
	let myMoveType = document.getElementById("my-type-" + myMoveNum).textContent;	// 技のタイプを取得
	let myDamageClass = document.getElementById("my-damage-class-" + myMoveNum).textContent;	// 技の分類を取得
	let myAccuracy = parseInt(document.getElementById("my-accuracy-" + myMoveNum).textContent);	// 技の命中率を取得
	let myMinHits = parseInt(document.getElementById("my-min-hits-" + myMoveNum).textContent);	// 技の最低ヒット数を取得
	let myMaxHits = parseInt(document.getElementById("my-max-hits-" + myMoveNum).textContent);	// 技の最高ヒット数を取得
	let myDrain = parseInt(document.getElementById("my-drain-" + myMoveNum).textContent);	//	ダメージ吸収率を取得
	let myAilment = document.getElementById("my-ailment-" + myMoveNum).textContent;	//	与え得る状態異常の名前
	let myAilmentChance = parseInt(document.getElementById("my-ailment-chance-" + myMoveNum).textContent);	//	状態異常付与確率
	// 一撃必殺技かどうかを判定
	if (document.getElementById("my-move-" + myMoveNum).textContent == "じわれ"
		|| document.getElementById("my-move-" + myMoveNum).textContent == "つのドリル"
			|| document.getElementById("my-move-" + myMoveNum).textContent == "ぜったいれいど"
				|| document.getElementById("my-move-" + myMoveNum).textContent == "ハサミギロチン") {
		myDamageClass = "oneHitKnockout";
	}

	// 敵の技情報
	let enemyMoveNum = Math.floor(Math.random() * 4) + 1;
	let enemyMovePower = parseInt(document.getElementById("enemy-power-" + enemyMoveNum).textContent);	// 技の威力を取得
	let enemyMoveType = document.getElementById("enemy-type-" + enemyMoveNum).textContent;	// 技のタイプを取得
	let enemyDamageClass = document.getElementById("enemy-damage-class-" + enemyMoveNum).textContent;	// 技の分類を取得
	let enemyAccuracy = parseInt(document.getElementById("enemy-accuracy-" + myMoveNum).textContent);	// 技の命中率を取得
	let enemyMinHits = parseInt(document.getElementById("enemy-min-hits-" + enemyMoveNum).textContent);	// 技の最低ヒット数を取得
	let enemyMaxHits = parseInt(document.getElementById("enemy-max-hits-" + enemyMoveNum).textContent);	// 技の最高ヒット数を取得
	let enemyDrain = parseInt(document.getElementById("enemy-drain-" + enemyMoveNum).textContent);	//	ダメージ吸収率を取得
	let enemyAilment = document.getElementById("enemy-ailment-" + enemyMoveNum).textContent;	//	与え得る状態異常の名前
	let enemyAilmentChance = parseInt(document.getElementById("enemy-ailment-chance-" + enemyMoveNum).textContent);	//	状態異常付与確率
	// 一撃必殺技かどうかを判定
	if (document.getElementById("my-move-" + myMoveNum).textContent == "じわれ"
		|| document.getElementById("my-move-" + myMoveNum).textContent == "つのドリル"
			|| document.getElementById("my-move-" + myMoveNum).textContent == "ぜったいれいど"
				|| document.getElementById("my-move-" + myMoveNum).textContent == "ハサミギロチン") {
		eneyDamageClass = "oneHitKnockout";
	}

	//	すばやさ判定
	if (mySpeed > enemySpeed) {
		resetMessage();
		action(myName, myMoveNum, myAccuracy, myMovePower, myMoveType, myDamageClass, myDrain, myAilment, myAilmentChance, myMinHits, myMaxHits, "my", true);
		setTimeout(function(){
			if (isFighting) {
				resetMessage();
				action(enemyName, enemyMoveNum, enemyAccuracy, enemyMovePower, enemyMoveType, enemyDamageClass, enemyDrain, enemyAilment, enemyAilmentChance, enemyMinHits, enemyMaxHits, "enemy", false);
			}
		}, 3000);
	} else if (mySpeed < enemySpeed) {
		resetMessage();
		action(enemyName, enemyMoveNum, enemyAccuracy, enemyMovePower, enemyMoveType, enemyDamageClass, enemyDrain, enemyAilment, enemyAilmentChance, enemyMinHits, enemyMaxHits, "enemy", true);
		setTimeout(function(){
			if (isFighting) {
				resetMessage();
				action(myName, myMoveNum, myAccuracy, myMovePower, myMoveType, myDamageClass, myDrain, myAilment, myAilmentChance, myMinHits, myMaxHits, "my", false);
			}
		}, 3000);
	} else {
		let actionOrder = Math.random();
		if (actionOrder < 0.5) {
			resetMessage();
			action(myName, myMoveNum, myAccuracy, myMovePower, myMoveType, myDamageClass, myDrain, myAilment, myAilmentChance, myMinHits, myMaxHits, "my", true);
			setTimeout(function(){
				if (isFighting) {
					resetMessage();
					action(enemyName, enemyMoveNum, enemyAccuracy, enemyMovePower, enemyMoveType, enemyDamageClass, enemyDrain, enemyAilment, enemyAilmentChance, enemyMinHits, enemyMaxHits, "enemy", false);
				}
			}, 3000);
		} else {
			resetMessage();
			action(enemyName, enemyMoveNum, enemyAccuracy, enemyMovePower, enemyMoveType, enemyDamageClass, enemyDrain, enemyAilment, enemyAilmentChance, enemyMinHits, enemyMaxHits, "enemy", true);
			setTimeout(function(){
				if (isFighting) {
					resetMessage();
					action(myName, myMoveNum, myAccuracy, myMovePower, myMoveType, myDamageClass, myDrain, myAilment, myAilmentChance, myMinHits, myMaxHits, "my", false);
				}
			}, 3000);
		}
	}
}

// ポケモンの行動(メッセージ更新、命中判定)
function action(name, moveNum, accuracy, movePower, moveType, damageClass, drain, ailment, ailmentChance, minHits, maxHits, attackSide, isFirstAction) {
	document.getElementById("pokemon-name-message").textContent = name + "の";
	document.getElementById("move-message").textContent = document.getElementById(attackSide + "-move-" + moveNum).textContent;
	// 命中率乱数
	let accuracyRandomNumber = Math.floor(Math.random() * 100) + 1;
	let ailmentRandomNumber = Math.floor(Math.random() * 100) + 1;
	setTimeout(function(){
		if (accuracyRandomNumber <= accuracy) {
			for (let i = 0; i < getHits(minHits, maxHits); i++) {
				let damage = calcDamage(movePower, moveType, damageClass, drain, attackSide);
				// HP変更処理を実行
				if (attackSide == "my") {
					alterHp(damage, enemyCurrentHp, enemyMaxHp, enemyHpBar, attackSide);
					// HP吸収攻撃の場合のHP変更処理
					if (drain != 0) {
						alterHp(-(damage * drain / 100), myCurrentHp, myMaxHp, myHpBar, "enemy");
					}
					if (ailmentRandomNumber <= ailmentChance) {
						makeAilment(ailment, "enemy");
					}
				} else {
					alterHp(damage, myCurrentHp, myMaxHp, myHpBar, attackSide);
					// HP吸収攻撃の場合のHP変更処理
					if (drain != 0) {
						alterHp(-(damage * drain / 100), enemyCurrentHp, enemyMaxHp, enemyHpBar, "my");
					}
					if (ailmentRandomNumber <= ailmentChance) {
						makeAilment(ailment, "my");
					}
				}
			}
		} else {
			failureMessage(name);
		}
		if (!isFirstAction && isFighting) {
			setTimeout(function(){
				resetMessage();
				isAvailable = true;
			}, 1500);
		}
	}, 1500);
}

//*** 状態異常処理 ***
function makeAilment(ailment, defenseSide) {
	if (!$("#" + defenseSide + "-ailment-stats").hasClass("is-ailed")) {
		if (ailment == "やけど") {
			document.getElementById(defenseSide + "-ailment-stats").textContent = ailment;
			$("#" + defenseSide + "-ailment-stats").addClass("is-ailed is-burned");
		} else if (ailment == "まひ") {
			document.getElementById(defenseSide + "-ailment-stats").textContent = ailment;
			$("#" + defenseSide + "-ailment-stats").addClass("is-ailed is-paralyzed");
		} else if (ailment == "どく") {
			document.getElementById(defenseSide + "-ailment-stats").textContent = ailment;
			$("#" + defenseSide + "-ailment-stats").addClass("is-ailed is-poisoned");
		} else if (ailment == "こおり") {
			document.getElementById(defenseSide + "-ailment-stats").textContent = ailment;
			$("#" + defenseSide + "-ailment-stats").addClass("is-ailed is-freezed");
		} else if (ailment == "ねむり") {
			document.getElementById(defenseSide + "-ailment-stats").textContent = ailment;
			$("#" + defenseSide + "-ailment-stats").addClass("is-ailed is-sleeped");
		}
	}
	if (ailment == "こんらん") {
		$("#" + defenseSide + "-ailment-stats").addClass("isConfusioned");
	} else if (ailment == "バインド") {
		$("#" + defenseSide + "-ailment-stats").addClass("isBinded");
	}
}

// *** ダメージ計算 ***
// @movePower：技威力
// @moveType：技タイプ
// @damageClass：技分類
// @drain：(+)HP吸収率、(-)反動ダメージ率
// @attackSide：攻撃サイド
function calcDamage(movePower, moveType, damageClass, drain, attackSide) {
	let hpBar;
	let currentHp;
	let maxHp;
	let typesArray= [];
	let level;
	let A;
	let D;
	let attack;
	let specialAttack;
	let defense;
	let specialDefense;

	// 攻撃サイドを判定
	if (attackSide == "my") {
		level = myLevel;
		attack = myAttack;
		specialAttack = mySpecialAttack;
		defense = enemyDefense;
		specialDefense = enemySpecialDefense;
		hpBar = enemyHpBar;
		currentHp = enemyCurrentHp;
		maxHp = enemyMaxHp;
		typesArray = enemyTypesArray;
	} else if (attackSide == "enemy") {
		level = enemyLevel;
		attack = enemyAttack;
		specialAttack = enemySpecialAttack;
		defense = myDefense;
		specialDefense = mySpecialDefense;
		hpBar = myHpBar;
		currentHp = myCurrentHp;
		maxHp = myMaxHp;
		typesArray = myTypesArray;
	}

	// 技が物理技か特殊技か判定
	if (damageClass == "physical") {
		A = attack;
		D = defense;
	} else if (damageClass == "special") {
		A = specialAttack;
		D = specialDefense;
	} else {
		A = attack;
		D = defense;
	}
	// 与ダメージ
	let damageRandomNumber = Math.floor(Math.random() * 16) + 85;
	let damage = (((level * 2 / 5 +2) * movePower * A / D) / 50 + 2) * damageRandomNumber / 100;
	// いりょく0の技の場合ダメージを0に
	if (movePower == 0) {
		damage = 0;
	}
	// タイプ一致の場合1.5倍に
	if (myTypesArray.includes(moveType)) {
		damage *= 1.5;
	}

	// タイプ相性の判定
	let effectivity = 1;
	if (typesArray.includes("ノーマル")) {
		if (moveType == "かくとう") {
			effectivity *= 2;
		} else if (moveType == "ゴースト") {
			effectivity *= 0;
		}
	}
	if (typesArray.includes("ほのお")) {
		if (moveType == "みず" || moveType == "じめん" || moveType == "いわ") {
			effectivity *= 2;
		} else if (moveType == "ほのお" || moveType == "くさ" || moveType == "こおり" || moveType == "むし" || moveType == "はがね" || moveType == "フェアリー") {
			effectivity /= 2;
		}
	}
	if (typesArray.includes("みず")) {
		if (moveType == "でんき" || moveType == "くさ") {
			effectivity *= 2;
		} else if (moveType == "ほのお" || moveType == "みず" || moveType == "こおり" || moveType == "はがね") {
			effectivity /= 2;
		}
	}
	if (typesArray.includes("でんき")) {
		if (moveType == "じめん") {
			effectivity *= 2;
		} else if (moveType == "でんき" || moveType == "ひこう" || moveType == "はがね") {
			effectivity /= 2;
		}
	}
	if (typesArray.includes("くさ")) {
		if (moveType == "ほのお" || moveType == "こおり" || moveType == "どく" || moveType == "ひこう" || moveType == "むし") {
			effectivity *= 2;
		} else if (moveType == "みず" || moveType == "でんき" || moveType == "くさ" || moveType == "じめん") {
			effectivity /= 2;
		}
	}
	if (typesArray.includes("こおり")) {
		if (moveType == "ほのお" || moveType == "かくとう" || moveType == "いわ" || moveType == "はがね") {
			effectivity *= 2;
		} else if (moveType == "こおり") {
			effectivity /= 2;
		}
	}
	if (typesArray.includes("かくとう")) {
		if (moveType == "ひこう" || moveType == "エスパー" || moveType == "フェアリー") {
			effectivity *= 2;
		} else if (moveType == "むし" || moveType == "いわ" || moveType == "あく") {
			effectivity /= 2;
		}
	}
	if (typesArray.includes("どく")) {
		if (moveType == "じめん" || moveType == "エスパー") {
			effectivity *= 2;
		} else if (moveType == "くさ" || moveType == "かくとう" || moveType == "どく" || moveType == "むし" || moveType == "フェアリー") {
			effectivity /= 2;
		}
	}
	if (typesArray.includes("じめん")) {
		if (moveType == "みず" || moveType == "くさ" || moveType == "こおり") {
			effectivity *= 2;
		} else if (moveType == "どく" || moveType == "いわ") {
			effectivity /= 2;
		} else if (moveType == "でんき") {
			effectivity *= 0;
		}
	}
	if (typesArray.includes("ひこう")) {
		if (moveType == "でんき" || moveType == "こおり" || moveType == "いわ") {
			effectivity *= 2;
		} else if (moveType == "くさ" || moveType == "かくとう" || moveType == "むし") {
			effectivity /= 2;
		} else if (moveType == "じめん") {
			effectivity *= 0;
		}
	}
	if (typesArray.includes("エスパー")) {
		if (moveType == "むし" || moveType == "ゴースト" || moveType == "あく") {
			effectivity *= 2;
		} else if (moveType == "かくとう" || moveType == "エスパー") {
			effectivity /= 2;
		}
	}
	if (typesArray.includes("むし")) {
		if (moveType == "ほのお" || moveType == "ひこう" || moveType == "いわ") {
			effectivity *= 2;
		} else if (moveType == "くさ" || moveType == "かくとう" || moveType == "じめん") {
			effectivity /= 2;
		}
	}
	if (typesArray.includes("いわ")) {
		if (moveType == "みず" || moveType == "くさ" || moveType == "かくとう" || moveType == "じめん" || moveType == "はがね") {
			effectivity *= 2;
		} else if (moveType == "ノーマル" || moveType == "ほのお" || moveType == "どく" || moveType == "ひこう") {
			effectivity /= 2;
		}
	}
	if (typesArray.includes("ゴースト")) {
		if (moveType == "ゴースト" || moveType == "あく") {
			effectivity *= 2;
		} else if (moveType == "どく" || moveType == "むし") {
			effectivity /= 2;
		} else if (moveType == "ノーマル" || moveType == "かくとう") {
			effectivity *= 0;
		}
	}
	if (typesArray.includes("ドラゴン")) {
		if (moveType == "こおり" || moveType == "ドラゴン" || moveType == "フェアリー") {
			effectivity *= 2;
		} else if (moveType == "ほのお" || moveType == "みず" || moveType == "でんき" || moveType == "くさ") {
			effectivity /= 2;
		}
	}
	if (typesArray.includes("あく")) {
		if (moveType == "かくとう" || moveType == "むし" || moveType == "フェアリー") {
			effectivity *= 2;
		} else if (moveType == "ゴースト" || moveType == "あく") {
			effectivity /= 2;
		} else if (moveType == "エスパー") {
			effectivity *= 0;
		}
	}
	if (typesArray.includes("はがね")) {
		if (moveType == "ほのお" || moveType == "かくとう" || moveType == "じめん") {
			effectivity *= 2;
		} else if (moveType == "ノーマル" || moveType == "くさ" || moveType == "こおり" || moveType == "ひこう" || moveType == "エスパー" || moveType == "むし" || moveType == "いわ" || moveType == "ドラゴン" || moveType == "はがね" || moveType == "フェアリー") {
			effectivity /= 2;
		} else if (moveType == "どく") {
			effectivity *= 0;
		}
	}
	if (typesArray.includes("フェアリー")) {
		if (moveType == "どく" || moveType == "はがね") {
			effectivity *= 2;
		} else if (moveType == "かくとう" || moveType == "むし" || moveType == "あく") {
			effectivity /= 2;
		} else if (moveType == "ドラゴン") {
			effectivity *= 0;
		}
	}

	if (effectivity >= 2) {
		document.getElementById("effective-message").textContent = "こうかはばつぐんだ！";
	} else if (effectivity < 1 && effectivity > 0) {
		document.getElementById("effective-message").textContent = "こうかはいまひとつのようだ";
	} else if (effectivity == 0) {
		document.getElementById("effective-message").textContent = "こうかはないようだ";
	} else {
		document.getElementById("effective-message").textContent = "";
	}

	if (damageClass == "status") {
		document.getElementById("effective-message").textContent = "";
	}

	// ダメージ倍率を反映
	damage *= effectivity;

	if(damageClass == "oneHitKnockout" && effectivity != 0) {
		document.getElementById("effective-message").textContent = "いちげきひっさつ！";
		damage = currentHp;
	}

	return Math.round(damage);
}

//*** スリップダメージ処理 ***
function slipDamage(ailment, defenseSide) {
	let damage = Math.round(maxHp / 16);

	alterHp(damage, currentHp, maxHp, hpBar, defenseSide);
}

// *** HP変更処理 ***
function alterHp(damage, currentHp, maxHp, hpBar, attackSide) {
	// HPの値を算出する
	currentHp -= damage;
	let hpRatio = (currentHp / maxHp) * 100

	if (currentHp <= 0) {
		// 算出の結果 0 以下になった場合
		currentHp = 0;
		hpBar.style.width = "0%";
	} else if (hpRatio > 100){		// 算出の結果 100 を超過した場合
		currentHp = maxHp;
	} else if (hpRatio > 50) {
		hpBar.style.backgroundColor = "#00FF00";
	} else if (hpRatio <= 50 && hpRatio > 20) {
		hpBar.style.backgroundColor = "#FFFF00";
	} else if (hpRatio <= 20) {
		hpBar.style.backgroundColor = "#FF0000";
	}
	// HPゲージを更新する
	hpBar.style.width = hpRatio + "%"

	// HP更新、戦闘不能判定
	if (attackSide == "my") {
		document.getElementById("enemy-current-hp").textContent = Math.trunc(currentHp);
		enemyCurrentHp = parseInt(document.getElementById("enemy-current-hp").textContent);
		if (enemyCurrentHp == 0) {
			setTimeout(function(){
				resetMessage();
				document.getElementById("other-message").textContent = "あいての　" + enemyName + "は　たおれた";
				document.getElementById("enemyImg").classList.add("knockout");
			}, 2000);
			isAvailable = false;
			isFighting = false;
		} else {
			setTimeout(function(){
				isAvailable = true;
				resetMessage();
			}, 4500);
		}
	} else {
		document.getElementById("my-current-hp").textContent = Math.trunc(currentHp);
		myCurrentHp = parseInt(document.getElementById("my-current-hp").textContent);
		if (myCurrentHp == 0) {
			setTimeout(function(){
				resetMessage();
				document.getElementById("other-message").textContent = myName + "は　たおれた";
				document.getElementById("myImg").classList.add("knockout");
			}, 2000);
			isAvailable = false;
			isFighting = false;
		} else {
			setTimeout(function(){
				isAvailable = true;
				resetMessage();
			}, 4500);
		}
	}
}

//	ヒット回数を算出
function getHits(minHits, maxHits) {
	return Math.floor(Math.random() * (maxHits - minHits + 1)) + minHits;
}

// ターン終了時の処理
function endProcess() {
	if ($("#enemy-ailment-stats").hasClass("is-burned")) {
		document.getElementById("other-message").itextContent = enemyName + "は　やけどしている";
	}
}

//	攻撃が外れた場合のメッセージ表示
function failureMessage(name) {
	document.getElementById("other-message").innerHTML = "しかし　" + name + "の<br>こうげきは　はずれた！";
	document.getElementById("pokemon-name-message").textContent = "";
	document.getElementById("move-message").textContent = "";
	document.getElementById("effective-message").textContent = "";
}

//	メッセージウィンドウをリセット
function resetMessage() {
	document.getElementById("other-message").innerHTML = "";
	document.getElementById("pokemon-name-message").textContent = "";
	document.getElementById("move-message").textContent = "";
	document.getElementById("effective-message").textContent = "";
}



