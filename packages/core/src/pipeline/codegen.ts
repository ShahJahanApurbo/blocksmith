import type { ElementNode, TextNode } from "../types"

export function codegen(node: ElementNode | TextNode, depth = 0): string {
  const pad = "\t".repeat(depth)
  if ("text" in node) {
    return pad + node.text
  }

  const attrs = Object.entries(node.props)
    .map(([key, value]) => {
      if (typeof value === "string") {
        return `${key}="${value}"`
      }
      return `${key}={${JSON.stringify(value)}}`
    })
    .join(" ")

  const open = `${pad}<${node.tag}${attrs ? ` ${attrs}` : ""}>`
  const kids = (node.children ?? [])
    .map((child) => codegen(child, depth + 1))
    .join("\n")

  if (!kids) {
    return `${open}\n${pad}</${node.tag}>`
  }

  return `${open}\n${kids}\n${pad}</${node.tag}>`
}
