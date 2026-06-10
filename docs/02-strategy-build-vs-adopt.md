# Strategy — Build vs Adopt & Keep vs Rewrite

> [Notion source](https://app.notion.com/p/1e952c0a850a452ca1078de46d82ad6a)

## Headline finding

The thing you want to build mostly *already exists* in **Puck** (`puckeditor/puck`, **MIT** licensed). Puck is a registry-driven React visual editor whose data model is a JSON component tree, whose `fields` map to component props, and which already supports iframe viewports, nested drop zones (Slots API), dynamic props, and React Server Components.

So the real strategic question isn't "how do I rebuild VvvebJs in React" — it's **"do I adopt Puck as the engine and differentiate on Tailwind/shadcn + UX, or build my own engine?"**

## Decision update (supersedes Puck recommendation)

Two later requirements changed the calculus:

1. **Agent-first beautiful output** — the AI must author JSX/Tailwind, not coarse registry-JSON (Puck's AI ceiling is the deal-breaker)
2. You want **VvvebJs's UI + deep customization + freeform edit-anything**

Both point to **Craft.js** (headless engine) with a **custom Vvveb-style UI** you own. Puck's bundled UI would have to be fought to become Vvveb-like.

**The chosen path is Craft.js + custom UI.** See [editor-ui-plan.md](./editor-ui-plan.md) and [agent-first.md](./agent-first.md).

## Two decisions, and they're linked

1. **Keep vs Rewrite** — do we reuse VvvebJs's actual code, or start clean?
2. **Build vs Adopt** — if clean, do we build our own editor engine or stand on an existing React engine (Puck / Craft.js)?

They collapse into a single recommendation below.

## Decision 1 — Keep vs Rewrite VvvebJs

| Option | Pros | Cons | Verdict |
| --- | --- | --- | --- |
| Keep VvvebJs code | Battle-tested editor UX; instant feature parity | Vanilla-JS + iframe DOM manipulation clashes with React; Bootstrap baked in | ❌ Reject |
| Clean rewrite, borrow UX only | React-native data model; Tailwind/shadcn from day one; no legacy debt | More upfront work; lose Vvveb's mature editor internals | ✅ Prefer |

> **Recommendation:** Do **not** port VvvebJs's code. Keep VvvebJs as *UX inspiration* and build on a React-native data-tree foundation.

## Decision 2 — Build your own engine vs Adopt Puck / Craft.js

| Option | License | What you get | What you'd still build | Effort |
| --- | --- | --- | --- | --- |
| **Adopt Puck** | MIT | Registry config, JSON model, fields→props, iframe viewports, Slots/nesting, dynamic props, RSC, drag-drop across iframes | Tailwind/shadcn component lib + shadcn adapter, opinionated studio, export, your branding | Low–Med |
| Build on **Craft.js** | MIT | Low-level node tree, drag-drop, serialization; you design 100% of the UI | The entire editor UI, fields system, viewports, persistence, components | High |
| Build on **GrapesJS** | MIT/BSD | Very mature editor; but framework-agnostic / DOM-based | A React bridge — fights the React-component goal | High + impedance mismatch |
| **Build from scratch** | — | Total control; pure vision | Literally everything (dnd-across-iframes is the hard part) | Very high |

> Verify licenses yourself before committing: Puck core = MIT, Craft.js = MIT, GrapesJS = BSD-3-clause/MIT.

## How Puck maps to your exact requirements

| Your requirement | Puck status |
| --- | --- |
| Modern stack (not vanilla JS) | ✅ React + TS |
| Use as a React library, not standalone | ✅ Embeddable `<Puck/>` editor + headless `<Render/>` |
| Users register their own components | ✅ The whole model is a component `config` registry |
| Runtime supports interactivity w/o runtime changes | ✅ Components are real React components |
| Tailwind + shadcn | ⚠️ Not built-in — **this is your differentiation** |
| Responsive viewports | ✅ Same-origin iframe viewport switching (v0.14+) |
| Nesting / sections | ✅ Slots API (v0.19+) |

## Recommended path (historical — superseded)

> **Adopt Puck as the editor + runtime engine.** Differentiate by building the layer Puck deliberately leaves open: a first-class Tailwind + shadcn component system, a shadcn adapter, opinionated theming/token editing, and a polished studio + export pipeline.

**Why this wins:**

- Ship in **weeks, not quarters** — hardest parts (drag-drop across iframes, viewport simulation, serialization, undo/redo) are solved.
- Your unique value is exactly where Puck is intentionally unopinionated.

**The one real tradeoff:** you inherit Puck's data model and API evolution.

## When you'd build your own engine instead

Choose Craft.js / from-scratch only if you need something Puck structurally can't give you:

- **Truly freeform, absolute-positioned, edit-any-DOM-node** editing (Vvveb's "anything anywhere")
- A radically different canvas interaction model or in-canvas code editing as a first-class mode

If freeform DOM editing is a hard requirement, Craft.js is the better foundation — at materially higher cost.

## Open questions to settle before coding

- [ ] Is a **typed component tree** (Puck) acceptable, or do you require Vvveb-style **freeform any-element** editing?
- [ ] Do you want to **contribute the Tailwind/shadcn layer back to Puck** as an ecosystem package, or keep it as your own branded product?
- [ ] Commercial intent later (hosted studio)? Affects how much you couple to Puck internals.
