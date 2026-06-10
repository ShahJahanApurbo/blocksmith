import { describe, expect, it } from "vitest"
import { buildSystemPrompt } from "./build-system-prompt"
import { CLASS_RULES, ROLE_AND_OUTPUT_CONTRACT } from "./sections"
import { formatDesignTokens } from "../tokens/design-tokens"
import { formatComponentRegistry } from "./component-registry"

describe("buildSystemPrompt", () => {
  it("assembles ROLE, DESIGN_TOKENS, CLASS_RULES, and COMPONENT_REGISTRY", () => {
    const prompt = buildSystemPrompt()

    expect(prompt).toContain("## ROLE + OUTPUT CONTRACT")
    expect(prompt).toContain(ROLE_AND_OUTPUT_CONTRACT)
    expect(prompt).toContain("## DESIGN TOKENS")
    expect(prompt).toContain(formatDesignTokens())
    expect(prompt).toContain("## CLASS RULES")
    expect(prompt).toContain(CLASS_RULES)
    expect(prompt).toContain("## COMPONENT REGISTRY")
    expect(prompt).toContain(formatComponentRegistry())
  })

  it("injects retrieved examples when provided", () => {
    const example =
      '<section className="py-24"><h1 className="text-4xl">Hero</h1></section>'
    const prompt = buildSystemPrompt({ examples: [example] })

    expect(prompt).toContain("## RETRIEVED EXAMPLES")
    expect(prompt).toContain("EXAMPLE:")
    expect(prompt).toContain(example)
  })

  it("includes current tree summary when provided", () => {
    const summary = "Page: 1 section (hero), 2 CTAs"
    const prompt = buildSystemPrompt({ currentTreeSummary: summary })

    expect(prompt).toContain("## CURRENT TREE SUMMARY")
    expect(prompt).toContain(summary)
  })

  it("omits examples section when corpus is empty", () => {
    const prompt = buildSystemPrompt({ examples: [] })
    expect(prompt).not.toContain("## RETRIEVED EXAMPLES")
  })
})
