import type { ReactNode } from "react"
import { Sparkles } from "lucide-react"
import { defineComponent } from "@blocksmith/core"
import { cn } from "../lib/utils"

export type FeatureCardProps = {
  title: string
  description: string
  className?: string
}

export const FeatureCard = defineComponent<FeatureCardProps>({
  name: "FeatureCard",
  category: "Marketing",
  fields: {
    title: { type: "text", label: "Title" },
    description: { type: "textarea", label: "Description" },
    className: { type: "tailwind", label: "Classes" },
  },
  defaultProps: {
    title: "Fast",
    description: "Ship pages quickly with pre-built blocks.",
    className: "",
  },
  render: ({ title, description, className }): ReactNode => (
    <div
      className={cn(
        "flex flex-col gap-3 rounded-lg border bg-card p-6 text-card-foreground shadow-sm",
        className,
      )}
    >
      <div className="flex size-10 items-center justify-center rounded-md bg-primary/10 text-primary">
        <Sparkles className="size-5" aria-hidden />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </div>
  ),
})
