import { Element } from "@craftjs/core"
import {
  Box,
  Heading1,
  Image,
  LayoutGrid,
  MousePointerClick,
  Rows3,
  Sparkles,
  Square,
  Type,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import React from "react"

import { Button } from "../components/Button"
import { Prim } from "../components/Prim"

export type PaletteCategory = "blocks" | "components" | "sections"

export type PaletteItem = {
  id: string
  label: string
  category: PaletteCategory
  icon: LucideIcon
  element: React.ReactElement
}

export const PALETTE_ITEMS: PaletteItem[] = [
  {
    id: "container",
    label: "Container",
    category: "blocks",
    icon: Square,
    element: (
      <Element
        is={Prim}
        canvas
        tag="div"
        className="min-h-[120px] rounded-md border border-dashed border-zinc-300 bg-zinc-50 p-4"
      />
    ),
  },
  {
    id: "heading",
    label: "Heading",
    category: "blocks",
    icon: Heading1,
    element: (
      <Element is={Prim} tag="h1" className="text-3xl font-bold text-zinc-900">
        Heading
      </Element>
    ),
  },
  {
    id: "paragraph",
    label: "Paragraph",
    category: "blocks",
    icon: Type,
    element: (
      <Element is={Prim} tag="p" className="text-base text-zinc-600">
        Paragraph text
      </Element>
    ),
  },
  {
    id: "image",
    label: "Image",
    category: "blocks",
    icon: Image,
    element: (
      <Element
        is={Prim}
        tag="img"
        className="h-40 w-full rounded-md object-cover"
      />
    ),
  },
  {
    id: "button-block",
    label: "Button",
    category: "blocks",
    icon: MousePointerClick,
    element: <Element is={Button} />,
  },
  {
    id: "button-component",
    label: "Button",
    category: "components",
    icon: MousePointerClick,
    element: <Element is={Button} className="mt-2" />,
  },
  {
    id: "card",
    label: "Card",
    category: "components",
    icon: Box,
    element: (
      <Element
        is={Prim}
        canvas
        tag="div"
        className="rounded-lg border border-zinc-200 bg-white p-6 shadow-sm"
      >
        <Element is={Prim} tag="h3" className="text-lg font-semibold">
          Card title
        </Element>
        <Element is={Prim} tag="p" className="mt-2 text-sm text-zinc-600">
          Card description
        </Element>
      </Element>
    ),
  },
  {
    id: "feature-card",
    label: "Feature Card",
    category: "components",
    icon: Sparkles,
    element: (
      <Element
        is={Prim}
        canvas
        tag="div"
        className="rounded-lg border border-zinc-200 bg-white p-6"
      >
        <Element is={Prim} tag="h3" className="text-base font-semibold">
          Feature
        </Element>
        <Element is={Prim} tag="p" className="mt-1 text-sm text-zinc-600">
          Short feature description
        </Element>
      </Element>
    ),
  },
  {
    id: "hero-section",
    label: "Hero",
    category: "sections",
    icon: LayoutGrid,
    element: (
      <Element
        is={Prim}
        canvas
        tag="section"
        className="flex flex-col items-center gap-4 py-24 text-center"
      >
        <Element is={Prim} tag="h1" className="text-5xl font-bold tracking-tight">
          Build faster
        </Element>
        <Element
          is={Prim}
          tag="p"
          className="max-w-xl text-lg text-zinc-600"
        >
          Tailwind + shadcn blocks for your next landing page.
        </Element>
        <Element is={Button}>Get started</Element>
      </Element>
    ),
  },
  {
    id: "features-section",
    label: "Features",
    category: "sections",
    icon: Rows3,
    element: (
      <Element
        is={Prim}
        canvas
        tag="section"
        className="grid gap-6 py-16 md:grid-cols-3"
      >
        <Element
          is={Prim}
          canvas
          tag="div"
          className="rounded-lg border border-zinc-200 p-6"
        >
          <Element is={Prim} tag="h3" className="font-semibold">
            Fast
          </Element>
          <Element is={Prim} tag="p" className="mt-2 text-sm text-zinc-600">
            Ship pages quickly
          </Element>
        </Element>
        <Element
          is={Prim}
          canvas
          tag="div"
          className="rounded-lg border border-zinc-200 p-6"
        >
          <Element is={Prim} tag="h3" className="font-semibold">
            Flexible
          </Element>
          <Element is={Prim} tag="p" className="mt-2 text-sm text-zinc-600">
            Edit anything anywhere
          </Element>
        </Element>
        <Element
          is={Prim}
          canvas
          tag="div"
          className="rounded-lg border border-zinc-200 p-6"
        >
          <Element is={Prim} tag="h3" className="font-semibold">
            Styled
          </Element>
          <Element is={Prim} tag="p" className="mt-2 text-sm text-zinc-600">
            Tailwind token controls
          </Element>
        </Element>
      </Element>
    ),
  },
  {
    id: "cta-section",
    label: "CTA",
    category: "sections",
    icon: MousePointerClick,
    element: (
      <Element
        is={Prim}
        canvas
        tag="section"
        className="rounded-xl bg-zinc-900 px-8 py-16 text-center text-white"
      >
        <Element is={Prim} tag="h2" className="text-3xl font-bold">
          Ready to start?
        </Element>
        <Element is={Prim} tag="p" className="mt-2 text-zinc-300">
          Drop this section and customize it.
        </Element>
        <Element is={Button} className="mt-6">
          Get started
        </Element>
      </Element>
    ),
  },
]
