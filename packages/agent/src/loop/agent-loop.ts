import type { ElementNode } from "@blocksmith/core"
import { buildSystemPrompt } from "../prompt/build-system-prompt"
import { processJsx } from "../pipeline"
import { retrieveExamples } from "../rag/retrieve-examples"
import {
  DEFAULT_CRITIQUE_THRESHOLD,
  DEFAULT_MAX_ITERATIONS,
  type Critique,
  type ScreenshotSet,
} from "../types/critique"
import { visionCritique } from "../vision/vision-critique"

export interface AgentLoopContext {
  systemPrompt: string
  intent: string
  iteration: number
  feedback?: string
}

export interface VisionCritiqueContext {
  screenshots: ScreenshotSet
  intent: string
  iteration: number
  jsx: string
  threshold: number
}

export interface AgentLoopOptions {
  intent: string
  /** Stub generator — receives assembled context, returns JSX fragment. */
  generate: (context: AgentLoopContext) => string | Promise<string>
  registry?: Set<string>
  currentTreeSummary?: string
  maxIterations?: number
  threshold?: number
  /** Stub screenshot capture (no Playwright in this package). */
  renderAndScreenshot?: (tree: ElementNode) => ScreenshotSet | Promise<ScreenshotSet>
  /** Override vision critique (defaults to stub mock). */
  critique?: (context: VisionCritiqueContext) => Critique
}

export interface AgentLoopCandidate {
  tree: ElementNode
  jsx: string
  critique: Critique
}

export interface AgentLoopResult {
  committed: AgentLoopCandidate
  iterations: number
  candidates: AgentLoopCandidate[]
}

const STUB_SCREENSHOTS: ScreenshotSet = {
  desktop: "data:image/png;base64,stub-desktop",
  mobile: "data:image/png;base64,stub-mobile",
}

const STUB_JSX = `<section className="mx-auto max-w-screen-xl px-4 py-24">
  <h1 className="text-4xl font-bold tracking-tight">Generated section</h1>
  <p className="mt-4 text-base text-muted-foreground leading-relaxed">Placeholder from agent loop stub.</p>
</section>`

/**
 * Agent loop skeleton: generate → parse/validate/lower → vision critique → commit best tree.
 * All LLM and vision calls are stubbed; uses @blocksmith/core pipeline for JSX processing.
 */
export async function runAgentLoop(
  options: AgentLoopOptions,
): Promise<AgentLoopResult> {
  const maxIterations = options.maxIterations ?? DEFAULT_MAX_ITERATIONS
  const threshold = options.threshold ?? DEFAULT_CRITIQUE_THRESHOLD
  const renderAndScreenshot =
    options.renderAndScreenshot ??
    (async () => STUB_SCREENSHOTS)

  const examples = retrieveExamples({ intent: options.intent })
  const systemPrompt = buildSystemPrompt({
    examples: examples.map((e) => e.jsx),
    currentTreeSummary: options.currentTreeSummary,
  })

  const candidates: AgentLoopCandidate[] = []
  let feedback: string | undefined
  let candidateJsx = STUB_JSX

  for (let iteration = 0; iteration < maxIterations; iteration++) {
    candidateJsx = await options.generate({
      systemPrompt,
      intent: options.intent,
      iteration,
      feedback,
    })

    const tree = processJsx(candidateJsx, { registry: options.registry })
    const screenshots = await renderAndScreenshot(tree)
    const critique =
      options.critique?.({
        screenshots,
        intent: options.intent,
        iteration,
        jsx: candidateJsx,
        threshold,
      }) ?? visionCritique(screenshots, options.intent, { threshold })

    candidates.push({ tree, jsx: candidateJsx, critique })

    if (critique.passes) break

    feedback = critique.issues
      .sort((a, b) => severityRank(b.severity) - severityRank(a.severity))
      .map((issue) => `${issue.region}: ${issue.fix}`)
      .join("; ")
  }

  const best = candidates.reduce((acc, cur) =>
    cur.critique.score > acc.critique.score ? cur : acc,
  )

  return {
    committed: best,
    iterations: candidates.length,
    candidates,
  }
}

function severityRank(severity: "low" | "med" | "high"): number {
  switch (severity) {
    case "high":
      return 3
    case "med":
      return 2
    case "low":
      return 1
  }
}
