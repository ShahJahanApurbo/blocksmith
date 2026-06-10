/**
 * Screenshot-diff loop foundation (Wave 2 workstream G stub).
 *
 * Full harness per docs/diff-loop.md:
 * 1. Storybook story isolating StyleManagerPanel @ 1440×900 viewport
 * 2. Playwright render → candidate PNG
 * 3. Compare vs docs/vvveb-ui-reference/shots/style-manager.png via pixelmatch
 * 4. Vision critique when matchScore stalls
 *
 * To wire in Wave 2+:
 * - Add Storybook to packages/editor (or apps/storybook)
 * - Install: pixelmatch, pngjs, @playwright/test
 * - Golden ref: blocksmith/docs/vvveb-ui-reference/shots/style-manager.png
 * - Baselines: packages/editor/tests/visual/__baselines__/
 */

export type UiDiff = {
  matchScore: number
  passes: boolean
  differences: Array<{
    region: string
    property: string
    current: string
    target: string
    fix: string
  }>
  summary: string
}

export type PixelDiffResult = {
  matchScore: number
  mismatchedPixels: number
  totalPixels: number
  /** Path to diff-mask PNG when real pixelmatch is wired */
  diffMaskPath?: string
}

const DEFAULT_THRESHOLD = 0.97

/**
 * Stub pixel comparison — returns a placeholder score.
 * Replace with pixelmatch + pngjs in the visual regression harness.
 */
export async function compareScreenshots(
  _candidatePath: string,
  _referencePath: string,
  threshold = DEFAULT_THRESHOLD,
): Promise<PixelDiffResult & { passes: boolean }> {
  return {
    matchScore: 0,
    mismatchedPixels: 0,
    totalPixels: 0,
    passes: false,
    diffMaskPath: undefined,
  }
}

export function passesThreshold(
  matchScore: number,
  threshold = DEFAULT_THRESHOLD,
): boolean {
  return matchScore >= threshold
}

/**
 * Placeholder for the AI revision loop described in diff-loop.md.
 * Iteration cap, best-candidate retention, and intendedDeltas allowlist
 * belong here once Playwright + pixelmatch are installed.
 */
export async function runStyleManagerDiffLoop(): Promise<UiDiff> {
  return {
    matchScore: 0,
    passes: false,
    differences: [],
    summary:
      "Diff loop stub — install Storybook + Playwright + pixelmatch to enable.",
  }
}
