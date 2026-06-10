import type { PageDocument } from "@blocksmith/core"

export const DEFAULT_PAGE: PageDocument = {
  version: 1,
  root: {
    props: {
      className: "min-h-screen bg-background",
    },
  },
  content: [
    {
      type: "Hero",
      props: {
        id: "hero-1",
        title: "Build with Blocksmith",
        subtitle:
          "Design pages visually in the editor, preview with runtime Render, or let the agent draft sections.",
        ctaLabel: "Open editor",
        className: "py-24",
      },
    },
    {
      type: "Features",
      props: {
        id: "features-1",
        columns: 3,
        className: "py-16",
      },
    },
  ],
}
