import { describe, expect, it } from "vitest"
import { AGENT_TOOL_NAMES, type AgentTool } from "./agent-tool"

describe("AgentTool types", () => {
  const tools: AgentTool[] = [
    { name: "generateSection", args: { intent: "hero for fintech" } },
    {
      name: "generateSection",
      args: { intent: "features grid", insertAfter: "node-1" },
    },
    { name: "replaceSection", args: { nodeId: "node-1", intent: "bolder CTA" } },
    {
      name: "editNode",
      args: { nodeId: "node-2", jsx: '<h1 className="text-5xl">Title</h1>' },
    },
    { name: "setClassName", args: { nodeId: "node-3", className: "py-24" } },
    {
      name: "applyTheme",
      args: { tokens: { primary: "hsl(220 90% 56%)" } },
    },
    {
      name: "moveNode",
      args: { nodeId: "node-4", targetId: "node-5", position: "after" },
    },
  ]

  it("exports all six tool names", () => {
    expect(AGENT_TOOL_NAMES).toEqual([
      "generateSection",
      "replaceSection",
      "editNode",
      "setClassName",
      "applyTheme",
      "moveNode",
    ])
  })

  it("accepts every AgentTool variant", () => {
    const names = new Set(tools.map((tool) => tool.name))
    for (const name of AGENT_TOOL_NAMES) {
      expect(names.has(name)).toBe(true)
    }
    expect(tools.length).toBeGreaterThanOrEqual(AGENT_TOOL_NAMES.length)
  })
})
