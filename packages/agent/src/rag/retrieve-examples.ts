import { EXAMPLE_CORPUS, type RagExample } from "./corpus"

export interface RetrieveExamplesOptions {
  intent: string
  sectionType?: string
  /** Max examples to inject into the prompt (default 4). */
  limit?: number
}

/**
 * Retrieve the closest few-shot examples for the user intent.
 * Placeholder: returns empty until the corpus is populated.
 */
export function retrieveExamples(
  options: RetrieveExamplesOptions,
): RagExample[] {
  const limit = options.limit ?? 4
  if (EXAMPLE_CORPUS.length === 0) return []

  const query = `${options.intent} ${options.sectionType ?? ""}`.toLowerCase()

  return [...EXAMPLE_CORPUS]
    .sort((a, b) => scoreMatch(b, query) - scoreMatch(a, query))
    .slice(0, limit)
}

function scoreMatch(example: RagExample, query: string): number {
  const haystack =
    `${example.sectionType} ${example.description} ${example.jsx}`.toLowerCase()
  let score = 0
  for (const token of query.split(/\s+/)) {
    if (token.length > 2 && haystack.includes(token)) score += 1
  }
  return score
}
