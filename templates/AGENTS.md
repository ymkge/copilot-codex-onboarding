# Root Agent Instructions (AGENTS.md)
<!-- This file serves as the Single Source of Truth (SSOT) for OpenAI Codex, Claude Code, and autonomous coding agents. -->

## 1. Project Overview & Philosophy
- **Repository Role**: Enterprise-grade application / library.
- **Primary Goal**: Maintain high code quality, strict type safety, full test coverage, and clear traceability.
- **Language Policy**:
  - Code comments & identifier names: English.
  - Explanations, commit messages, and PR summaries: Japanese (unless specified otherwise by the user).

---

## 2. Verification Harness (Command Specifications)
Whenever you introduce changes or refactor existing code, you **MUST** run and pass the following commands before completing your task.

```bash
# 1. Type Check (Strict mode enabled)
npm run typecheck

# 2. Lint & Formatting Check
npm run lint

# 3. Automated Test Suite (Unit & Integration)
npm test
```

### Self-Correction Loop Rule:
1. If any command above fails, inspect the error output carefully.
2. Formulate a minimal, targeted fix.
3. Re-run the verification harness until all steps exit with code 0.
4. **NEVER** suppress errors using `@ts-ignore`, `eslint-disable`, or modifying test assertions without explicit architectural justification.

---

## 3. General Architecture & Coding Guidelines
- **Modularity & Single Responsibility**: Keep functions small (< 30 lines) and focused.
- **Pure Functions First**: Minimize mutable state and side effects. Encapsulate business logic in testable pure functions.
- **Error Handling**:
  - Avoid generic `catch (e) {}` blocks.
  - Always throw or return typed, descriptive domain errors.
  - Ensure resource cleanup (streams, connections, file descriptors).
- **Security & Hygiene**:
  - Never hardcode secrets, API keys, passwords, or internal URLs.
  - Read sensitive configuration strictly via environment variables.
  - Sanitize all user inputs before processing or rendering.

---

## 4. Agent Work Protocol (Step-by-Step)
When assigned an issue or feature request:
1. **Analyze**: Read existing source code and related tests before modifying anything. Do not guess behavior.
2. **Plan**: Formulate a concise implementation plan (files to create/modify, test cases to add).
3. **Test-Driven / Harness Execution**: Write or update tests that reproduce the issue or assert new requirements, then implement the solution.
4. **Verify**: Execute the full verification harness (`npm test && npm run typecheck`).
5. **Summarize**: Provide a concise Japanese summary of changes made, verification results, and any architectural notes.
