import {
  lower,
  parseJsx,
  validate,
  type ElementNode,
  ValidationError,
} from "@blocksmith/core"
import { DEFAULT_COMPONENT_REGISTRY } from "./prompt/component-registry"

export { ValidationError }

export interface ProcessJsxOptions {
  registry?: Set<string>
}

/** Parse → validate → lower using @blocksmith/core pipeline. */
export function processJsx(
  jsx: string,
  options: ProcessJsxOptions = {},
): ElementNode {
  const registry = options.registry ?? DEFAULT_COMPONENT_REGISTRY
  const ast = parseJsx(jsx)
  validate(ast, registry)
  return lower(ast)
}
