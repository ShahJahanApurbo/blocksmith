import { Editor, Element, Frame } from "@craftjs/core"
import React from "react"

import { Button } from "./components/Button"
import { Prim } from "./components/Prim"
import { RenderNode } from "./components/RenderNode"
import { EditorLayout } from "./chrome/EditorLayout"
import { resolver } from "./resolver"

export type BlocksmithEditorProps = {
  /** Initial canvas content inside the root body element. */
  children?: React.ReactNode
  /** Whether the editor starts in edit mode. Defaults to true. */
  enabled?: boolean
  className?: string
}

const defaultCanvas = (
  <Element
    is={Prim}
    canvas
    tag="section"
    className="rounded-lg border border-zinc-200 bg-white p-8 shadow-sm"
  >
    <Element is={Prim} tag="h1" className="text-3xl font-bold text-zinc-900">
      Blocksmith Editor
    </Element>
    <Element is={Prim} tag="p" className="mt-2 text-base text-zinc-600">
      Click any element to select it. Wave 1 canvas shell on Craft.js.
    </Element>
    <Element is={Button} className="mt-4" />
  </Element>
)

export function BlocksmithEditor({
  children,
  enabled = true,
  className,
}: BlocksmithEditorProps) {
  return (
    <div className={className ?? "h-screen w-full"}>
      <Editor
        resolver={resolver}
        onRender={RenderNode}
        enabled={enabled}
      >
        <EditorLayout>
          <Frame>
            <Element
              is={Prim}
              canvas
              tag="body"
              className="min-h-[480px] bg-white"
            >
              {children ?? defaultCanvas}
            </Element>
          </Frame>
        </EditorLayout>
      </Editor>
    </div>
  )
}
