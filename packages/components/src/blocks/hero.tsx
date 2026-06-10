import type { ReactNode } from "react"
import { defineComponent } from "@blocksmith/core"
import { Button } from "../ui/button"
import { cn } from "../lib/utils"

export type HeroProps = {
  title: string
  subtitle: string
  ctaLabel: string
  className?: string
}

export const Hero = defineComponent<HeroProps>({
  name: "Hero",
  category: "Marketing",
  fields: {
    title: { type: "text", label: "Title" },
    subtitle: { type: "textarea", label: "Subtitle" },
    ctaLabel: { type: "text", label: "CTA label" },
    className: { type: "tailwind", label: "Classes" },
  },
  defaultProps: {
    title: "Build faster",
    subtitle: "Tailwind + shadcn blocks for your next landing page.",
    ctaLabel: "Get started",
    className: "py-24 bg-background",
  },
  render: ({ title, subtitle, ctaLabel, className }): ReactNode => (
    <section className={cn("flex flex-col items-center gap-4 text-center", className)}>
      <h1 className="text-5xl font-bold tracking-tight">{title}</h1>
      <p className="max-w-xl text-lg text-muted-foreground">{subtitle}</p>
      <Button size="lg">{ctaLabel}</Button>
    </section>
  ),
})
