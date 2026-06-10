# Blocksmith — Documentation Index

> Exported from [Notion workspace](https://app.notion.com/p/Modern-Fork-of-VvvebJs-React-Tailwind-shadcn-Page-Builder-38c4fd00932a49a6978c944924579c54)

An agent-first, open-source visual page builder for React — inspired by VvvebJs UX, rebuilt on Craft.js + Tailwind + shadcn.

## Quick links

| Doc | Description |
| --- | --- |
| [Main Overview](./01-main-overview.md) | Vision, architecture, roadmap, risks |
| [Strategy — Build vs Adopt](./02-strategy-build-vs-adopt.md) | Puck vs Craft.js decision history |
| [Naming + npm / GitHub Setup](./03-naming-npm-github-setup.md) | Blocksmith branding, monorepo layout |
| [Core + Runtime MVP](./core-runtime-spec.md) | Schema, defineComponent, `<Render>` |
| [Agent-First Architecture](./agent-first.md) | JSX-isomorphic tree, agent tools |
| [AI System Prompt + Tokens](./prompt-token.md) | System prompt, design token contract |
| [JSX → AST → Tree Pipeline](./pipeline-spec.md) | Parse, validate, lower, codegen |
| [Vision-Critique Loop](./vision-loop.md) | Render → screenshot → rubric → revise |
| [Editor UI Plan](./editor-ui-plan.md) | Vvveb UX on Craft.js, region-by-region |
| [Style Manager Spec](./style-manager.md) | Right panel, class-string engine |
| [Vvveb UI Polish Strategy](./vvveb-ui-polish.md) | Path A vs B, screenshot-diff approach |
| [Vvveb UI Capture Kit](./vvveb-ui-reference/README.md) | Screenshots, tokens, interactions |
| [Screenshot-Diff Loop](./diff-loop.md) | Pixel + vision matching against Vvveb refs |
| [AI-Assisted Build in Cursor](./ai-assisted-build-cursor.md) | Workspace layout, IP hygiene |
| [Repo Starter Kit](./repo-starter-kit.md) | Paste-ready monorepo scaffolding |
| [Parallel Subagent Orchestration](./parallel-subagent-orchestration.md) | Wave schedule, agent briefs |

## Locked-in decisions

- **Engine:** Craft.js (headless)
- **Data model:** ElementNode tree isomorphic to JSX
- **AI authoring:** JSX → AST → validated tree (never registry-JSON)
- **Editor UI:** Reimplement Vvveb in React/Tailwind
- **License:** Apache-2.0
- **Brand:** Blocksmith (`@blocksmith/*`)

## Build waves

1. **Wave 0** — Scaffold + freeze `@blocksmith/core` contracts
2. **Wave 1** — Runtime, pipeline, editor shell, components (parallel)
3. **Wave 2** — Style Manager + diff loop, agent layer (parallel)
4. **Wave 3** — Studio integration + e2e + visual regression

See [parallel-subagent-orchestration.md](./parallel-subagent-orchestration.md) for the full DAG.
