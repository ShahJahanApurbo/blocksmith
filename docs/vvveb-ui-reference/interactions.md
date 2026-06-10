# Vvveb UI Interaction Spec

> Behavior extracted from `references/VvvebJs/libs/builder/builder.js`, `inputs.js`, and `scss/_builder.scss`. Apache-2.0 source: [VvvebJs](https://github.com/givanz/VvvebJs).

## Left palette (Blocks / Components / Sections)

### Tabs

- Three icon tabs in `#elements-tabs`: **Components**, **Blocks**, **Sections** (plus optional Styles tab when configured).
- Active tab: icon gets `background: rgba(var(--bs-primary-rgb), 0.08)` and `color: var(--bs-link-hover-color)`.
- Tab hover: icon border `1px solid rgba(var(--bs-link-color-rgb), 0.2)`.

### Search

- Search input filters palette items live on **keyup** via `data-search` attribute substring match.
- Matching items stay `display: ""`; non-matching items get `display: "none"`.
- Clear button (×) resets input and re-dispatches keyup.
- Focus shows clear button; focus border color `#80bdff`.

### Hover

- **Component tiles** (`li[data-type]` in Components tab): border shifts to primary tint, `box-shadow: 0px 0px 1px 0px var(--bs-primary)`, background `rgba(var(--bs-primary-rgb), 0.05)`, link text turns `var(--bs-primary)`. Cursor: `grab`.
- **Block/Section tiles**: border-color `var(--bs-link-color)`, box-shadow `0px 1px 5px 2px rgba(var(--bs-link-color-rgb), 0.25)`. Block name label becomes visible on hover.
- **Section list** (left panel sections manager): up/down/delete buttons hidden by default; visible on `.controls:hover`.

### Select / click

- Palette items are not "selected" in a persistent sense — they are **drag sources**.
- **Add section button** (+) on a section tile inserts that section into the canvas at the correct DOM position (after last matching tag, before footer, etc.) and selects the new node.
- Clicking **properties** on a section item triggers `node.click()` on the canvas equivalent.

### Drag/drop (palette → canvas)

- **Mousedown** (left button) on `li[data-drag-type]` in `.drag-elements-sidepane` starts drag.
- Drag type resolved from `data-drag-type`: `component` | `section` | `block`.
- During drag: selection overlays hidden; a floating **icon clone** (`#dragElement-clone`, 64×64px) follows the cursor outside the iframe.
- Inside iframe **mousemove**: drop position computed from cursor vs element center — inserts before/after/prepend/append based on block type and `noChildren` rules.
- Default placeholder while dragging: **3px lime-green line** (`Vvveb.dragHtml`) unless component provides `dragHtml`.
- On **mouseup** in iframe: real component HTML inserted (replacing placeholder), node selected, tree/breadcrumb updated, undo mutation recorded.
- Sections auto **scrollIntoView** after drop.

### Keyboard

- No palette-specific keyboard shortcuts.

---

## Canvas

### Hover

- **mousemove** on iframe body updates `#highlight-box` to hovered element bounds.
- Outline: `1px solid var(--bs-primary)` (`#0d6efd`).
- Transition: `all 0.05s`.
- `#highlight-name` label shows element type + tag name at top-left of box (primary bg, white text, 12px).
- Hidden when target has `contenteditable` attribute.
- **Section actions** (+) button shown at bottom-center of hovered element; moves outside (`bottom: -30px`) when element height < 50px.
- While dragging existing element: highlight border becomes `1px dashed #0d6efd`.
- Cursor: default (no explicit cursor change on hover).

### Select (click)

- **Single click** on iframe element calls `selectNode(target)`.
- `#select-box`: `1px solid var(--bs-primary)` border, `rgba(primary, 0.1)` fill.
- `#select-actions` toolbar anchored top-right of box (`top: -25px`), primary background; flips below element if top < 30px.
- Toolbar buttons (left → right):
  1. **Drag** (`#drag-btn`) — mousedown starts move
  2. **Select parent** (`#parent-btn`)
  3. **Move up** (`#up-btn`)
  4. **Move down** (`#down-btn`)
  5. **Edit HTML** (`#edit-code-btn`) — opens modal code editor
  6. **Translate** (`#translate-code-btn`) — optional i18n
  7. **Save reusable** (`#save-reusable-btn`)
  8. **Clone** (`#clone-btn`)
  9. **Delete** (`#delete-btn`)
- Resizable components: 8 resize handles (10×10px, primary border) on `#select-box.resizable`.
- **Breadcrumb** (`Vvveb.Breadcrumb`) updates to DOM ancestry path.
- **Tree list** expands parent checkboxes and highlights matching node.
- **Style Manager** right panel loads component properties via `loadNodeComponent`.
- Selecting `<body>` hides select-actions and add-section button.

### Drag/drop (canvas reorder)

- **Drag handle**: `#drag-btn` mousedown on selected element.
- Selected element gets `.is-dragged` (opacity 0.15, `pointer-events: none`) or moves as real element in designer mode.
- Drop target feedback: dashed primary border on highlight box; `#drop-highlight-box` styled in CSS (2px primary, 4px radius) but driven primarily by highlight-box during drag.
- Invalid drops: silently caught; no explicit error UI.
- On drop: undo `move` mutation recorded; tree + breadcrumb refreshed.

### Inline edit

- **Double-click** element enters WYSIWYG mode (if not already active).
- Target gets `contenteditable="true"`; `#select-box` adds `.text-edit` class (dashed neutral border, 10px padding).
- `#wysiwyg-editor` toolbar appears above element (bold, italic, underline, strike, link, colors, font size/family, justify).
- Formatting applies via `editorSetStyle` — inline styles on selection, live on each control **change/click**.
- **Commit**: selecting another element calls `WysiwygEditor.destroy()` which removes `contenteditable` and records undo `characterData` mutation comparing `oldValue` vs new `innerHTML`.
- **Enter** inside contenteditable: `insertLineBreak` (Shift+Enter behavior via execCommand), prevents default paragraph.
- Links disabled from navigating while editor active.

### Preview mode

- Toggles `Vvveb.Builder.isPreview`; adds `.preview` class to `#vvveb-builder`.
- Hides left/right panels; canvas spans full width.
- Hides `#iframe-layer` (selection overlays) via `d-none`.
- No click/select/hover interactions in preview.

---

## Style Manager (right panel)

### Structure

- Collapsible groups via hidden `input.header_check` + `label.header` + `.header-arrow` (Line Awesome angle icons).
- Groups start **collapsed** (`height: 0; opacity: 0`); checked checkbox expands with `0.5s` transition.
- Tab content scrolls vertically; padding `0.5rem 0`.

### Apply timing (per input type)

| Input type | Trigger event | Canvas update |
| --- | --- | --- |
| Text | `focusout` | On blur |
| Textarea | `keyup` | Live per keystroke |
| Checkbox | `change` | Immediate |
| Select | `change` | Immediate |
| Color | `change` | Immediate |
| Range + number | `change` | Immediate (syncs paired inputs) |
| CSS unit (number + unit select) | `change`, `keyup` | Live |
| Number | `change` | Immediate |
| Image URL | `focusout` (text), `change` (file) | On blur / file pick |

- All inputs dispatch `propertyChange` → `renderProperties` handler applies to selected element.
- **Style properties** (`htmlAttr: "style"`): written to `#vvvebjs-styles` stylesheet via `StyleManager.setStyle` — **immediate live preview** on canvas.
- **Class/attribute/content** changes also immediate; undo mutation recorded per change.
- Inline styles set by text editor take precedence over stylesheet until cleared.

### Responsive tabs (viewport)

- Topbar breakpoint buttons (`data-vvveb-action="viewport"`) set `StyleManager.currentBreakpoint`.
- Breakpoints: sm 575.98px, md 767.98px, lg 991.98px, xl 1199.98px, xxl 1399.98px.
- Clicking active breakpoint again resets to `"none"` (base styles).
- Canvas iframe wrapper width set to breakpoint value; `.responsive` class on `#canvas` at ≤md shows 767px centered frame.

### State tabs

- State selector calls `StyleManager.setState(value)` then `reloadComponent()`.
- Supported pseudo-states appended to CSS selector: e.g. `:hover`, `:focus`, `:active`.
- Empty state = normal/default.

---

## Top toolbar

### Layout controls

- **Toggle file manager / left column / right column**: show/hide panels.
- **Undo/Redo**: buttons + keyboard shortcuts.
- **Designer mode**: free absolute positioning of dragged elements.
- **Preview**: see Canvas section.
- **Fullscreen**: `launchFullScreen(document)`.
- **Show hidden**: toggles `.vvveb-hidden` class on iframe body.
- **Navigator (layers)**: `toggleTreeList()` — Ctrl+Shift+L.
- **Download**: exports HTML.
- **Dark mode**: toggles `data-bs-theme` on `<html>` (auto/light/dark).

### Viewport switch

- Dropdown under mobile icon: Mobile (sm), Tablet (md), Tablet landscape (lg), Laptop (xl), Desktop (xxl).
- Sets iframe wrapper width; toggles `.responsive` canvas class for sm/md.
- Active button gets `.active` class; click again to reset full width.

### Zoom

- `#zoom` input (10–100%, step 10) scales iframe via `zoomChange` action.

### Save

- **Ctrl+S** / Cmd+S: AJAX save to `data-vvveb-url`.
- Save button disabled after successful save until next edit.

---

## Layers / Navigator (`#tree-list`)

### Display

- Floating panel (default ~250×500px, resizable) or docked in left panel (300px height, vertical resize).
- Header draggable to reposition panel on canvas.
- Renders full DOM tree from iframe `<body>`.

### Select node

- Click `li[data-component] label`: scrolls to node, calls `selectNode` + `loadNodeComponent`, adds `.active` to label.
- Selecting in canvas: collapses all checkboxes, expands ancestor path, checks target, scrolls tree item into view.
- Hovering tree item dispatches `mousemove` on corresponding canvas node (triggers highlight box).

### Drag reorder

- **Section list** (bottom panel): HTML5 drag on `.section-item` — `drag-over` class (`2px dashed var(--bs-link-color)`) on target; drop reorders both list and DOM; undo `move` mutation.
- **Tree list**: no drag-reorder in source — click only.

### Expand/collapse

- Checkbox per branch; checked reveals child `<ol>` with `padding: 2rem 0 0 1.5rem`.

---

## Context menu

**VvvebJs does not implement a right-click context menu on canvas elements.** All element actions are exposed via the floating `#select-actions` toolbar and top/bottom panel controls. Blocksmith may add a context menu, but it is not a Vvveb reference behavior.

Equivalent actions available elsewhere:

| Action | Location |
| --- | --- |
| Delete | Select toolbar → trash icon |
| Duplicate | Select toolbar → clone icon |
| Move up/down | Select toolbar arrows |
| Edit HTML | Select toolbar code icon |
| Select parent | Select toolbar level-up icon |

---

## Keyboard shortcuts

| Action | Shortcut | Notes |
| --- | --- | --- |
| Save | Ctrl/Cmd + S | AJAX save |
| Undo | Ctrl/Cmd + Z | WYSIWYG undo if inline editor active, else global undo stack |
| Redo | Ctrl/Cmd + Shift + Z or Ctrl/Cmd + Y | Same WYSIWYG/global split |
| Toggle navigator | Ctrl/Cmd + Shift + L | Show/hide `#tree-list` |
| Toggle code editor | Ctrl/Cmd + E | Bottom panel HTML/CSS |
| New page | Ctrl/Cmd + Shift + P | |
| New section | Ctrl/Cmd + Shift + S | |
| Delete element | — | **No keyboard shortcut** — use toolbar delete button |
| Copy / Paste | — | **Not implemented** in Vvveb builder |
| Arrow nudge | — | **Not implemented** — use up/down toolbar buttons |
| Enter (inline edit) | Enter | Inserts line break inside contenteditable |

Shortcuts fire on both main document and iframe (after `vvveb.iframe.loaded`).
