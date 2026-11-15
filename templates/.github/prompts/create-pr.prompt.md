---
description: "現在のGitブランチの差分（git diff）から、高品質なPull Request（PR）タイトルと説明文を自動生成するプロンプト"
---

# Pull Request 作成プロンプト (Create PR Workflow)

現在のGitワーキングツリーの変更差分（`git diff main...HEAD` または直近のコミット履歴）を分析し、GitHub PRのタイトルと概要説明文を生成してください。

---

## 生成フォーマット

```markdown
## タイトル
<type>(<scope>): <簡潔な変更概要（英語または日本語、50文字以内）>
例: fix(calculator): resolve floating-point rounding issue in tax calculation

## 概要 (Summary)
- 今回の変更の背景と目的を2〜3行で簡潔に記載。
- 関連するIssue番号: closes #{{issue_number}}

## 変更内容の詳細 (Key Changes)
- **`path/to/fileA.ts`**:
  - 具体的な修正点（例：ゼロ除算時の例外ハンドリングを追加）
- **`path/to/test.ts`**:
  - 追加したテストケース（例：境界値テストの追加）

## 検証結果 (Verification)
以下の検証ハーネスを実行し、すべて通過することを確認済み：
- [x] `npm run typecheck` (型エラーゼロ)
- [x] `npm test` (全テストパス)

## レビュアーへの特記事項 (Notes for Reviewer)
- 破壊的変更の有無: [なし / あり（詳細）]
- 特に確認してほしいポイント（セキュリティ、計算ロジック等）
```

---

## 注意事項
- 些細なフォーマット変更や自動生成ファイルのノイズは要約し、重要なビジネスロジックの変更点に焦点を当ててください。
- Conventional Commitsのプレフィックス（`feat`, `fix`, `refactor`, `test`, `chore`, `docs` 等）を必ず使用してください。
