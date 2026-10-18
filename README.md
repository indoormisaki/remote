# Pokemon

PokeAPI のデータを使った、ポケモン図鑑とバトルのサンプル (第1〜3世代、図鑑番号 1〜386)。
Java / サーバーは不要で、`index.html` をブラウザで開くだけで動きます。

## 使い方

1. `index.html` をブラウザで開く (ダブルクリックでOK)
2. 「図鑑」または「バトル」を選ぶ

データは [PokeAPI](https://pokeapi.co/) からブラウザが直接取得するため、インターネット接続が必要です。
一度取得したデータは `localStorage` にキャッシュされます。
GitHub Pages で公開する場合は、ブランチのルートをそのまま公開すれば動きます。

## 構成

| ファイル | 役割 |
|---|---|
| `index.html` | ホーム (図鑑とバトルへの入口) |
| `pokedex.html` / `js/pokedex.js` | 図鑑。`id` なしで検索つき一覧、`pokedex.html?id=25` で詳細 |
| `battle.html` / `js/battle-page.js` | バトル。パラメータなしでポケモン選択、`battle.html?my=25&enemy=6` で対戦 |
| `js/battle.js` | バトルの進行 (ダメージ計算など) |
| `js/common.js` | PokeAPI の取得、ステータス計算、技のランダム選択 |
| `js/picker.js` | 検索つきポケモン一覧 (図鑑・バトル選択で共用) |
| `js/translations.js` | 英語名から日本語名への対応表 |
| `css/base.css` / `css/battle.css` | 共通スタイル(ライト/ダーク対応)、バトル画面 |

## 補足

- 攻撃技が4つ未満のポケモン (メタモンなど) は「たいあたり」で埋めます。
- ES Modules を使わない通常の `<script>` で書いているので、`file://` で開いても動きます。
