"use client"

import { Editor, Element, Frame } from "@craftjs/core"
import { EditorLayout, Prim, RenderNode, resolver } from "@blocksmith/editor"

import { AgentPanel } from "@/components/agent-panel"
import { EditorBridge } from "@/components/editor-bridge"

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
      Click any element to select it. Canvas persists to localStorage on save.
    </Element>
  </Element>
)

export function StudioEditor() {
  return (
    <div className="flex h-screen w-full overflow-hidden">
      <AgentPanel />
      <div className="min-w-0 flex-1">
        <div className="h-full w-full">
          <Editor resolver={resolver} onRender={RenderNode} enabled>
            <EditorBridge />
            <EditorLayout>
              <Frame>
                <Element
                  is={Prim}
                  canvas
                  tag="body"
                  className="min-h-[480px] bg-white"
                >
                  {defaultCanvas}
                </Element>
              </Frame>
            </EditorLayout>
          </Editor>
        </div>
      </div>
    </div>
  )
}
