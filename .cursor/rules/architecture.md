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
