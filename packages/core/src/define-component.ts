import type { ReactNode } from "react"

export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "select"
  | "boolean"
  | "color"
  | "tailwind"
  | "slot"

export interface FieldConfig {
  type: FieldType
  label?: string
  options?: { label: string; value: string }[]
}

/** Props passed to render: editable fields + slot render-props. */
export interface ComponentConfig<P extends Record<string, unknown> = Record<string, unknown>> {
  name: string
  category?: string
  fields: Record<keyof P | string, FieldConfig>
  defaultProps: Partial<P>
  /** A REAL React component. Hooks / state / effects all allowed. */
  render: (props: P & { id: string }) => ReactNode
}

export function defineComponent<P extends Record<string, unknown>>(
  cfg: ComponentConfig<P>,
): ComponentConfig<P> {
  return cfg
}
