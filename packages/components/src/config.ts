import { createConfig, type BuilderConfig } from "@blocksmith/core"
import { FeatureCard } from "./blocks/feature-card"
import { Features } from "./blocks/features"
import { Hero } from "./blocks/hero"

const components = {
  Hero,
  FeatureCard,
  Features,
} as unknown as BuilderConfig["components"]

export function createComponentsConfig() {
  return createConfig({ components })
}
