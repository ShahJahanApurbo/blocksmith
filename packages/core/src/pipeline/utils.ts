import type { JSXElement, Node, File } from "@babel/types"
import traverse, { type NodePath } from "@babel/traverse"
import type { JSXAttribute, JSXFragment } from "@babel/types"

export function elementName(node: JSXElement): string {
  const name = node.openingElement.name
  if (name.type === "JSXIdentifier") {
    return name.name
  }
  if (name.type === "JSXMemberExpression") {
    const object =
      name.object.type === "JSXIdentifier" ? name.object.name : "?"
    const property =
      name.property.type === "JSXIdentifier" ? name.property.name : "?"
    return `${object}.${property}`
  }
  return "?"
}

export function allClassNames(ast: File): string[] {
  const classes: string[] = []
  traverse(ast, {
    JSXAttribute(path: NodePath<JSXAttribute>) {
      if (path.node.name.type !== "JSXIdentifier") return
      if (path.node.name.name !== "className") return
      const value = path.node.value
      if (!value) return
      if (value.type === "StringLiteral") {
        classes.push(value.value)
        return
      }
      if (
        value.type === "JSXExpressionContainer" &&
        value.expression.type === "StringLiteral"
      ) {
        classes.push(value.expression.value)
      }
    },
  })
  return classes
}

export function getFragmentChildren(ast: File): Node[] {
  let children: Node[] = []
  traverse(ast, {
    JSXFragment(path: NodePath<JSXFragment>) {
      children = path.node.children
      path.stop()
    },
  })
  return children
}
