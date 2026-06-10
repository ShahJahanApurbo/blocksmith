/** Structured edit tools the agent calls (safe, diffable, undoable, partial). */
export type AgentTool =
  | { name: "generateSection"; args: { intent: string; insertAfter?: string } }
  | { name: "replaceSection"; args: { nodeId: string; intent: string } }
  | { name: "editNode"; args: { nodeId: string; jsx: string } }
  | { name: "setClassName"; args: { nodeId: string; className: string } }
  | { name: "applyTheme"; args: { tokens: Record<string, string> } }
  | {
      name: "moveNode"
      args: {
        nodeId: string
        targetId: string
        position: "before" | "after" | "inside"
      }
    }

export const AGENT_TOOL_NAMES = [
  "generateSection",
  "replaceSection",
  "editNode",
  "setClassName",
  "applyTheme",
  "moveNode",
] as const satisfies ReadonlyArray<AgentTool["name"]>
