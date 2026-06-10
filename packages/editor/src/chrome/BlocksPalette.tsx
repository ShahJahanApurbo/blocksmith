import { useEditor } from "@craftjs/core"
import { LayoutGrid, Search } from "lucide-react"
import React, { useMemo, useState } from "react"

import { cn } from "../lib/utils"
import { Input } from "../ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs"
import { VVVEB_LEFT_PANEL } from "./vvveb-chrome"
import {
  PALETTE_ITEMS,
  type PaletteCategory,
  type PaletteItem,
} from "./palette-items"

const PALETTE_TABS: { id: PaletteCategory; label: string }[] = [
  { id: "blocks", label: "Blocks" },
  { id: "components", label: "Components" },
  { id: "sections", label: "Sections" },
]

function PaletteTile({ item }: { item: PaletteItem }) {
  const { connectors } = useEditor()
  const Icon = item.icon

  return (
    <div
      ref={(ref) => {
        if (ref) connectors.create(ref, item.element)
      }}
      className={cn(
        "flex cursor-grab flex-col items-center justify-center gap-1.5 rounded border border-border bg-background text-center transition-colors hover:border-primary/40 hover:bg-muted/50 active:cursor-grabbing",
        VVVEB_LEFT_PANEL.tileSize,
      )}
      title={`Drag ${item.label}`}
    >
      <Icon className="size-5 text-muted-foreground" />
      <span className={cn("leading-tight text-muted-foreground", VVVEB_LEFT_PANEL.tileLabel)}>
        {item.label}
      </span>
    </div>
  )
}

function PaletteGrid({ items }: { items: PaletteItem[] }) {
  if (items.length === 0) {
    return (
      <p className="px-1 py-6 text-center text-xs text-muted-foreground">
        No items match your search.
      </p>
    )
  }

  return (
    <div className={cn("grid", VVVEB_LEFT_PANEL.gridCols, VVVEB_LEFT_PANEL.gridGap)}>
      {items.map((item) => (
        <PaletteTile key={item.id} item={item} />
      ))}
    </div>
  )
}

export function BlocksPalette() {
  const [query, setQuery] = useState("")
  const normalizedQuery = query.trim().toLowerCase()

  const itemsByCategory = useMemo(() => {
    const filtered = normalizedQuery
      ? PALETTE_ITEMS.filter((item) =>
          item.label.toLowerCase().includes(normalizedQuery),
        )
      : PALETTE_ITEMS

    return {
      blocks: filtered.filter((item) => item.category === "blocks"),
      components: filtered.filter((item) => item.category === "components"),
      sections: filtered.filter((item) => item.category === "sections"),
    }
  }, [normalizedQuery])

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <div className="flex items-center gap-2 border-b border-border px-3 py-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <LayoutGrid className="size-3.5" />
        Palette
      </div>
      <div className="border-b border-border px-3 py-2">
        <div className="relative">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search blocks..."
            className={cn("h-8 pl-8 text-xs", VVVEB_LEFT_PANEL.searchInput)}
            aria-label="Search palette"
          />
        </div>
      </div>
      <Tabs defaultValue="blocks" className="flex min-h-0 flex-1 flex-col px-3 pb-3">
        <TabsList className="mt-2 grid h-8 w-full shrink-0 grid-cols-3">
          {PALETTE_TABS.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="px-1 text-[11px]"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        <div className="min-h-0 flex-1 overflow-y-auto pt-2">
          {PALETTE_TABS.map((tab) => (
            <TabsContent key={tab.id} value={tab.id} className="mt-0">
              <PaletteGrid items={itemsByCategory[tab.id]} />
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  )
}
