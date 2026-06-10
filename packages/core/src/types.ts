/** Inline text leaf in an ElementNode tree (JSX pipeline model). */
export interface TextNode {
  id: string
  text: string
}

/**
 * Element node in the JSX pipeline model.
 * `tag` is an allowlisted HTML tag or a registered component key.
 */
export interface ElementNode {
  id: string
  tag: string
  props: {
    className?: string
    [key: string]: unknown
  }
  children?: Array<ElementNode | TextNode>
}

/** A single node in the page tree. `type` is the registry key. */
export interface ComponentNode {
  type: string
  props: {
    /** Stable unique id; used for selection, keys, and slot targeting. */
    id: string
    [key: string]: unknown
  }
  /** Optional named slots -> arrays of child nodes (nesting). */
  slots?: Record<string, ComponentNode[]>
}

export interface RootNode {
  props: Record<string, unknown>
}

/** The full serializable page document. This is the source of truth. */
export interface PageDocument {
  root: RootNode
  content: ComponentNode[]
  /** Schema version for migrations. */
  version: number
}
