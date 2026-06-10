/** A vetted reference section in the agent JSX dialect. */
export interface RagExample {
  id: string
  sectionType: string
  description: string
  jsx: string
}

/** Empty corpus placeholder — populate with gorgeous reference sections for RAG. */
export const EXAMPLE_CORPUS: RagExample[] = []
