import type {
  JSXAttribute,
  JSXElement,
  JSXSpreadAttribute,
  Node,
} from "@babel/types"
import * as t from "@babel/types"
import { nanoid } from "nanoid"
import type { ElementNode, TextNode } from "../types"
import { ValidationError } from "./errors"
import { elementName, getFragmentChildren } from "./utils"
import type { File } from "@babel/types"

export function lower(ast: File): ElementNode {
  const children = getFragmentChildren(ast)
  const lowered = children
    .map((child) => lowerNode(child))
    .filter((node): node is ElementNode | TextNode => node !== null)

  if (lowered.length === 0) {
    throw new ValidationError("Empty JSX fragment")
  }
  const first = lowered[0]
  if (lowered.length === 1 && first && "tag" in first) {
    return first
  }
  if (lowered.length === 1 && first && "text" in first) {
    throw new ValidationError("Fragment with only text requires a wrapper element")
  }

  return {
    id: nanoid(6),
    tag: "div",
    props: {},
    children: lowered,
  }
}

function lowerNode(node: Node): ElementNode | TextNode | null {
  if (t.isJSXText(node)) {
    const text = node.value.trim()
    return text ? { id: nanoid(6), text } : null
  }
  if (t.isJSXExpressionContainer(node)) {
    if (t.isJSXEmptyExpression(node.expression)) {
      return null
    }
    return lowerExpression(node.expression)
  }
  if (t.isJSXElement(node)) {
    return {
      id: nanoid(6),
      tag: elementName(node),
      props: readAttrs(node.openingElement.attributes),
      children: node.children
        .map((child) => lowerNode(child))
        .filter((child): child is ElementNode | TextNode => child !== null),
    }
  }
  return null
}

function lowerExpression(
  expression: t.Expression,
): ElementNode | TextNode | null {
  const value = evaluateStatic(expression)
  if (typeof value === "string") {
    return { id: nanoid(6), text: value }
  }
  throw new ValidationError(
    `Non-serializable expression not allowed: ${expression.type}`,
  )
}

function readAttrs(
  attributes: Array<JSXAttribute | JSXSpreadAttribute>,
): ElementNode["props"] {
  const props: ElementNode["props"] = {}
  for (const attr of attributes) {
    if (t.isJSXSpreadAttribute(attr)) {
      throw new ValidationError("Spread attributes are not allowed")
    }
    if (attr.name.type !== "JSXIdentifier") {
      throw new ValidationError("Namespaced attributes are not allowed")
    }
    const key = attr.name.name
    if (attr.value === null) {
      props[key] = true
    } else if (t.isStringLiteral(attr.value)) {
      props[key] = attr.value.value
    } else if (t.isJSXExpressionContainer(attr.value)) {
      if (t.isJSXEmptyExpression(attr.value.expression)) {
        throw new ValidationError("Empty JSX expressions are not allowed")
      }
      props[key] = evaluateStatic(attr.value.expression)
    }
  }
  return props
}

export function evaluateStatic(node: t.Node): unknown {
  if (t.isStringLiteral(node)) return node.value
  if (t.isNumericLiteral(node)) return node.value
  if (t.isBooleanLiteral(node)) return node.value
  if (t.isNullLiteral(node)) return null
  if (t.isArrayExpression(node)) {
    return node.elements.map((element) => {
      if (element === null || t.isSpreadElement(element)) {
        throw new ValidationError("Non-serializable array expression")
      }
      return evaluateStatic(element)
    })
  }
  if (t.isObjectExpression(node)) {
    const result: Record<string, unknown> = {}
    for (const prop of node.properties) {
      if (t.isSpreadElement(prop)) {
        throw new ValidationError("Non-serializable object expression")
      }
      if (!t.isObjectProperty(prop)) {
        throw new ValidationError("Non-serializable object property")
      }
      const key = t.isIdentifier(prop.key)
        ? prop.key.name
        : t.isStringLiteral(prop.key)
          ? prop.key.value
          : null
      if (key === null) {
        throw new ValidationError("Non-serializable object key")
      }
      if (!t.isExpression(prop.value)) {
        throw new ValidationError("Non-serializable object value")
      }
      result[key] = evaluateStatic(prop.value)
    }
    return result
  }
  if (t.isTemplateLiteral(node)) {
    if (node.expressions.length > 0) {
      throw new ValidationError("Template literal expressions are not allowed")
    }
    return node.quasis.map((q) => q.value.cooked ?? q.value.raw).join("")
  }
  if (t.isUnaryExpression(node) && node.operator === "-" && t.isNumericLiteral(node.argument)) {
    return -node.argument.value
  }
  throw new ValidationError(`Non-serializable expression not allowed: ${node.type}`)
}
