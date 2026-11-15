# GitHub Copilot & OpenAI Codex Enterprise Onboarding
# （企業向け AIエージェント開発環境 導入・実践ハンズオン）

本リポジトリは、エンタープライズ開発組織において **GitHub Copilot** および **OpenAI Codex（Codex CLI / 各種AIエージェントツール）** を安全かつ迅速に導入・定着させ、自律的なソフトウェア開発フロー（ハーネス設計・サブエージェント協調）を確立するためのハンズオン実践教材および再利用可能な標準設定テンプレート集です。

---

## 🎯 リポジトリの目的

単なる「コード補完ツール」としての活用にとどまらず、以下の3つの柱を実現することを目的としています：

1. **ガバナンスと共通設定の確立**:
   `AGENTS.md` や `.github/copilot-instructions.md` による組織標準プロンプト・禁止事項・コンテキスト管理の共通化。
2. **検証ハーネス（Test Harness）による自己修復の実現**:
   AIエージェントが自律的にテストを実行し、失敗時に自動修正ループを回すための環境構築。
3. **専門特化型サブエージェント連携（Planner / Implementer / Reviewer）**:
   単一の巨大プロンプトに依存せず、設計・実装・検証を分割統治する協調型AI開発ワークフローの確立。

---

## 📚 カリキュラム全体像

受講対象者と習熟度に応じた3段階のカリキュラムを提供しています。

| カリキュラム | 対象者 | 想定所要時間 | 主な学習目標・成果物 |
| :--- | :--- | :--- | :--- |
| **[Curriculum 1: 最速立ち上げコース](./curriculum-1-quickstart/README.md)** | 全開発者・リーダー | 半日〜1日 (3〜6h) | ・Copilot / Codex の環境設定 & オプトアウト確認<br>・共通指示書（`AGENTS.md` / `copilot-instructions.md`）の理解<br>・テスト失敗を契機とした自己修復ループの実践<br>・`sandbox-app` の初期バグ修正 |
| **[Curriculum 2: ハーネス＆サブエージェント設計コース](./curriculum-2-harness-subagents/README.md)** | シニア開発者・アーキテクト | 2日間 (10〜12h) | ・パス別インストラクション（`applyTo`）によるコンテキスト最適化<br>・Planner → Implementer → Reviewer の役割分担と協調<br>・型検査・リンター・単体テストを統合した自動検証ハーネスの構築<br>・MCP（Model Context Protocol）と最小権限運用の基礎 |
| **[Curriculum 3: 組織標準化＆ガバナンス確立コース](./curriculum-3-org-governance/README.md)** | EM, Tech Lead, 推進PJメンバー | 1日 (5〜7h) | ・Copilot / Codex の設定二重管理防止（Single Source of Truth）<br>・承認ポリシー（Approval Mode）とコマンド実行の安全制御<br>・プロンプト/エージェント資産の共有リポジトリ運用<br>・導入効果測定（PRリードタイム、カバレッジ、ROIメトリクス） |

---

## 🛠 前提環境・事前準備

受講前に以下のツールおよびアカウントが準備されていることを確認してください。

1. **実行ランタイム・基本ツール**:
   - **Node.js**: `v20.x` 以上（`v22.x` 推奨）
   - **Git**: `2.40` 以上
2. **エディタ / IDE**:
   - **Visual Studio Code** または **Cursor**
   - 拡張機能: `GitHub Copilot`, `GitHub Copilot Chat`
3. **アカウント & 権限**:
   - GitHub Copilot Business / Enterprise アカウント（または Individual）
   - OpenAI API キー（Codex CLI または Agent CLI 利用時）
   - ※組織のコード学習オプトアウト（データプライバシー設定）が有効になっていること。
4. **CLI ツール（任意・コース2以降推奨）**:
   - `gh` (GitHub CLI)
   - OpenAI Codex CLI または Claude Code 等のエージェント型CLI

---

## 📁 ディレクトリ構成

```text
copilot-codex-onboarding/
├── README.md                                  # 本ドキュメント（全体概要・進め方）
├── templates/                                 # 実案件へそのままコピー可能な標準設定セット
│   ├── README.md                              # テンプレート適用・カスタマイズガイド
│   ├── AGENTS.md                              # Codex / エージェント向け共通指示書
│   └── .github/
│       ├── copilot-instructions.md            # GitHub Copilot 全体指示書
│       ├── instructions/                      # パス指定型詳細指示（TypeScript, テスト）
│       │   ├── typescript-react.instructions.md
│       │   └── testing.instructions.md
│       ├── agents/                            # サブエージェント定義
│       │   ├── planner.agent.md               # 設計・タスク分解専門
│       │   ├── implementer.agent.md           # 実装・テスト駆動修正専門
│       │   └── reviewer.agent.md              # セキュリティ・品質レビュー専門
│       └── prompts/                           # 頻出業務プロンプトテンプレート
│           ├── fix-issue.prompt.md            # Issue自律修正プロンプト
│           └── create-pr.prompt.md            # PR自動生成プロンプト
├── curriculum-1-quickstart/                   # カリキュラム1：最速立ち上げ手順書
│   └── README.md
├── curriculum-2-harness-subagents/            # カリキュラム2：ハーネス＆サブエージェント実践手順書
│   └── README.md
├── curriculum-3-org-governance/               # カリキュラム3：組織ガバナンス確立手順書
│   └── README.md
└── sandbox-app/                               # 演習用TypeScriptミニアプリ
    ├── README.md                              # 演習課題手順
    ├── package.json
    ├── tsconfig.json
    ├── src/
    │   ├── index.ts
    │   └── calculator.ts                      # 演習用の意図的バグを含む計算モジュール
    └── tests/
        └── calculator.test.ts                 # 検証ハーネス用テストコード
```

---

## 🚀 全体の進め方ガイド

1. **ステップ 1: サンドボックスアプリの動作確認**
   まずは `sandbox-app/` に移動し、依存関係のインストールとテスト実行を行います。
   ```bash
   cd sandbox-app
   npm install
   npm test
   ```
   初期状態では意図的に失敗するテストが含まれており、AIエージェントによる自己修復の題材となります。

2. **ステップ 2: カリキュラムの受講**
   - 初心者・一般開発チームは **[Curriculum 1](./curriculum-1-quickstart/README.md)** から開始してください。
   - すでに Copilot を利用中で、エージェント協調やCI/CD連携を深めたいチームは **[Curriculum 2](./curriculum-2-harness-subagents/README.md)** へ進んでください。
   - 推進事務局・テックリードは **[Curriculum 3](./curriculum-3-org-governance/README.md)** を参照し、組織展開ガイドラインを策定してください。

3. **ステップ 3: 自社プロジェクトへのテンプレート展開**
   `templates/` 配下のファイルを自社のGitリポジトリにコピーし、自社スタックに合わせて微修正するだけで、即座に組織標準のAIエージェント開発環境を立ち上げることができます。
