import { ROOT_NODE, useEditor } from "@craftjs/core"
import { ChevronRight, Layers } from "lucide-react"
import React, { useEffect, useState } from "react"

import { cn } from "../lib/utils"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible"
import { getNodeLabel } from "./layer-utils"
import { VVVEB_LEFT_PANEL } from "./vvveb-chrome"

type LayerTreeNodeProps = {
  nodeId: string
  depth: number
}

function LayerTreeNode({ nodeId, depth }: LayerTreeNodeProps) {
  const { actions } = useEditor()
  const { childIds, label, isSelected, hasChildren, shouldExpand } = useEditor(
    (state, query) => {
      const node = state.nodes[nodeId]
      if (!node) {
        return {
          childIds: [] as string[],
          label: "",
          isSelected: false,
          hasChildren: false,
          shouldExpand: false,
        }
      }

      const selectedSet = state.events.selected
      const selectedId = selectedSet.size > 0 ? [...selectedSet][0] : null

      return {
        childIds: node.data.nodes ?? [],
        label: getNodeLabel(node),
        isSelected: selectedSet.has(nodeId),
        hasChildren: (node.data.nodes?.length ?? 0) > 0,
        shouldExpand:
          !!selectedId &&
          selectedId !== nodeId &&
          state.nodes[selectedId] &&
          query.node(selectedId).ancestors(true).includes(nodeId),
      }
    },
  )

  const [open, setOpen] = useState(depth < 2)

  useEffect(() => {
    if (shouldExpand && !open) {
      setOpen(true)
    }
  }, [shouldExpand, open])

  if (!label) return null

  return (
    <Collapsible open={open} onOpenChange={setOpen}>
      <div
        className={cn(
          "group flex min-h-7 items-center gap-0.5 rounded-sm pr-1 text-xs hover:bg-muted/60",
          isSelected && "bg-primary/10 text-primary",
        )}
        style={{ paddingLeft: `${depth * 12 + 4}px` }}
      >
        {hasChildren ? (
          <CollapsibleTrigger
            className="flex size-5 shrink-0 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted"
            aria-label={open ? "Collapse layer" : "Expand layer"}
          >
            <ChevronRight
              className={cn(
                "size-3.5 transition-transform",
                open && "rotate-90",
              )}
            />
          </CollapsibleTrigger>
        ) : (
          <span className="size-5 shrink-0" />
        )}
        <button
          type="button"
          className="min-w-0 flex-1 truncate py-1 text-left"
          onClick={() => actions.selectNode(nodeId)}
        >
          {label}
        </button>
      </div>
      {hasChildren ? (
        <CollapsibleContent>
          {childIds.map((childId) => (
            <LayerTreeNode key={childId} nodeId={childId} depth={depth + 1} />
          ))}
        </CollapsibleContent>
      ) : null}
    </Collapsible>
  )
}

export function LayersPanel() {
  const { rootChildIds } = useEditor((state) => {
    const root = state.nodes[ROOT_NODE]
    if (!root) return { rootChildIds: [] as string[] }
    return { rootChildIds: root.data.nodes ?? [] }
  })

  return (
    <div
      className={cn(
        "flex shrink-0 flex-col border-t border-border bg-background",
        VVVEB_LEFT_PANEL.layersHeight,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border px-3 py-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <Layers className="size-3.5" />
        Layers
      </div>
      <div className="min-h-0 flex-1 overflow-y-auto py-1">
        {rootChildIds.length === 0 ? (
          <p className="px-3 py-4 text-center text-xs text-muted-foreground">
            No layers yet. Drag blocks onto the canvas.
          </p>
        ) : (
          rootChildIds.map((nodeId) => (
            <LayerTreeNode key={nodeId} nodeId={nodeId} depth={0} />
          ))
        )}
      </div>
    </div>
  )
}
