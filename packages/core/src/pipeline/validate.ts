import traverse, { type NodePath } from "@babel/traverse"
import type { File, JSXAttribute, JSXElement } from "@babel/types"
import { ALLOWED_TAGS } from "./constants"
import { ValidationError } from "./errors"
import { allClassNames, elementName } from "./utils"

export function validate(ast: File, registry: Set<string>): void {
  traverse(ast, {
    JSXElement(path: NodePath<JSXElement>) {
      const name = elementName(path.node)
      const isComponent = /^[A-Z]/.test(name)
      if (isComponent) {
        if (!registry.has(name)) {
          throw new ValidationError(`Unknown component <${name}>`)
        }
      } else if (!ALLOWED_TAGS.has(name)) {
        throw new ValidationError(`Disallowed tag <${name}>`)
      }
    },
    JSXAttribute(path: NodePath<JSXAttribute>) {
      if (path.node.name.type !== "JSXIdentifier") {
        throw new ValidationError("Namespaced attributes are not allowed")
      }
      const attr = path.node.name.name
      if (attr.startsWith("on")) {
        throw new ValidationError(`Event handler ${attr} not allowed`)
      }
      if (attr === "style") {
        throw new ValidationError("Inline style not allowed")
      }
      if (attr === "dangerouslySetInnerHTML") {
        throw new ValidationError("dangerouslySetInnerHTML not allowed")
      }
    },
    JSXSpreadAttribute() {
      throw new ValidationError("Spread attributes are not allowed")
    },
  })

  for (const cls of allClassNames(ast)) {
    if (/\[[^\]]+\]/.test(cls)) {
      throw new ValidationError(`Arbitrary value not allowed: ${cls}`)
    }
  }
}
