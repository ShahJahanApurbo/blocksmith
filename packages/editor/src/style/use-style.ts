import { useEditor } from "@craftjs/core"
import { useCallback } from "react"

import { setToken } from "./class-string-engine"
import { useStyleContext } from "./style-context"

export function useStyle() {
  const { ctx } = useStyleContext()

  const { className, selectedId, actions, displayName } = useEditor(
    (state, query) => {
      const id = query.getEvent("selected").first()
      if (!id) {
        return {
          selectedId: null as string | null,
          className: "",
          displayName: null as string | null,
        }
      }
      const node = query.node(id).get()
      return {
        selectedId: id,
        className: (node.data.props.className as string | undefined) ?? "",
        displayName: node.data.displayName ?? node.data.name ?? null,
      }
    },
  )

  const apply = useCallback(
    (group: string, token: string | null) => {
      if (!selectedId) return
      actions.setProp(selectedId, (p: { className?: string }) => {
        p.className = setToken(p.className ?? "", group, token, ctx)
      })
    },
    [selectedId, actions, ctx],
  )

  const setClassName = useCallback(
    (next: string) => {
      if (!selectedId) return
      actions.setProp(selectedId, (p: { className?: string }) => {
        p.className = next
      })
    },
    [selectedId, actions],
  )

  const setRawProp = useCallback(
    (key: string, value: string) => {
      if (!selectedId) return
      actions.setProp(selectedId, (p: Record<string, unknown>) => {
        p[key] = value || undefined
      })
    },
    [selectedId, actions],
  )

  const rawProps = useEditor((_, query) => {
    const id = query.getEvent("selected").first()
    if (!id) return {}
    const node = query.node(id).get()
    const props = { ...node.data.props } as Record<string, unknown>
    delete props.children
    return props
  })

  return {
    className,
    apply,
    setClassName,
    setRawProp,
    rawProps,
    selectedId,
    displayName,
    ctx,
  }
}
