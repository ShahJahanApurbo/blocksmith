import type { ReactNode } from "react"
import { defineComponent } from "@blocksmith/core"
import { cn } from "../lib/utils"
import { FeatureCard } from "./feature-card"

export type FeaturesProps = {
  columns: number
  className?: string
  children?: () => ReactNode
}

const columnClasses: Record<number, string> = {
  1: "grid-cols-1",
  2: "grid-cols-1 sm:grid-cols-2",
  3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
  4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
}

const demoFeatures = [
  { title: "Fast", description: "Ship pages quickly with pre-built blocks." },
  { title: "Flexible", description: "Compose layouts with slots and Tailwind." },
  { title: "Polished", description: "shadcn primitives for accessible UI." },
]

export const Features = defineComponent<FeaturesProps>({
  name: "Features",
  category: "Marketing",
  fields: {
    columns: {
      type: "select",
      label: "Columns",
      options: [
        { label: "1", value: "1" },
        { label: "2", value: "2" },
        { label: "3", value: "3" },
        { label: "4", value: "4" },
      ],
    },
    className: { type: "tailwind", label: "Classes" },
    children: { type: "slot", label: "Feature cards" },
  },
  defaultProps: {
    columns: 3,
    className: "py-16",
  },
  render: ({ columns, className, children }): ReactNode => {
    const gridCols = columnClasses[columns] ?? columnClasses[3]

    return (
      <section className={cn("container mx-auto px-4", className)}>
        <div className={cn("grid gap-6", gridCols)}>
          {children
            ? children()
            : demoFeatures.map((feature) => (
                <FeatureCard.render
                  key={feature.title}
                  id={`demo-${feature.title.toLowerCase()}`}
                  {...FeatureCard.defaultProps}
                  title={feature.title}
                  description={feature.description}
                />
              ))}
        </div>
      </section>
    )
  },
})
