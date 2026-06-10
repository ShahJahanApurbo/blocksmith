import { useEditor } from "@craftjs/core"
import { LayoutGrid } from "lucide-react"
import React from "react"

import { StyleManagerPanel } from "../style/StyleManager"
import { EditorToolbar } from "./EditorToolbar"

export type EditorLayoutProps = {
  children?: React.ReactNode
}

export function EditorLayout({ children }: EditorLayoutProps) {
  const { connectors } = useEditor()

  return (
    <div className="flex h-full min-h-0 flex-col bg-muted/30">
      <EditorToolbar />
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <aside className="flex w-52 shrink-0 flex-col border-r border-border bg-background">
          <div className="flex items-center gap-2 border-b border-border px-3 py-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <LayoutGrid className="size-3.5" />
            Blocks
          </div>
          <div className="p-3 text-sm text-muted-foreground">
            Palette coming in Wave 3
          </div>
        </aside>
        <main
          className="craftjs-renderer relative min-h-0 flex-1 overflow-auto bg-zinc-100 p-6"
          ref={(ref) => {
            if (ref) {
              connectors.select(
                connectors.hover(ref, "" as unknown as string),
                "" as unknown as string,
              )
            }
          }}
        >
          <div className="mx-auto w-full max-w-5xl">{children}</div>
        </main>
        <StyleManagerPanel />
      </div>
    </div>
  )
}
