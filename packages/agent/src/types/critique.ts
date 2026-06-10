/** Structured critique output from the vision self-critique loop. */
export interface Critique {
  scores: {
    hierarchy: number
    spacing: number
    alignment: number
    contrast: number
    typography: number
    responsive: number
    polish: number
  }
  /** Weighted 0–10 score. */
  score: number
  /** Whether score meets the acceptance threshold. */
  passes: boolean
  issues: Array<{
    severity: "low" | "med" | "high"
    region: string
    problem: string
    fix: string
  }>
  summary: string
}

export interface ScreenshotSet {
  desktop: string
  mobile: string
}

export const DEFAULT_CRITIQUE_THRESHOLD = 8.5
export const DEFAULT_MAX_ITERATIONS = 3
