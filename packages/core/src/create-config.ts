import type { ComponentConfig } from "./define-component"

export interface BuilderConfig {
  components: Record<string, ComponentConfig>
  root?: ComponentConfig
}

export function createConfig(cfg: BuilderConfig): BuilderConfig {
  return cfg
}
