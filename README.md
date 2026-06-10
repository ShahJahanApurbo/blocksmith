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
```bash
pnpm install
pnpm dev
```

## License
Apache-2.0. Inspired by VvvebJs; see CREDITS.md and NOTICE.
