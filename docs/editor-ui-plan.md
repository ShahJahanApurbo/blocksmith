# Editor UI Plan — VvvebJs UX on Craft.js

> [Notion source](https://app.notion.com/p/bfecc3b456114dfebf782f70ec0d3bb6)

**Reframe: Craft.js being headless is the *advantage*, not the catch.** You love VvvebJs's UI + customization — so you *want* to own the editor UI. Craft.js hands you the hard engine (node tree, drag-drop, serialization, history) and **no UI**, leaving you free to recreate Vvveb's exact experience.

## Why headless wins for your goals

| Concern | Puck (UI included) | Craft.js (headless) |
| --- | --- | --- |
| You love Vvveb's UI | Must override/fight Puck's opinionated UI | Build Vvveb's UI exactly, your way ✅ |
| Deep customization | Bounded by Puck's surface | Total control of every panel/interaction ✅ |
| Freeform "edit anything anywhere" | Typed component tree resists it | Generic primitive nodes → drop anything anywhere ✅ |
| Agent-first JSX pipeline | Built around registry-JSON authoring | Low-level tree fits the JSX→tree pipeline ✅ |
| Hard engine work (dnd, history, serialize) | Provided | Provided by Craft.js too ✅ |
| Editor UI work | Less upfront | You build it (the cost — but it's the UI you want) |

> **The honest tradeoff:** Craft.js means you build the editor UI yourself. But that UI *is* the thing you love about Vvveb and want to customize — so it's work you'd want to do regardless.

## VvvebJs UI, region by region → how to build it on Craft.js

| Vvveb UI region | What it does | Craft.js building blocks |
| --- | --- | --- |
| **Left — Blocks / Components / Sections palette** | Drag prebuilt blocks into the canvas; tabs + search | `useEditor().connectors.create(ref, <Element is={Prim} .../>)` on each palette item |
| **Center — true WYSIWYG canvas** | Live page, edit-anything, drop-anywhere | `<Frame>` in an iframe loading your Tailwind/shadcn CSS; `Prim` wrapper makes every tag a selectable, droppable canvas node |
| **Right — Style Manager + Properties** | Spacing, type, color, border, layout controls; raw code escape hatch | `useNode()` → `actions.setProp` writes Tailwind classes; token pickers; raw `className` field |
| **Top — toolbar** | Viewport switch, undo/redo, preview, code view, save | `useEditor()` → `actions.history.undo/redo`, `actions.setOptions({ enabled })`, `query.serialize()` |
| **Layers / Navigator tree** | body → section → element hierarchy with reorder | `query.getNodes()` + `actions.move()`; Craft has a Layers add-on to fork |
| **Context menu / element toolbar** | Duplicate, delete, move, wrap, drag handle | Custom `onRender` (RenderNode) overlay + `useEditor` actions |

## The Style Manager (the part you love most)

Vvveb's strength is editing *any element's* style visually with a code escape hatch. On Craft.js, every control simply **reads/writes the node's `className`**:

```typescript
function StyleManager() {
  const { actions, className, id } = useNode((n) => ({ className: n.data.props.className }))
  const setToken = (group: string, token: string) =>
    actions.setProp((p) => { p.className = applyToken(p.className, group, token, activeBreakpoint) })
  return (
    <Panel>
      <SpacingControl value={className} onChange={(t) => setToken("padding", t)} />
      <TypographyControl onChange={(t) => setToken("font", t)} />
      <ColorControl onChange={(t) => setToken("bg", t)} />
      <LayoutControl onChange={(t) => setToken("display", t)} />
      <RawClassField value={className} onChange={(c) => actions.setProp((p) => (p.className = c))} />
    </Panel>
  )
}
```

- **Per-breakpoint editing:** the active viewport sets the prefix (`sm:`/`md:`/`lg:`) so controls edit that breakpoint's classes.
- **Raw class + raw attribute fields** preserve Vvveb's "edit the code" freedom.

See [style-manager.md](./style-manager.md) for the full spec.

## Freeform "edit anything, anywhere"

- The `Prim` wrapper with `isCanvas: true` makes **every** primitive a droppable container → Vvveb's drop-anything-anywhere.
- Use Craft.js **rules** (`canMoveIn`, `canDrag`, `canMoveOut`) for sane constraints.
- True absolute positioning / arbitrary DOM is possible but costly — start with flow + flex/grid controls (covers ~95% of Vvveb's value), add freeform positioning later.

## Craft.js API cheat-sheet

```
<Editor resolver={resolver} onRender={RenderNode}>
  <Viewport>
    <Frame>
      <Element is={Prim} canvas tag="body" />
    </Frame>
  </Viewport>
</Editor>

useNode()   -> connectors.connect/drag, data.props, actions.setProp, selected
useEditor() -> connectors.create (palette), query.serialize/deserialize,
               actions.history.undo/redo, actions.selectNode, actions.delete,
               actions.setOptions({ enabled }), query.getNodes()
```

- Fork **Craft.js's official landing-page editor example** as your starting scaffold — it already wires up Frame, palette, settings panel, layers, and topbar; reskin it to Vvveb's layout.

## VvvebJs parity checklist

- [ ] Blocks / Components / Sections tabs with search
- [ ] Drag from palette → drop at any nesting depth
- [ ] Click-select any element + ancestor breadcrumb
- [ ] Style Manager (spacing / type / color / border / layout) writing Tailwind
- [ ] Raw className + raw attribute editing (code escape hatch)
- [ ] Inline rich-text editing on text nodes
- [ ] Element toolbar + right-click menu (duplicate / delete / move / wrap)
- [ ] Viewport switch with per-breakpoint classes (`sm:`/`md:`/`lg:`)
- [ ] Undo / redo, copy / paste
- [ ] Layers / navigator tree with drag-reorder
- [ ] Save / load (`query.serialize` / `deserialize`)
- [ ] Preview mode (`enabled: false`)
- [ ] Code view (your codegen) + import (your JSX→tree pipeline)

## Suggested UI build order

1. Canvas + select + element toolbar (the core feel)
2. Style Manager + raw class field (the part you love)
3. Blocks/Sections palette + drag-drop
4. Layers/navigator + context menu
5. Viewport switching + per-breakpoint classes
6. Code view + import (wire to the JSX pipeline) + save/load

## Open questions

- [ ] How far into **freeform absolute positioning** to go vs. flow + flex/grid only?
- [ ] Build the Style Manager controls from scratch or fork Craft's settings-panel example?
- [ ] Reuse Craft's Layers package or build a custom navigator to match Vvveb exactly?
