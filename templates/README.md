# Enterprise Copilot & Agent Configuration Templates

本ディレクトリには、新規または既存のプロダクトリポジトリにコピーして即座に利用できる、GitHub Copilot および OpenAI Codex（各種自律エージェント）向けの標準設定ファイル群が含まれています。

---

## 📂 構成ファイル一覧と役割

```text
templates/
├── README.md                              # 本導入ガイド
├── AGENTS.md                              # 【最重要】Codex / 汎用エージェント向けルート指示書
└── .github/
    ├── copilot-instructions.md            # 【最重要】GitHub Copilot 全体指示書
    ├── instructions/                      # パス指定型（applyTo）詳細規約
    │   ├── typescript-react.instructions.md  # TS/React 実装規約
    │   └── testing.instructions.md           # 単体テスト・検証規約
    ├── agents/                            # 役割分担サブエージェント定義
    │   ├── planner.agent.md               # 設計・タスク分解専門
    │   ├── implementer.agent.md           # 実装・テスト自己修復専門
    │   └── reviewer.agent.md              # セキュリティ・品質レビュー専門
    └── prompts/                           # 定型タスク用再利用プロンプト
        ├── fix-issue.prompt.md            # Issue自律修正
        └── create-pr.prompt.md            # PR自動生成
```

---

## 🛠 プロジェクトへの導入手順

### ステップ 1: ファイルのコピー
自社プロジェクトのルートディレクトリに、以下のコマンドでテンプレートを展開します。

```bash
# ターゲットプロジェクトのルートで実行（パスは適宜調整してください）
cp /path/to/templates/AGENTS.md ./
cp -r /path/to/templates/.github/ ./
```

### ステップ 2: 検証ハーネスコマンドの更新
プロジェクトの言語・ビルドツールに合わせて、`AGENTS.md` および `.github/copilot-instructions.md` 内の検証コマンドを書き換えます。

- **Node.js / TypeScript の例**:
  ```bash
  npm run typecheck && npm test
  ```
- **Python / Poetry の例**:
  ```bash
  poetry run mypy . && poetry run pytest
  ```
- **Go の例**:
  ```bash
  go vet ./... && go test ./...
  ```

### ステップ 3: パス別インストラクションの調整
`.github/instructions/*.instructions.md` のフロントマター `applyTo` をプロジェクトのディレクトリ構造に合わせて変更します。
```markdown
---
applyTo: "packages/frontend/src/**/*.{ts,tsx}"
---
```

### ステップ 4: チームへの共有とリポジトリへのコミット
変更をリポジトリにコミットし、PRを作成してチーム内で共有します。
```bash
git add AGENTS.md .github/
git commit -m "chore: setup standardized copilot and agent instructions"
```

---

## 💡 カスタマイズのベストプラクティス
1. **二重管理の防止 (SSOT)**:
   基本ルールや検証ハーネスのコマンドは `AGENTS.md` に集約し、`copilot-instructions.md` はそれを補完・同期させる関係を保ちます。
2. **過密プロンプトの回避**:
   1つの指示書にすべての規約を詰め込むと、AIのコンテキストウィンドウが圧迫され精度が低下します。ファイル種別ごとに `.github/instructions/` で分割管理してください。
3. **チームの「ふりかえり」を通じた改訂**:
   AIが同じようなミスを2回繰り返した場合は、プロンプトの不備と捉え、該当の指示書に1行ルールを追加・更新（イテレーション）してください。
