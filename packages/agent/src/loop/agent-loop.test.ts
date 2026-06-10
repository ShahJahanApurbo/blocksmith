import { describe, expect, it } from "vitest"
import { runAgentLoop } from "./agent-loop"

const VALID_JSX = `<section className="mx-auto max-w-screen-xl px-4 py-24">
  <h1 className="text-4xl font-bold tracking-tight">Fintech hero</h1>
  <p className="mt-4 text-base text-muted-foreground leading-relaxed">Secure payments made simple.</p>
</section>`

describe("runAgentLoop", () => {
  it("runs generate → pipeline → vision critique → commit", async () => {
    const result = await runAgentLoop({
      intent: "design a hero for a fintech app",
      generate: () => VALID_JSX,
    })

    expect(result.iterations).toBeGreaterThanOrEqual(1)
    expect(result.committed.tree.tag).toBe("section")
    expect(result.committed.critique.passes).toBe(true)
    expect(result.committed.critique.score).toBeGreaterThanOrEqual(8.5)
  })

  it("keeps the best candidate across iterations", async () => {
    let call = 0
    const result = await runAgentLoop({
      intent: "pricing section",
      maxIterations: 2,
      generate: () => {
        call += 1
        return call === 1
          ? '<div className="p-4"><p className="text-sm">Weak</p></div>'
          : VALID_JSX
      },
      critique: ({ iteration }) => ({
        scores: {
          hierarchy: 5,
          spacing: 5,
          alignment: 5,
          contrast: 5,
          typography: 5,
          responsive: 5,
          polish: 5,
        },
        score: iteration === 0 ? 5 : 9,
        passes: iteration > 0,
        issues: [],
        summary: "test critique",
      }),
    })

    expect(result.candidates).toHaveLength(2)
    expect(result.committed.jsx).toBe(VALID_JSX)
  })
})
