# Naming + npm / GitHub Setup

> [Notion source](https://app.notion.com/p/8f75efc4687a417d945221fa5e834923)

A distinct brand (don't reuse "Vvveb" — trademark/confusion risk), an npm scope, a GitHub org, and the repo hygiene needed for a credible open-source launch.

## Naming criteria

- Short, pronounceable, memorable; evokes *blocks / building / visual / canvas*.
- **npm scope available** (`@name/*`) and **GitHub org available**.
- `.com`/`.dev` ideally free; no trademark clash with Puck, Plasmic, Builder, Webflow, etc.
- Avoids "Vvveb" entirely.

## Name candidates

| Name | Angle | Package scope idea |
| --- | --- | --- |
| **Blocksmith** | Crafting blocks; strong, dev-friendly | `@blocksmith/core` |
| **Tailbrick** / **Brickwind** | Tailwind + bricks/blocks mashup | `@tailbrick/core` |
| **Shapeshift / Shadbuild** | shadcn-forward identity | `@shadbuild/core` |
| **Canvasly / Kanvas** | Visual canvas focus | `@kanvas/core` |
| **Plyne / Veil / Lattice** | Short, abstract, brandable | `@lattice/core` |
| **Forge UI / UIForge** | Building UI; "forge" = open-source vibe | `@uiforge/core` |

> **Lean pick: "Blocksmith"** — reads as a dev tool, fits the blocks/sections mental model from Vvveb, and pairs naturally with shadcn's "craft" vibe. Confirm npm + GitHub + domain availability before committing.

### Availability checklist (do before announcing)

- [ ] `npm org` / scope free (search npmjs.com)
- [ ] GitHub org handle free
- [ ] Domain (`.dev` is plenty for OSS)
- [ ] Quick trademark sweep (USPTO/EUIPO + plain Google)
- [ ] Social handle (X/Bluesky) if you'll market it

## Repository layout (monorepo)

```
blocksmith/
├─ package.json            # pnpm workspaces root, private
├─ pnpm-workspace.yaml
├─ turbo.json
├─ tsconfig.base.json
├─ .changeset/             # versioning & changelogs
├─ .github/
│  ├─ workflows/ci.yml     # lint + typecheck + test + build
│  ├─ workflows/release.yml# changesets -> npm publish
│  ├─ ISSUE_TEMPLATE/
│  └─ PULL_REQUEST_TEMPLATE.md
├─ packages/
│  ├─ core/                # schema, defineComponent, createConfig
│  ├─ runtime/             # headless <Render>
│  ├─ editor/              # visual editor (or Puck adapter)
│  ├─ components/          # Tailwind + shadcn block library
│  └─ cli/                 # scaffold / export
├─ apps/
│  ├─ docs/                # Next.js docs site (dogfoods the builder)
│  └─ studio/              # optional standalone app
├─ examples/
│  └─ nextjs-starter/
├─ LICENSE                 # Apache-2.0 or MIT
├─ NOTICE                  # if keeping any Apache-2.0 code
├─ README.md
├─ CONTRIBUTING.md
├─ CODE_OF_CONDUCT.md
└─ SECURITY.md
```

## Tooling baseline

| Concern | Tool |
| --- | --- |
| Package manager / workspaces | pnpm |
| Task runner / caching | Turborepo |
| Versioning + changelogs + publish | Changesets |
| Build (libraries) | tsup (or Vite lib mode) |
| Lint / format | ESLint + Prettier (or Biome) |
| Unit tests | Vitest |
| E2E (editor) | Playwright |
| CI/CD | GitHub Actions |

## License decision

- If you **adopt Puck** (MIT) and **don't** copy VvvebJs code → ship under **MIT** (simplest, most permissive).
- If you **do** keep any VvvebJs (Apache-2.0) code → use **Apache-2.0**, retain original copyright + `NOTICE`, and document changes.
- Don't mix: pick one top-level license and ensure deps are compatible.

## First-week setup checklist

- [ ] Reserve name (npm scope + GitHub org + domain)
- [ ] `pnpm init` monorepo + workspaces + Turbo + base tsconfig
- [ ] Scaffold `packages/core` and `packages/runtime` (per the MVP spec)
- [ ] Add Changesets + CI (lint/typecheck/test/build) + release workflow
- [ ] Decide MIT vs Apache-2.0; add LICENSE (+ NOTICE if needed)
- [ ] Stub README with the vision + quickstart
- [ ] Push a public repo; tag nothing until the engine MVP passes its acceptance test
