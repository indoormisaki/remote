# Pokemon

PokeAPI のデータを使った、ポケモン図鑑とバトルのサンプル (第1〜3世代、図鑑番号 1〜386)。
Java / サーバーは不要で、`index.html` をブラウザで開くだけで動きます。

## 使い方

1. `index.html` をブラウザで開く (ダブルクリックでOK)
2. 「図鑑を見る」「バトル開始」を選ぶ

データは [PokeAPI](https://pokeapi.co/) からブラウザが直接取得するため、インターネット接続が必要です。
一度取得したデータは `localStorage` にキャッシュされます。

## 構成

| ファイル | 役割 |
|---|---|
| `index.html` / `js/index.js` | ポケモン選択 |
| `pokedex.html` / `js/pokedex.js` | 図鑑 (`pokedex.html?id=25`) |
| `battle.html` / `js/battle-page.js` | バトル画面の組み立て (`battle.html?my=25&enemy=6`) |
| `js/battle.js` | バトルの進行 (ダメージ計算など) |
| `js/common.js` | PokeAPI の取得、ステータス計算、技のランダム選択 |
| `js/translations.js` | 英語名から日本語名への対応表 |

## 補足

- 攻撃技が4つ未満のポケモン (メタモンなど) は「たいあたり」で埋めます。
- ES Modules を使わない通常の `<script>` で書いているので、`file://` で開いても動きます。
