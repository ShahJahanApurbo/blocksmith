# Vvveb UI Capture Kit — Spec

> [Notion source](https://app.notion.com/p/8842dacc983e49a2ad9cdbeee7581d28)

The **design spec the AI builds from** — screenshots + extracted tokens + interaction notes — so it reproduces Vvveb's exact look without guessing. Decision baked in: **reimplement in React (Path A)**, **Apache-2.0** (so you may also lift Vvveb's actual CSS values directly, with attribution).

## What this is (and why)

The AI can only match Vvveb's polish if it has a precise target. This kit turns "make it like Vvveb" into measured, referenceable artifacts the AI consumes per editor region.

```
docs/vvveb-ui-reference/
├─ shots/                # golden screenshots (the diff targets)
│  ├─ palette.png
│  ├─ style-manager.png
│  ├─ style-manager--typography.png
│  ├─ canvas--selected.png
│  ├─ canvas--hover.png
│  ├─ topbar.png
│  ├─ layers.png
│  └─ context-menu.png
├─ tokens.json          # extracted design tokens
├─ interactions.md      # behavior spec per region
└─ mapping.md           # Vvveb/Bootstrap -> Tailwind token mapping
```

## 1. Screenshot capture list (the diff targets)

Capture each at a **fixed window size** (record it, e.g. 1440×900) so the diff loop can align. Include every interactive state.

- [ ] **Full editor** — default layout, nothing selected
- [ ] **Left palette** — Blocks tab, Components tab, Sections tab, search active
- [ ] **Canvas** — empty, with content, element **hover** outline, element **selected** outline + toolbar, **drag-over** drop indicator
- [ ] **Right Style Manager** — collapsed + each control group expanded (layout, spacing, typography, background, border, effects, position)
- [ ] **Top toolbar** — default, each viewport mode active (mobile/tablet/desktop), preview mode
- [ ] **Layers / Navigator** — collapsed + expanded tree, node selected
- [ ] **Context menu** — right-click on an element
- [ ] **Inline text editing** active
- [ ] **Dark + light** if Vvveb has both

## 2. Token extraction → `tokens.json`

Pull **computed styles** from Vvveb's running UI (DevTools → Computed) for each region. Capture exact values:

- Panel widths/heights, gaps, paddings, margins
- Font family, sizes, weights, line-heights, letter-spacing
- Colors (bg, text, border, accents) as hex/hsl
- Border widths, styles, radii
- Shadows, opacity, z-index
- Icon sizes, control heights (inputs, buttons)
- Transition durations/easings

```json
{
  "layout": {
    "leftPanelWidth": "240px",
    "rightPanelWidth": "280px",
    "topbarHeight": "48px",
    "panelBg": "#f5f5f5",
    "panelBorder": "1px solid #e0e0e0"
  },
  "controls": {
    "inputHeight": "32px",
    "fontSize": "13px",
    "labelColor": "#6b7280",
    "radius": "4px"
  },
  "canvas": {
    "selectOutline": "2px solid #2563eb",
    "hoverOutline": "1px dashed #93c5fd",
    "toolbarBg": "#2563eb"
  }
}
```

- These become your **Tailwind theme extensions** (custom spacing/colors) so generated classes hit the exact values — measurement-accurate, not eyeballed.

## 3. Interaction spec → `interactions.md`

Screenshots capture *look*; this captures *behavior*. Per region, document:

- **Hover:** outline style, cursor, any toolbar reveal
- **Select:** outline, toolbar buttons (move/duplicate/delete/drag), breadcrumb update
- **Drag/drop:** drag handle, drop indicator line, valid/invalid target feedback
- **Style Manager:** does a control apply on change or on blur? live canvas update?
- **Inline edit:** double-click to edit text, what commits it
- **Keyboard:** delete, copy/paste, undo/redo, arrow nudge
- **Context menu:** items + order

## 4. Vvveb (Bootstrap) → Tailwind mapping → `mapping.md`

Vvveb styles with Bootstrap; you emit Tailwind. Pre-build the translation so the AI is consistent.

| Vvveb / Bootstrap | Tailwind equivalent |
| --- | --- |
| `.row` / `.col-*` | `grid grid-cols-12` / `col-span-*` (or flex) |
| `.btn .btn-primary` | shadcn `<Button>` (default variant) |
| `.form-control` | shadcn `<Input>` |
| `.card` | `rounded-lg border bg-card shadow-sm` |
| `.p-3` (1rem) | `p-4` |
| panel `13px` label | `text-[13px]` allowed *here* (chrome, not content) or theme token `text-xs` |

> The editor **chrome** (panels/toolbars) can use exact pixel values from `tokens.json` — the strict "no arbitrary values" rule applies to **generated page content**, not your own editor UI. So you can match Vvveb's `13px` labels and `240px` panels precisely.

## How the AI consumes the kit

- Each editor-region build task is prompted with: its **screenshot** (`shots/style-manager.png`) + the relevant **token slice** + the region's **interaction notes**.
- Output is then run through the **screenshot-diff loop** against that same screenshot until it matches.

See [diff-loop.md](../diff-loop.md) for the matching loop spec.

## Checklist

- [ ] All region screenshots captured at a recorded fixed size, including states
- [ ] `tokens.json` filled from computed styles
- [ ] `tokens.json` mapped into the Tailwind theme
- [ ] `interactions.md` documents behavior per region
- [ ] `mapping.md` Bootstrap→Tailwind translation table
- [ ] Kit committed under `docs/vvveb-ui-reference/` (Apache-2.0 attribution noted in NOTICE)
