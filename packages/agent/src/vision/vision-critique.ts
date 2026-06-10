import {
  DEFAULT_CRITIQUE_THRESHOLD,
  type Critique,
  type ScreenshotSet,
} from "../types/critique"

export interface VisionCritiqueOptions {
  threshold?: number
}

/**
 * Stub vision critique — returns mock JSON matching the Critique schema.
 * No real LLM or screenshot analysis; wired for the agent loop skeleton.
 */
export function visionCritique(
  _screenshots: ScreenshotSet,
  intent: string,
  options: VisionCritiqueOptions = {},
): Critique {
  const threshold = options.threshold ?? DEFAULT_CRITIQUE_THRESHOLD

  const scores = {
    hierarchy: 8.8,
    spacing: 8.6,
    alignment: 8.5,
    contrast: 8.7,
    typography: 8.4,
    responsive: 8.3,
    polish: 8.5,
  }

  const score =
    scores.hierarchy * 0.2 +
    scores.spacing * 0.2 +
    scores.alignment * 0.15 +
    scores.contrast * 0.15 +
    scores.typography * 0.1 +
    scores.responsive * 0.1 +
    scores.polish * 0.1

  return {
    scores,
    score: Math.round(score * 10) / 10,
    passes: score >= threshold,
    issues: [
      {
        severity: "low",
        region: "hero subheading",
        problem: "Subhead competes slightly with the primary heading",
        fix: "Reduce subhead to text-lg text-muted-foreground",
      },
    ],
    summary: `Mock critique for intent "${intent}": layout is on-token with minor hierarchy tweaks.`,
  }
}
