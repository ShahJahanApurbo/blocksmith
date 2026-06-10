# Core + Runtime MVP — Technical Spec

> [Notion source](https://app.notion.com/p/8d8a9f08ac42420fb96c8be6c97edbe4)

Cursor-ready spec for the **engine MVP**: the document schema, the component-definition API, the registry/config, and the headless runtime `<Render/>`. Written so it's valid whether you **adopt Puck** (in which case treat this as the adapter/typing layer + your component conventions) or **build the engine yourself**.

## Goals of the MVP

1. Define a serializable **document schema** (JSON component tree).
2. Define a **component-definition API** (`defineComponent`) that bundles the React render fn + editable-field metadata + defaults.
3. Define a **registry/config** that collects components by `type`.
4. Ship a **headless renderer** that turns `(config, data)` into a live React tree — with **zero renderer changes needed to add components**.
5. Prove **dynamic interactivity** with one stateful component (e.g. a Tabs or Counter block using `useState`).

**Non-goals for MVP:** the editor UI, persistence backends, export pipeline (separate specs).

## 1. Document schema

```typescript
// packages/core/src/types.ts

/** A single node in the page tree. `type` is the registry key. */
export interface ComponentNode {
  type: string
  props: {
    /** Stable unique id; used for selection, keys, and slot targeting. */
    id: string
    [key: string]: unknown
  }
  /** Optional named slots -> arrays of child nodes (nesting). */
  slots?: Record<string, ComponentNode[]>
}

export interface RootNode {
  props: Record<string, unknown>
}

/** The full serializable page document. This is the source of truth. */
export interface PageDocument {
  root: RootNode
  content: ComponentNode[]
  /** Schema version for migrations. */
  version: number
}
```

> **Adopting Puck?** This is essentially Puck's `Data` shape (`root` + `content` + zones/slots). Reuse Puck's types instead of redefining; keep your own thin alias so a future engine swap is contained.

## 2. Component definition API

```typescript
// packages/core/src/define-component.ts
import type { ReactNode } from "react"

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "select"
  | "boolean"
  | "color"
  | "tailwind"   // custom control: class string w/ autocomplete
  | "slot"       // nested drop zone

export interface FieldConfig {
  type: FieldType
  label?: string
  options?: { label: string; value: string }[] // for select
}

/** Props passed to render: editable fields + slot render-props. */
export interface ComponentConfig<P = Record<string, unknown>> {
  name: string
  category?: string
  fields: Record<keyof P | string, FieldConfig>
  defaultProps: Partial<P>
  /** A REAL React component. Hooks / state / effects all allowed. */
  render: (props: P & { id: string }) => ReactNode
}

export function defineComponent<P>(cfg: ComponentConfig<P>): ComponentConfig<P> {
  return cfg
}
```

## 3. Registry / config

```typescript
// packages/core/src/create-config.ts
import type { ComponentConfig } from "./define-component"

export interface BuilderConfig {
  components: Record<string, ComponentConfig<any>>
  root?: ComponentConfig<any>
}

export function createConfig(cfg: BuilderConfig): BuilderConfig {
  return cfg
}
```

> **The extensibility contract:** the runtime resolves a node by `config.components[node.type]`. Adding a component = adding a key here. The renderer code never changes. Interactivity "just works" because `render` is a real React component.

## 4. Headless runtime

```typescript
// packages/runtime/src/render.tsx
import type { BuilderConfig } from "@builder/core"
import type { ComponentNode, PageDocument } from "@builder/core"

function RenderNode({ node, config }: { node: ComponentNode; config: BuilderConfig }) {
  const entry = config.components[node.type]
  if (!entry) {
    if (process.env.NODE_ENV !== "production")
      console.warn(`Unknown component type: ${node.type}`)
    return null // forward-compatible: skip unknown types
  }

  // Build slot render-props: each slot becomes a component that renders its children.
  const slotProps: Record<string, () => JSX.Element> = {}
  if (node.slots) {
    for (const [slotName, children] of Object.entries(node.slots)) {
      slotProps[slotName] = () => (
        <>
          {children.map((child) => (
            <RenderNode key={child.props.id} node={child} config={config} />
          ))}
        </>
      )
    }
  }

  const Component = entry.render
  return <Component {...entry.defaultProps} {...node.props} {...slotProps} />
}

export function Render({ config, data }: { config: BuilderConfig; data: PageDocument }) {
  const Root = config.root?.render ?? (({ children }: any) => <>{children}</>)
  return (
    <Root {...data.root.props}>
      {data.content.map((node) => (
        <RenderNode key={node.props.id} node={node} config={config} />
      ))}
    </Root>
  )
}
```

## 5. Interactivity proof (acceptance test for the MVP)

```typescript
// A stateful component proves the runtime needs no changes for interactivity.
import { useState } from "react"
import { defineComponent } from "@builder/core"

export const Counter = defineComponent<{ label: string }>({
  name: "Counter",
  fields: { label: { type: "text" } },
  defaultProps: { label: "Clicks" },
  render: ({ label }) => {
    const [n, setN] = useState(0)
    return (
      <button className="rounded-md border px-4 py-2" onClick={() => setN(n + 1)}>
        {label}: {n}
      </button>
    )
  },
})
```

**MVP is "done" when:** you can author a `PageDocument` (by hand), pass it to `<Render>`, and the `Counter` increments on click — with the `Counter` added *only* to the config, no renderer edits.

## Acceptance checklist

- [ ] `PageDocument` round-trips through `JSON.stringify`/`parse` losslessly
- [ ] `defineComponent` + `createConfig` typed end-to-end (no `any` leaks to consumers)
- [ ] `<Render>` renders nested slots recursively
- [ ] Unknown `type` is skipped gracefully (forward-compat)
- [ ] Stateful `Counter` works with zero renderer changes
- [ ] Runtime package has **no editor deps** (tree-shakeable, tiny prod bundle)
- [ ] Works in a Next.js app router page (RSC boundary: mark interactive blocks `"use client"`)

## Decisions to lock for the engine

- [ ] **Slots vs flat content + parent refs** for nesting (Puck uses slots — adopt that).
- [ ] **Where Tailwind classes live**: a conventional `className` prop on every block vs a structured `style` field compiled to classes. (Recommend: explicit `className` + optional structured controls that write into it.)
- [ ] **id generation**: nanoid at insert time.
- [ ] **Server Components**: runtime should not force `"use client"`; only interactive blocks opt in.
