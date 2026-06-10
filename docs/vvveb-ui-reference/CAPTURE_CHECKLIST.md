# Vvveb UI Screenshot Capture Checklist

> **Viewport:** 1440×900 (fixed — record in every diff run)  
> **Source:** `references/VvvebJs/editor.html` via local server (`python3 -m http.server 8765`)  
> **Attribution:** VvvebJs Apache-2.0 — https://github.com/givanz/VvvebJs

## Captured automatically (Playwright, 2026-06-10)

| File | State | Status |
| --- | --- | --- |
| `shots/full-editor.png` | Default layout, nothing selected | ✅ Captured |
| `shots/full-editor--dark.png` | Dark mode (after toggling `data-bs-theme`) | ✅ Captured |
| `shots/palette.png` | Left palette, default Components tab | ✅ Captured |
| `shots/palette--blocks.png` | Blocks tab active | ✅ Captured |
| `shots/palette--search.png` | Search input active with filter text | ✅ Captured |
| `shots/canvas--hover.png` | Element hover outline | ✅ Captured |
| `shots/canvas--selected.png` | Element selected + toolbar | ✅ Captured |
| `shots/canvas--mobile-viewport.png` | Mobile (sm) breakpoint active | ✅ Captured |
| `shots/inline-text-edit.png` | Double-click inline WYSIWYG active | ✅ Captured |
| `shots/style-manager.png` | Right panel default (collapsed groups) | ✅ Captured |
| `shots/topbar.png` | Top toolbar default | ✅ Captured |
| `shots/topbar--preview.png` | Preview mode (panels hidden) | ✅ Captured |
| `shots/layers.png` | Navigator / tree-list panel | ✅ Captured |

## Still needed — manual capture required

These states need human interaction or mid-drag timing that automation missed. Capture at **1440×900** and save to `shots/`.

### Left palette

- [ ] **`palette--sections.png`** — Sections tab active, scroll to show section thumbnails
- [ ] **`palette--components-expanded.png`** — Components tab with a group header expanded (click `label.header`)

### Canvas

- [ ] **`canvas--drag-over.png`** — Mid-drag from palette: lime-green 3px drop line visible inside iframe (hold mousedown on component tile, drag over canvas, screenshot before mouseup)
- [ ] **`canvas--empty.png`** — Fresh blank page (`new-page-blank-template.html`) with no content selected
- [ ] **`canvas--with-content.png`** — Demo page with multiple sections visible (no selection)
- [ ] **`canvas--resize-handles.png`** — Select a resizable component (image/column) so 8 resize handles appear on `#select-box`

### Style Manager

- [ ] **`style-manager--typography.png`** — Expand Typography group (or select text element so typography props show)
- [ ] **`style-manager--layout.png`** — Layout group expanded
- [ ] **`style-manager--spacing.png`** — Spacing group expanded
- [ ] **`style-manager--background.png`** — Background group expanded
- [ ] **`style-manager--border.png`** — Border group expanded
- [ ] **`style-manager--effects.png`** — Effects group expanded (shadow, opacity)
- [ ] **`style-manager--position.png`** — Position group expanded
- [ ] **`style-manager--collapsed.png`** — All groups collapsed (baseline — may match `style-manager.png`)
- [ ] **`style-manager--hover-state.png`** — State tab set to `:hover` with a property visible

### Top toolbar

- [ ] **`topbar--tablet-viewport.png`** — Tablet (md) breakpoint active (open Breakpoints dropdown → Tablet view)
- [ ] **`topbar--desktop-viewport.png`** — Desktop (xxl) breakpoint active
- [ ] **`topbar--code-editor.png`** — Bottom panel expanded (Ctrl+E) showing HTML code tab

### Layers / Navigator

- [ ] **`layers--collapsed.png`** — Tree with all branches collapsed
- [ ] **`layers--expanded.png`** — Tree fully expanded showing nested DOM
- [ ] **`layers--node-selected.png`** — Tree item highlighted after canvas selection (`.active` label)

### Context menu

- [ ] **`context-menu.png`** — **N/A for Vvveb** — source has no right-click context menu. Skip unless Blocksmith adds one (then capture Blocksmith's menu, not Vvveb's).

### Inline editing

- [ ] **`inline-text-edit--toolbar.png`** — Crop of `#wysiwyg-editor` toolbar only (bold/italic/color controls visible)

### Dark + light

- [x] Light mode covered by `full-editor.png`
- [x] Dark mode covered by `full-editor--dark.png`
- [ ] **`palette--dark.png`** — Left palette in dark mode (crop)
- [ ] **`style-manager--dark.png`** — Right panel in dark mode (crop)

## Capture procedure (manual)

1. Start server: `cd references/VvvebJs && python3 -m http.server 8765`
2. Open `http://localhost:8765/editor.html` in Chrome
3. Set window to exactly **1440×900** (DevTools → device toolbar off, resize OS window, or use Playwright)
4. Wait for iframe page load (~2–3s)
5. Perform the state action from the checklist row
6. Screenshot:
   - **Full editor:** entire window
   - **Region crops:** palette `0,35 → 300×865`; canvas `300,35 → 840×830`; style manager `1140,35 → 300×865`; topbar `0,0 → 1440×35`
7. Save PNG to `blocksmith/docs/vvveb-ui-reference/shots/<filename>`

## Diff-loop alignment

When running screenshot diff (see [diff-loop.md](../diff-loop.md)):

- Always use the same 1440×900 viewport
- Crop regions must match the pixel boxes above
- For hover/selected/drag states, ensure the same demo page (`editor.html` default load) is used
