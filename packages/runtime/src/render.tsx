import type { ReactNode } from "react"
import type { BuilderConfig, ComponentNode, PageDocument } from "@blocksmith/core"

function RenderNode({
  node,
  config,
}: {
  node: ComponentNode
  config: BuilderConfig
}) {
  const entry = config.components[node.type]
  if (!entry) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`Unknown component type: ${node.type}`)
    }
    return null
  }

  const slotProps: Record<string, () => ReactNode> = {}
  if (node.slots) {
    for (const [slotName, children] of Object.entries(node.slots)) {
      slotProps[slotName] = () => (
        <>
          {children.map((child) => (
            <RenderNode key={child.props.id} node={child} config={config} />
          ))}
        </>
      )
    }
  }

  const Component = entry.render
  return <Component {...entry.defaultProps} {...node.props} {...slotProps} />
}

export function Render({
  config,
  data,
}: {
  config: BuilderConfig
  data: PageDocument
}) {
  const Root =
    config.root?.render ??
    (({ children }: { children?: ReactNode; id?: string }) => <>{children}</>)
  return (
    <Root {...data.root.props} id={(data.root.props.id as string | undefined) ?? "root"}>
      {data.content.map((node) => (
        <RenderNode key={node.props.id} node={node} config={config} />
      ))}
    </Root>
  )
}
