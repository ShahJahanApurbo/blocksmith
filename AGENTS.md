# Blocksmith — Agent Guide

Blocksmith is an agent-first React page builder. Read `.cursor/rules/architecture.md`
and `docs/` before making changes.

## Package boundaries

| Package | Scope |
| --- | --- |
| `@blocksmith/core` | Schema types, `defineComponent`, `createConfig` |
| `@blocksmith/runtime` | Headless `<Render>` — no editor deps |
| `@blocksmith/editor` | Craft.js visual editor UI |
| `@blocksmith/components` | Tailwind + shadcn blocks |
| `@blocksmith/studio` | Standalone app wiring packages |
| `@blocksmith/cli` | Scaffold and export tooling |

## Key docs

- `docs/core-runtime-spec.md` — document schema and runtime contract
- `docs/pipeline-spec.md` — JSX → AST → tree pipeline
- `docs/prompt-token.md` — Tailwind token rules for AI-authored content
- `docs/editor-ui-plan.md` — Vvveb-style editor regions
- `docs/repo-starter-kit.md` — monorepo scaffolding reference

## Rules

1. Build package-by-package; keep boundaries clean.
2. Reference repos in `../references/` are read-only context — never copy verbatim.
3. TypeScript strict; pnpm + Turborepo; tsup builds; Vitest for tests.
