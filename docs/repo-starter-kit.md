# Repo Starter Kit — Paste-Ready Files

> [Notion source](https://app.notion.com/p/4dd57d3d5938456191c148d102f91216)

Paste-ready scaffolding for the monorepo. Decisions baked in: **pnpm + Turborepo**, **TypeScript strict**, **Craft.js engine**, **Apache-2.0** license.

## Folder tree

```
blocksmith/                         # the published repo (git init here)
├─ packages/
│  ├─ core/                         # schema, defineComponent, resolver types
│  ├─ runtime/                      # headless <Render>
│  ├─ editor/                       # Craft.js Vvveb-style UI
│  ├─ components/                   # Tailwind + shadcn blocks
│  ├─ studio/                       # optional standalone app
│  └─ cli/                          # scaffold / export
├─ docs/                            # the spec docs (export these Notion pages)
│  └─ vvveb-ui-reference/           # capture kit (shots, tokens.json, ...)
├─ .cursor/rules/architecture.md
├─ .gitignore
├─ AGENTS.md
├─ README.md
├─ CREDITS.md
├─ NOTICE
├─ LICENSE                          # Apache-2.0 text
├─ package.json
├─ pnpm-workspace.yaml
├─ turbo.json
└─ tsconfig.base.json
```

## `package.json` (root)

```json
{
  "name": "blocksmith-monorepo",
  "private": true,
  "packageManager": "pnpm@9.6.0",
  "scripts": {
    "build": "turbo run build",
    "dev": "turbo run dev",
    "test": "turbo run test",
    "lint": "turbo run lint",
    "typecheck": "turbo run typecheck",
    "release": "changeset publish"
  },
  "devDependencies": {
    "@changesets/cli": "^2.27.7",
    "turbo": "^2.0.6",
    "typescript": "^5.5.3",
    "tsup": "^8.1.0",
    "vitest": "^2.0.0",
    "@playwright/test": "^1.45.0"
  }
}
```

## `pnpm-workspace.yaml`

```yaml
packages:
  - "packages/*"
```

## `turbo.json`

```json
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": { "dependsOn": ["^build"], "outputs": ["dist/**"] },
    "dev": { "cache": false, "persistent": true },
    "test": { "dependsOn": ["^build"] },
    "lint": {},
    "typecheck": { "dependsOn": ["^build"] }
  }
}
```

## `tsconfig.base.json`

```json
{
  "compilerOptions": {
    "target": "ES2021",
    "lib": ["DOM", "DOM.Iterable", "ES2021"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "declaration": true,
    "composite": true
  }
}
```

## `packages/core/package.json`

```json
{
  "name": "@blocksmith/core",
  "version": "0.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": { ".": { "types": "./dist/index.d.ts", "import": "./dist/index.js" } },
  "scripts": {
    "build": "tsup src/index.ts --format esm --dts",
    "dev": "tsup src/index.ts --format esm --dts --watch",
    "test": "vitest run",
    "typecheck": "tsc --noEmit"
  },
  "peerDependencies": { "react": ">=18" }
}
```

## `packages/runtime/package.json`

```json
{
  "name": "@blocksmith/runtime",
  "version": "0.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsup src/index.ts --format esm --dts",
    "dev": "tsup src/index.ts --format esm --dts --watch",
    "test": "vitest run",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": { "@blocksmith/core": "workspace:*" },
  "peerDependencies": { "react": ">=18", "react-dom": ">=18" }
}
```

## `packages/editor/package.json`

```json
{
  "name": "@blocksmith/editor",
  "version": "0.0.0",
  "type": "module",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "scripts": {
    "build": "tsup src/index.ts --format esm --dts",
    "dev": "tsup src/index.ts --format esm --dts --watch",
    "test": "vitest run",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@blocksmith/core": "workspace:*",
    "@craftjs/core": "^0.2.11",
    "@babel/parser": "^7.24.0",
    "@babel/traverse": "^7.24.0",
    "nanoid": "^5.0.0"
  },
  "peerDependencies": { "react": ">=18", "react-dom": ">=18" }
}
```

## `tsup.config.ts` (per package)

```typescript
import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: ["react", "react-dom"],
})
```

## `.gitignore`

```
node_modules/
dist/
.turbo/
*.log
.DS_Store
.env*

# Reference repos are LOCAL context only — never commit/publish them.
references/
**/references/
```

## `.cursor/rules/architecture.md`

```
You are building Blocksmith, an agent-first React page builder. Obey these rules:

ENGINE: Craft.js (headless) is the node-tree engine. Build a custom Vvveb-style UI
on top (docs/editor-ui-plan.md). Do NOT add Puck as a dependency.

DATA MODEL: pages are an ElementNode tree (docs/pipeline-spec.md). Primitives are
any allowlisted HTML tag via the `Prim` wrapper; smart components are registered
in the resolver. The tree is JSON-serializable and isomorphic to JSX.

AI AUTHORING: page generation = JSX+Tailwind -> AST -> validated tree (never
registry-JSON). Page-content styling is Tailwind tokens only (docs/prompt-token.md):
no inline styles, no arbitrary bracket values, no <script>. (Editor CHROME may use
exact px values from docs/vvveb-ui-reference/tokens.json.)

UI FIDELITY: match VvvebJs using docs/vvveb-ui-reference/ (screenshots + tokens).
Build each editor region, then pass it through the screenshot-diff loop
(docs/diff-loop.md) until matchScore >= 0.97. Respect intendedDeltas.

IP RULE: reference repos in ../references are for UNDERSTANDING ONLY. Reimplement
patterns in our own code; never copy source verbatim. Do not copy Vvveb's name/logo.

STACK: TypeScript strict, React 18+, Tailwind + shadcn/ui, pnpm + Turborepo, tsup,
Vitest + Playwright. Keep package boundaries clean. Build package-by-package,
smallest first; point me at the exact docs/*.md for each task.
```

## `README.md` (draft)

```markdown
# Blocksmith

An agent-first, open-source visual page builder for React. Author pages by
hand in a Vvveb-style visual editor — or let an AI agent design beautiful
sections by writing JSX + Tailwind that compiles into an editable tree.

## Why
- **Agent-first:** the AI writes JSX + Tailwind (raw-React aesthetic ceiling),
  not coarse JSON blocks — so generated pages look hand-crafted.
- **Editable + safe:** that JSX lowers into a structured, serializable node tree
  you can edit visually and export back to clean React.
- **Vvveb-grade UI:** a familiar, polished editor experience, rebuilt on React +
  Tailwind + shadcn, powered by a headless Craft.js engine.
- **Library-first:** install the packages you need; the studio is just one consumer.

## Packages
| Package | Role |
| --- | --- |
| `@blocksmith/core` | schema, defineComponent, registry types |
| `@blocksmith/runtime` | headless `<Render>` for production sites |
| `@blocksmith/editor` | Craft.js Vvveb-style visual editor |
| `@blocksmith/components` | Tailwind + shadcn block library |
| `@blocksmith/studio` | optional standalone app |
| `@blocksmith/cli` | scaffold / export |

## Quickstart
pnpm install
pnpm dev

## License
Apache-2.0. Inspired by VvvebJs; see CREDITS.md and NOTICE.
```

## `CREDITS.md`

```markdown
# Credits

Blocksmith stands on the shoulders of excellent open-source work:

- **VvvebJs** (Apache-2.0) — UX inspiration for the visual editor and style manager.
- **Craft.js** (MIT) — the headless node-tree engine powering the editor.
- **shadcn/ui** (MIT) — the component primitives.
- **Tailwind CSS** (MIT) — the styling system.

Reference implementations were studied for patterns only; Blocksmith's code is
an original implementation.
```

## `NOTICE`

```
Blocksmith
Copyright (c) 2026 <your name / org>

This product includes design and UX inspiration from VvvebJs
(https://github.com/givanz/VvvebJs), licensed under the Apache License 2.0.
Where Vvveb styling/assets are reused, the original copyright is retained.
```

> Add the full **Apache-2.0** license text as `LICENSE` (copy from https://www.apache.org/licenses/LICENSE-2.0.txt).

## Build plan — parallel subagent waves

See [parallel-subagent-orchestration.md](./parallel-subagent-orchestration.md) for full orchestration.

**Wave 0 — freeze + scaffold (blocking, ~1 agent).**

1. [ ] Scaffold from this kit; `pnpm install`; commit; create `docs/` + `docs/contracts/`
2. [ ] `@blocksmith/core` — freeze `ElementNode`/`TextNode` types, `defineComponent`, `createConfig`, resolver + canonical `fixtures/`

**Wave 1 — fan out (4–5 agents in parallel).**

1. [ ] `@blocksmith/runtime` — headless `<Render>` + stateful Counter test
2. [ ] JSX→AST→tree pipeline — parse + validate + lower + codegen; round-trip test
3. [ ] Capture kit `docs/vvveb-ui-reference/` (shots + tokens.json)
4. [ ] `@blocksmith/editor` shell on Craft.js — canvas + selection
5. [ ] `@blocksmith/components` — first shadcn blocks

**Wave 2 — parallel (2–3 agents).**

1. [ ] Style Manager + screenshot-diff loop, gated to matchScore ≥ 0.97
2. [ ] Agent layer — system prompt + token contract + tools + vision loop

**Wave 3 — integrate.**

1. [ ] `@blocksmith/studio` wires packages; e2e + visual-regression in CI

## Setup checklist

- [ ] `git init` inside `blocksmith/`; create sibling `../references/` (gitignored)
- [ ] Paste all files above; `pnpm install`
- [ ] Add Apache-2.0 `LICENSE` text
- [ ] Export the Notion specs into `docs/` as Markdown
- [ ] Add `.cursor/rules/architecture.md`
- [ ] First commit; then start Phase 1
