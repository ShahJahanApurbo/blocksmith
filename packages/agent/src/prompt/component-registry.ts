import { ALLOWED_TAGS } from "@blocksmith/core"

/** Smart components available to the agent (matches runtime resolver). */
export const SMART_COMPONENTS = [
  "Button",
  "Input",
  "Tabs",
  "Accordion",
  "Carousel",
  "Dialog",
  "Icon",
] as const

export type SmartComponentName = (typeof SMART_COMPONENTS)[number]

/** Default component registry for pipeline validation. */
export const DEFAULT_COMPONENT_REGISTRY = new Set<string>(SMART_COMPONENTS)

export const SMART_COMPONENT_DOCS: Record<SmartComponentName, string> = {
  Button:
    '<Button variant="default|outline|ghost|secondary" size="sm|default|lg">label</Button>',
  Input: '<Input placeholder="..." type="text|email" />',
  Tabs: '<Tabs items={[{label, content}]} />',
  Accordion: '<Accordion items={[{question, answer}]} />',
  Carousel: "<Carousel slides={[...]} />",
  Dialog: "<Dialog trigger={...}>content</Dialog>",
  Icon: '<Icon name="lucide-icon-name" />',
}

export function formatComponentRegistry(
  primitives: Iterable<string> = ALLOWED_TAGS,
  smartComponents: readonly SmartComponentName[] = SMART_COMPONENTS,
): string {
  const primitiveList = [...primitives].sort().join(", ")
  const smartDocs = smartComponents
    .map((name) => `  ${SMART_COMPONENT_DOCS[name]}`)
    .join("\n")

  return [
    "PRIMITIVES (any allowlisted tag, free className + children):",
    `  ${primitiveList}`,
    "",
    "SMART COMPONENTS (use exactly these names + documented props):",
    smartDocs,
  ].join("\n")
}
