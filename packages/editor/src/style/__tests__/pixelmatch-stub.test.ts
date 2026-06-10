import { describe, expect, it } from "vitest"

import {
  compareScreenshots,
  passesThreshold,
  runStyleManagerDiffLoop,
} from "./pixelmatch-stub"

describe("pixelmatch-stub (screenshot-diff foundation)", () => {
  it("returns placeholder comparison result", async () => {
    const result = await compareScreenshots(
      "/tmp/candidate.png",
      "/tmp/reference.png",
    )
    expect(result.matchScore).toBe(0)
    expect(result.passes).toBe(false)
  })

  it("evaluates threshold", () => {
    expect(passesThreshold(0.98)).toBe(true)
    expect(passesThreshold(0.5)).toBe(false)
  })

  it("returns diff loop stub payload", async () => {
    const diff = await runStyleManagerDiffLoop()
    expect(diff.differences).toEqual([])
    expect(diff.passes).toBe(false)
  })
})
