import { useEditor, useNode } from "@craftjs/core"
import React from "react"

const SELECTION_COLOR = "rgb(59, 130, 246)"
const HOVER_COLOR = "rgb(147, 197, 253)"

export type RenderNodeProps = {
  render: React.ReactElement
}

/**
 * Craft.js onRender wrapper — adds click-to-select outline on hover/selection.
 */
export function RenderNode({ render }: RenderNodeProps) {
  const { id } = useNode()
  const { isActive } = useEditor((_, query) => ({
    isActive: query.getEvent("selected").contains(id),
  }))
  const { isHover, dom } = useNode((node) => ({
    isHover: node.events.hovered,
    dom: node.dom,
  }))

  React.useEffect(() => {
    if (!dom) return

    if (isActive) {
      dom.style.outline = `2px solid ${SELECTION_COLOR}`
      dom.style.outlineOffset = "-2px"
    } else if (isHover) {
      dom.style.outline = `1px dashed ${HOVER_COLOR}`
      dom.style.outlineOffset = "-1px"
    } else {
      dom.style.outline = ""
      dom.style.outlineOffset = ""
    }

    return () => {
      dom.style.outline = ""
      dom.style.outlineOffset = ""
    }
  }, [dom, isActive, isHover])

  return render
}
