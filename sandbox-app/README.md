# Sandbox Application: Hands-on Exercise

このプロジェクトは、GitHub Copilot および OpenAI Codex（各種AIエージェント）の動作確認・自己修復・サブエージェント連携を体験するための TypeScript サンドボックスアプリです。

---

## 🚀 環境構築と初期動作確認

```bash
# 依存パッケージのインストール
npm install

# 型チェックの実行
npm run typecheck

# テストスイートの実行（初期状態では意図的に失敗します）
npm test
```

> ⚠️ **注意**: `npm test` を実行すると、初期状態で **2件のテストが失敗（FAIL）** します。これは演習用の意図的な不具合です。

---

## 📝 演習課題 1: バグ修正とテスト自己修復ループ (Exercise 1)

### 背景・目的
`tests/calculator.test.ts` を実行すると以下の2点が失敗します：
1. `should throw an error when dividing by zero`: ゼロ除算時に `Division by zero is not allowed` エラーがスローされず `Infinity` が返る。
2. `should round down (truncate) tax to integer when fraction occurs`: `105 * 0.1 = 10.5` が整数（10）に端数切捨て（`Math.floor`）されていない。

### 実施手順
1. Copilot Chat または Codex/エージェントCLI に以下のように指示します：
   ```text
   @workspace tests/calculator.test.ts のテストを実行すると2件失敗します。
   AGENTS.md の検証ハーネス規約に従い、src/calculator.ts を修正して、
   npm test および npm run typecheck の両方がパスするように修正してください。
   ```
2. エージェントが提示した修正差分を確認し、適用します。
3. `npm test` を再実行し、すべてのテストが Green（合格）になることを確認してください。

---

## 📝 演習課題 2: サブエージェント連携による新機能追加 (Exercise 2)

### 背景・目的
`calculator.ts` に、ECサイト向けの「割引計算機能（`applyDiscount`）」を新設します。
単一のプロンプトで一気に作らせるのではなく、`Planner` → `Implementer` → `Reviewer` の役割分担で開発を進めます。

### 仕様要件:
- 関数シグネチャ: `applyDiscount(price: number, discountPercentage: number, maxDiscount?: number): number`
- 仕様:
  1. `price`（原価）と `discountPercentage`（割引率: 0〜100）を受け取り、割引後価格を整数（端数切捨て）で返す。
  2. `maxDiscount`（最大割引額）が指定されている場合、割引額はその上限を超えないこと。
  3. 異常系: `price < 0` または `discountPercentage < 0 || discountPercentage > 100` の場合は `Error` をスローすること。

### 実施手順:
1. **フェーズ 1: Planner Agent（設計・計画）**
   - `templates/.github/agents/planner.agent.md` の指示を元に、「割引計算機能の実装計画」を作成させます。境界値（0%、100%、上限額超過）の受入基準をリストアップさせます。
2. **フェーズ 2: Implementer Agent（実装・TDD）**
   - `templates/.github/agents/implementer.agent.md` の指示を元に、テストケース（`tests/calculator.test.ts`）を先に追加させ、`src/calculator.ts` に実装させます。
   - `npm run verify`（型チェック＋テスト）が自動で通るまで自己修復させます。
3. **フェーズ 3: Reviewer Agent（レビュー）**
   - `templates/.github/agents/reviewer.agent.md` の指示を元に、実装コードとテストを厳格にレビューさせます。
