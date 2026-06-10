# Style Manager Spec — Match Vvveb

> [Notion source](https://app.notion.com/p/3fa2632643224196b932140a39085322)

The right-hand **Style Manager** — Vvveb's signature panel and the part you love most. Here it edits *any* selected node's Tailwind `className` via visual controls, with a raw-class escape hatch and per-breakpoint + state editing. Built on Craft.js (`useNode` → `setProp`), styled to match Vvveb via the capture kit + diff loop.

## Panel layout (mirrors Vvveb's grouped accordion)

Collapsible sections, in Vvveb order:

1. **Layout** — display, flex/grid, direction, justify/align, gap, wrap
2. **Spacing** — padding + margin (box-model widget)
3. **Size** — width/height, min/max, overflow
4. **Typography** — font size, weight, line-height, letter-spacing, align, color, transform, decoration
5. **Background** — color (token), gradient, image
6. **Border** — width, style, color, radius (per-side)
7. **Effects** — box-shadow, opacity, blur
8. **Position** — static/relative/absolute, inset, z-index
9. **Transitions** — property, duration, easing
10. **Raw** — raw `className` textarea + raw attribute editor (the code escape hatch)

## Each control writes Tailwind tokens

| Group | Control UI | Writes |
| --- | --- | --- |
| Display | Segmented buttons | `block` `flex` `grid` `inline-flex` `hidden` |
| Flex align | Icon grid (justify × align) | `justify-*` `items-*` |
| Gap/Padding/Margin | Box-model widget + scale slider | `gap-*` `p*-*` `m*-*` (scale: 0–32) |
| Width/Height | Input + unit toggle (px/%/auto/full) | `w-*` `h-*` `max-w-*` `min-h-*` |
| Font size/weight | Dropdowns (type scale) | `text-*` `font-*` |
| Text color / Background | Token swatch picker (shadcn tokens) + custom | `text-*` `bg-*` (token names) |
| Border | Width/style/color + per-side radius | `border` `border-*` `rounded-*` |
| Shadow/Opacity | Dropdown + slider | `shadow-*` `opacity-*` |
| Position | Segmented + inset inputs | `relative` `absolute` `inset-*` `z-*` |

## The class-string engine (the core utility)

Every control routes through one utility that **adds/replaces/removes** a token while resolving conflicts (only one `display`, one `bg-*`, etc.), and applies the active **breakpoint** + **state** prefix.

```typescript
type Ctx = { breakpoint: "" | "sm" | "md" | "lg" | "xl"; state: "" | "hover" | "focus" | "active" }

const CONFLICTS: Record<string, RegExp> = {
  display: /^(block|flex|grid|inline-flex|hidden|inline)$/,
  bg:      /^bg-/,
  textColor:/^text-(?!xs|sm|base|lg|xl|\dxl|left|center|right)/,
  fontSize:/^text-(xs|sm|base|lg|xl|\dxl)$/,
}

function setToken(className: string, group: string, token: string | null, ctx: Ctx): string {
  const prefix = [ctx.breakpoint, ctx.state].filter(Boolean).join(":")
  const full = token ? (prefix ? `${prefix}:${token}` : token) : null
  const rx = CONFLICTS[group]
  const kept = className.split(/\s+/).filter(Boolean).filter((c) => {
    const base = c.replace(/^[a-z]+:/g, "")
    const samePrefix = c.startsWith(prefix ? prefix + ":" : "") && !c.includes(":") === !prefix
    return !(rx.test(base) && samePrefix)
  })
  return [...kept, full].filter(Boolean).join(" ")
}
```

```typescript
function useStyle() {
  const { className, actions } = useNode((n) => ({ className: n.data.props.className ?? "" }))
  const { ctx } = useStyleContext()
  const apply = (group: string, token: string | null) =>
    actions.setProp((p) => { p.className = setToken(p.className ?? "", group, token, ctx) })
  return { className, apply }
}
```

## Reading values back (populate controls)

Controls must reflect the selected node's current classes:

- Parse `className`, strip the active `breakpoint:state:` prefix, and match each control's group regex to find the active token.
- Show **inherited** base value (greyed) when no token exists at the current breakpoint — Vvveb-style responsive clarity.

## Per-breakpoint + state toolbar

A small header in the panel (like Vvveb's responsive tabs):

```
[ Base ][ sm ][ md ][ lg ][ xl ]      <- sets ctx.breakpoint
[ Normal ][ Hover ][ Focus ][ Active ] <- sets ctx.state
```

- Editing at `md` writes `md:` classes; editing Hover writes `hover:` (or `md:hover:`).
- This gives full responsive + interaction styling visually — a modern upgrade over Vvveb while keeping its feel.

## Box-model widget (Vvveb-style spacing editor)

- Classic nested padding/margin box with editable values on each side.
- Each side maps to `pt-/pr-/pb-/pl-` and `mt-/mr-/mb-/ml-` on the Tailwind scale.
- Drag-to-change or type; `Alt` to set all sides; `Shift` for axis (`px-/py-`).

## Raw escape hatch

- **Raw className** textarea: full freedom, two-way bound (edits reflect in controls).
- **Raw attributes** editor: `id`, `href`, `aria-*`, etc.
- Preserves Vvveb's "edit the code" power for advanced users.

## Declarative control config (so the panel is data-driven)

```typescript
interface ControlGroup {
  id: string; label: string
  controls: Array<{
    kind: "segmented" | "dropdown" | "slider" | "colorToken" | "boxModel" | "input"
    group: string
    label: string
    options?: Array<{ label: string; token: string }>
  }>
}
// The whole Style Manager renders from an array of ControlGroup -> easy to extend/match Vvveb exactly.
```

## Acceptance checklist

- [ ] All groups present in Vvveb's order; panel diff-matches `style-manager.png`
- [ ] Every control writes correct Tailwind tokens via the class-string engine
- [ ] Conflicts resolved (no duplicate `display`/`bg-*`/font-size)
- [ ] Controls populate from the selected node's current `className`
- [ ] Per-breakpoint + state prefixing works (`md:`, `hover:`, `md:hover:`)
- [ ] Box-model widget edits padding/margin per side
- [ ] Raw className + attribute escape hatches, two-way bound
- [ ] Live canvas updates on change (via Craft `setProp`)
