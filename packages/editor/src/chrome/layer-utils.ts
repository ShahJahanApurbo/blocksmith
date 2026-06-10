import type { Node } from "@craftjs/core"

export function getNodeLabel(node: Node): string {
  const displayName = node.data.displayName
  const tag = node.data.props?.tag as string | undefined

  if (tag) {
    return displayName && displayName !== "Prim" ? `${displayName} (${tag})` : tag
  }

  return displayName ?? node.data.name ?? "Node"
}
