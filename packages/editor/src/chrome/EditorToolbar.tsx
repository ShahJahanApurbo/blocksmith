import { useEditor } from "@craftjs/core"
import { Eye, Pencil, Redo2, Undo2 } from "lucide-react"
import React from "react"

import { Button } from "../ui/button"
import { Separator } from "../ui/separator"

export function EditorToolbar() {
  const { enabled, canUndo, canRedo, actions } = useEditor((state, query) => ({
    enabled: state.options.enabled,
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }))

  return (
    <header className="flex h-11 shrink-0 items-center gap-2 border-b border-border bg-background px-3">
      <span className="text-sm font-semibold tracking-tight">Blocksmith</span>
      <Separator orientation="vertical" className="mx-1 h-5" />
      {enabled ? (
        <>
          <Button
            variant="ghost"
            size="icon"
            disabled={!canUndo}
            aria-label="Undo"
            onClick={() => actions.history.undo()}
          >
            <Undo2 />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            disabled={!canRedo}
            aria-label="Redo"
            onClick={() => actions.history.redo()}
          >
            <Redo2 />
          </Button>
        </>
      ) : null}
      <div className="ml-auto">
        <Button
          variant={enabled ? "secondary" : "default"}
          size="sm"
          onClick={() => {
            actions.setOptions((options) => {
              options.enabled = !enabled
            })
          }}
        >
          {enabled ? (
            <>
              <Eye className="size-4" />
              Preview
            </>
          ) : (
            <>
              <Pencil className="size-4" />
              Edit
            </>
          )}
        </Button>
      </div>
    </header>
  )
}
