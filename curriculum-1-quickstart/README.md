# Curriculum 1: 最速立ち上げコース（半日〜1日）
<!-- Target: 開発チーム全員、テックリード、プロジェクトリーダー -->
<!-- Time: 3〜6時間 -->

本カリキュラムでは、GitHub Copilot および OpenAI Codex（各種エージェントツール）を安全かつ迅速にセットアップし、共通指示書とテスト駆動の自己修復ループを体験することで、自律的なAI開発の基礎を習得します。

---

## 🎯 学習ゴール (Learning Objectives)
1. **セキュリティ設定の理解**: コードがAIモデルの学習に利用されないためのオプトアウト設定を理解・確認できる。
2. **共通指示書の設計**: `AGENTS.md` と `.github/copilot-instructions.md` の役割の違いと書き方を習得する。
3. **自己修復ハーネスの体験**: テスト失敗を契機として、AIエージェントに自律的に原因特定・修正を行わせるフローを体得する。
4. **実務適用の第一歩**: `sandbox-app` の初期バグをAIと共に修正し、品質を担保した状態でコミットできる。

---

## ⏱ タイムスケジュール・アジェンダ

| 時間目安 | モジュール | 内容 |
| :--- | :--- | :--- |
| **00:00 - 00:45** (45m) | **Module 1: ガバナンス・環境準備** | Copilot/Codex の認証、プライバシー・オプトアウト設定の確認 |
| **00:45 - 01:45** (60m) | **Module 2: 共通指示書の作成演習** | `AGENTS.md` と `copilot-instructions.md` の作成・配置 |
| **01:45 - 02:45** (60m) | **Module 3: サンドボックス初期検証** | `sandbox-app` の構造把握と初期テスト失敗（Red）の確認 |
| **02:45 - 04:15** (90m) | **Module 4: 自己修復ハンズオン** | エージェントによるバグ修正・テスト追加・検証ループの実践 |
| **04:15 - 05:00** (45m) | **Module 5: ふりかえり・チェックリスト** | 学習内容の総括、自社プロジェクトへの展開準備 |

---

## 🛠 ハンズオン手順 (Hands-on Steps)

### Module 1: セキュリティとオプトアウト設定の確認
企業でAIツールを利用する際、**「自社のコードがパブリックモデルの学習データとして利用されないこと」** の確認は必須です。

1. **GitHub Copilot Business / Enterprise の場合**:
   - Organization の設定画面（`Settings` -> `Copilot` -> `Policies`）を開く。
   - `Suggestions matching public code`（公開コードとの一致）の設定方針を確認する。
   - データ利用ポリシーで、入力コードがモデルトレーニングに使用されない契約であることを確認する。
2. **OpenAI API / Codex CLI の場合**:
   - OpenAI Platform の Organization Settings で、API経由のデータ送信が学習対象外（Default Zero-Retention / Data Privacy Policy）であることを確認する。
   - 環境変数 `OPENAI_API_KEY` をローカル設定（`.env` またはシェルのプロファイル）に配置し、Git管理対象外（`.gitignore`）になっていることを確認する。

---

### Module 2: 共通指示書（AGENTS.md & copilot-instructions.md）の整備
AIエージェントに一貫した振る舞いをさせるため、プロジェクトルートに指示書を配置します。

1. `templates/` から指示書をコピーする演習を行います：
   ```bash
   # リポジトリルートで実行
   cp templates/AGENTS.md ./
   mkdir -p .github
   cp templates/.github/copilot-instructions.md .github/
   ```
2. **ファイルを開いて確認・カスタマイズ**:
   - `AGENTS.md`: テストコマンド（`npm test` 等）が書かれていることを確認。
   - `.github/copilot-instructions.md`: 日本語回答ルール、禁止事項（ハードコード禁止）を確認。

---

### Module 3: サンドボックスアプリのセットアップ
本リポジトリに同梱されている `sandbox-app/` を使って検証を行います。

1. ディレクトリに移動し、依存関係をインストール：
   ```bash
   cd sandbox-app
   npm install
   ```
2. テストを実行して、現状のステータスを確認：
   ```bash
   npm test
   ```
   > 💡 **ポイント**: 初期状態では `calculator.test.ts` 内の計算テスト（例：消費税計算の端数処理やゼロ除算など）が意図的に失敗するように設定されています。

---

### Module 4: AIエージェントによる自己修復ループの実践
失敗したテストのエラー出力を使い、Copilot Chat または Codex に修正を依頼します。

#### 手順 A: Copilot Chat の場合
1. VS Code / Cursor のサイドバーで Copilot Chat を開く。
2. 以下のプロンプトを入力して送信：
   ```text
   @workspace tests/calculator.test.ts を実行するとテストが失敗します。
   AGENTS.md および .github/copilot-instructions.md の規約に従い、
   テストが失敗している原因を特定し、src/calculator.ts を修正して
   npm test が成功するように修正してください。
   ```
3. 提示されたコード差分を確認し、ファイルに適用する。
4. 再度 `npm test` を実行し、全テストが Green になることを確認する。

#### 手順 B: 自律エージェントCLI（Codex / Claude Code / Antigravity 等）の場合
1. ターミナルからエージェントを起動し、以下を指示：
   ```bash
   # プロンプト実行例
   "Run npm test in sandbox-app, find out why it fails, fix src/calculator.ts, and re-run npm test until all pass."
   ```
2. エージェントが自律的にコマンドを実行し、エラー出力を読み取り、ファイルを修正して再度テストを実行するループ（ハーネス検証）を観察する。

---

## ✅ 確認チェックリスト (Self-Assessment Checklist)

受講完了後、以下の項目をすべて満たしているかチェックしてください。

- [ ] 組織のAIデータオプトアウトポリシーを理解し、設定確認が完了している。
- [ ] `AGENTS.md` と `copilot-instructions.md` の違い（汎用エージェント向け vs Copilot専用）を説明できる。
- [ ] `sandbox-app` の初期失敗テストの原因を理解し、AIを使って正しく修正できた。
- [ ] テストが通過するだけでなく、型チェック（`npm run typecheck`）もクリアできている。
- [ ] AIが勝手にテストのアサーション値を書き換えて「偽の成功」を作っていないか検証できた。
