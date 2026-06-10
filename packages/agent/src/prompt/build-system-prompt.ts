import { formatDesignTokens, type DesignTokens } from "../tokens/design-tokens"
import { formatComponentRegistry } from "./component-registry"
import { CLASS_RULES, EDIT_MODE, ROLE_AND_OUTPUT_CONTRACT } from "./sections"

export interface SystemPromptOptions {
  /** Override design tokens (defaults to contract from prompt-token.md). */
  tokens?: DesignTokens
  /** Override component registry section text. */
  componentRegistry?: string
  /** RAG-retrieved few-shot examples (labeled EXAMPLE:). */
  examples?: string[]
  /** Compact summary of the current page tree. */
  currentTreeSummary?: string
  /** Include edit-mode instructions for surgical node changes. */
  includeEditMode?: boolean
}

function formatExamples(examples: string[]): string {
  if (examples.length === 0) return ""
  return examples.map((jsx) => `EXAMPLE:\n${jsx}`).join("\n\n")
}

/**
 * Assemble the agent system prompt from modular sections:
 * ROLE + DESIGN_TOKENS + CLASS_RULES + COMPONENT_REGISTRY + examples + tree summary.
 */
export function buildSystemPrompt(options: SystemPromptOptions = {}): string {
  const sections = [
    "## ROLE + OUTPUT CONTRACT",
    ROLE_AND_OUTPUT_CONTRACT,
    "",
    "## DESIGN TOKENS",
    formatDesignTokens(options.tokens),
    "",
    "## CLASS RULES",
    CLASS_RULES,
    "",
    "## COMPONENT REGISTRY",
    options.componentRegistry ?? formatComponentRegistry(),
  ]

  const examples = formatExamples(options.examples ?? [])
  if (examples) {
    sections.push("", "## RETRIEVED EXAMPLES", examples)
  }

  if (options.currentTreeSummary) {
    sections.push(
      "",
      "## CURRENT TREE SUMMARY",
      options.currentTreeSummary,
    )
  }

  if (options.includeEditMode) {
    sections.push("", "## EDIT MODE", EDIT_MODE)
  }

  return sections.join("\n")
}
