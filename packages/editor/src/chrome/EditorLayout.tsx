import { useEditor } from "@craftjs/core"
import React from "react"

import { cn } from "../lib/utils"
import { StyleManagerPanel } from "../style/StyleManager"
import { BlocksPalette } from "./BlocksPalette"
import { EditorToolbar } from "./EditorToolbar"
import { LayersPanel } from "./LayersPanel"
import { VVVEB_LEFT_PANEL } from "./vvveb-chrome"

export type EditorLayoutProps = {
  children?: React.ReactNode
}

export function EditorLayout({ children }: EditorLayoutProps) {
  const { connectors } = useEditor()

  return (
    <div className="flex h-full min-h-0 flex-col bg-muted/30">
      <EditorToolbar />
      <div className="flex min-h-0 flex-1 overflow-hidden">
        <aside
          className={cn(
            "flex shrink-0 flex-col border-r border-border bg-background",
            VVVEB_LEFT_PANEL.panelWidth,
          )}
        >
          <BlocksPalette />
          <LayersPanel />
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
