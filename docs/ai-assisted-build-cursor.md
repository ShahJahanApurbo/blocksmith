# AI-Assisted Build in Cursor — Context & License Strategy

> [Notion source](https://app.notion.com/p/22ba0f214cf0415982158f6f25c56357)

**The model:** the reference repos (VvvebJs, Craft.js, Puck, GrapesJS) are **read-only context** for the AI — cloned locally, *never committed, never published*. Cursor's AI writes your implementation guided by the spec docs. You publish **only your new repo**.

## Workspace layout: one folder you publish, one you don't

```
blocksmith-workspace/            # your Cursor workspace (NOT a repo itself)
├─ blocksmith/                   # ✅ THE repo you publish (git init here)
│  ├─ packages/ (core, runtime, editor, components, studio, cli)
│  ├─ docs/                      # the spec docs, committed = permanent AI context
│  ├─ .cursor/rules/             # project rules that steer every AI edit
│  ├─ AGENTS.md
│  └─ LICENSE  (MIT)
└─ references/                   # ❌ read-only context, gitignored, never published
   ├─ VvvebJs/      (Apache-2.0)
   ├─ craft.js/     (MIT)
   ├─ puck/         (MIT)
   └─ grapesjs/     (BSD/MIT)
```

- Open the **whole workspace** in Cursor so the AI can read `references/` for patterns, but `git init` lives **only** inside `blocksmith/`.
- `references/` is outside the repo entirely → it can never accidentally be committed or published.

## Cursor context strategy

1. **Clone references locally** into `../references/`. Point Cursor at them with `@folder` / `@file` when you want a specific pattern.
2. **Commit the spec docs** into `blocksmith/docs/` (these Notion exports). Committed docs = durable, in-repo context the AI always sees.
3. **Author `.cursor/rules`** encoding the architecture decisions so *every* AI edit obeys them.
4. **Index references as Cursor "Docs"** if you want the AI to search them semantically, while keeping them outside the repo.
5. **Reference, don't paste:** prompt the AI to *learn the pattern* from a reference and *reimplement*, not copy lines.

## Sample `.cursor/rules/architecture.md`

```
You are building Blocksmith, an agent-first React page builder. Obey:

ENGINE: Craft.js (headless) is the node-tree engine. Build a custom Vvveb-style
UI on top (see docs/editor-ui-plan.md). Do NOT add Puck as a dependency.

DATA MODEL: pages are an ElementNode tree (docs/pipeline-spec.md). Primitives are
any allowlisted HTML tag via the `Prim` wrapper; smart components are registered
in the resolver. The tree is JSON-serializable and isomorphic to JSX.

AI AUTHORING: page generation = JSX+Tailwind -> AST -> validated tree (never
registry-JSON). Styling is Tailwind tokens only (docs/token-contract.md); no
inline styles, no arbitrary bracket values, no <script>.

IP RULE: reference repos in ../references are for UNDERSTANDING ONLY. Reimplement
patterns in our own code; never copy source verbatim. If unsure, ask.

STACK: TypeScript strict, React 18+, Tailwind + shadcn/ui, pnpm + Turborepo,
tsup builds, Vitest + Playwright. Keep package boundaries clean.
```

## License & IP hygiene

All four references are **permissive**, so building on the *ideas* is fully fine. The risk is **copying source verbatim**.

| Repo | License | If you COPY code | If you REIMPLEMENT (clean-room) |
| --- | --- | --- | --- |
| Craft.js | MIT | Keep the MIT copyright notice in that file | No obligation ✅ |
| Puck | MIT | Keep MIT notice | No obligation ✅ |
| GrapesJS | BSD/MIT | Keep notice + no-endorsement clause | No obligation ✅ |
| VvvebJs | Apache-2.0 | Keep NOTICE + state changes + patent terms | No obligation ✅ |

> **Cleanest path: clean-room reimplementation.** Let the AI *read* the references to understand patterns, then write **original** code. This keeps your repo a clean **MIT** project with no inherited NOTICE/attribution files.

### The VvvebJs UI specifically

Vvveb's UI is **vanilla JS + Bootstrap + HTML templates**. Your editor is **React + Tailwind + Craft.js** — a fundamentally different paradigm, so there is **no working copy-paste path**.

What's safe vs. what to avoid:

- ✅ **Emulate the UX & layout** — panel arrangement, where the style manager sits, the drag-drop feel.
- ❌ **Don't copy** their CSS, HTML template strings, icon/image assets, or the **Vvveb name/logo**.

> **Cleanest move: don't feed Vvveb's *source* to the AI for UI work at all.** Build from [editor-ui-plan.md](./editor-ui-plan.md) + annotated screenshots of Vvveb, not from its source.

**Practical guardrails so the AI doesn't copy:**

- Put the **IP RULE** in `.cursor/rules` — "reimplement, never copy verbatim."
- Review AI diffs for suspiciously verbatim blocks (variable names, comments lifted from a ref).
- Don't paste large reference files into the editor and say "adapt this" — instead describe the behavior you want.
- Keep `references/` **gitignored** so nothing leaks into your published history.
- Add a courtesy **`CREDITS.md`** ("Inspired by VvvebJs; built on Craft.js").
- Your repo ships a single **`LICENSE`** (MIT or Apache-2.0); Craft.js is a runtime dependency, not vendored source.

## The Cursor build loop

```
1. Scaffold monorepo + .cursor/rules + docs/  (commit)
2. AI generates @blocksmith/core (schema, defineComponent, resolver types)
3. AI generates @blocksmith/runtime (headless <Render>)  -> test
4. AI generates the JSX->AST->tree pipeline (docs/pipeline-spec.md) -> test round-trip
5. AI generates @blocksmith/editor UI on Craft.js (docs/editor-ui-plan.md),
   region by region: canvas+select -> style manager -> palette -> layers -> viewports
6. AI wires the agent loop + token contract + vision critique (later phase)
7. Review diffs, run Vitest/Playwright, iterate
```

- Build **package by package**, smallest first — the AI does better with narrow, well-specified scope than "build the whole thing."
- Each package's spec doc is its context; point the AI at the exact `docs/*.md` for the task.

## Checklist

- [ ] Workspace split: `blocksmith/` (repo) + `references/` (gitignored, local only)
- [ ] Reference repos cloned locally for context, never committed
- [ ] Spec docs exported to `blocksmith/docs/` and committed
- [ ] `.cursor/rules` encodes engine + data model + IP rule
- [ ] AI instructed to reimplement, not copy; diffs reviewed for verbatim lifts
- [ ] Single `LICENSE` (MIT or Apache-2.0) + courtesy `CREDITS.md`
- [ ] Craft.js used as an installed dependency, not vendored source
- [ ] Build package-by-package with the matching spec doc as context
