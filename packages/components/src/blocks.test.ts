import { describe, expect, it } from "vitest"
import { FeatureCard } from "./blocks/feature-card"
import { Features } from "./blocks/features"
import { Hero } from "./blocks/hero"
import { createComponentsConfig } from "./config"

const requiredFieldTypes = ["text", "textarea", "tailwind", "select", "slot"] as const

function expectBlockConfig(
  block: {
    name: string
    fields: Record<string, { type: string }>
    defaultProps: Record<string, unknown>
    render: unknown
  },
  requiredFields: string[],
) {
  expect(block.name).toBeTruthy()
  expect(typeof block.render).toBe("function")
  expect(block.defaultProps).toBeDefined()

  for (const field of requiredFields) {
    expect(block.fields).toHaveProperty(field)
    expect(requiredFieldTypes).toContain(block.fields[field]?.type)
  }
}

describe("blocks", () => {
  it("Hero has required fields and a render function", () => {
    expectBlockConfig(Hero, ["title", "subtitle", "ctaLabel", "className"])
    expect(Hero.name).toBe("Hero")
    expect(Hero.defaultProps.title).toBeTruthy()
    expect(Hero.defaultProps.ctaLabel).toBeTruthy()
  })

  it("FeatureCard has required fields and a render function", () => {
    expectBlockConfig(FeatureCard, ["title", "description", "className"])
    expect(FeatureCard.name).toBe("FeatureCard")
    expect(FeatureCard.defaultProps.title).toBeTruthy()
    expect(FeatureCard.defaultProps.description).toBeTruthy()
  })

  it("Features has required fields and a render function", () => {
    expectBlockConfig(Features, ["columns", "className", "children"])
    expect(Features.name).toBe("Features")
    expect(Features.fields.columns?.type).toBe("select")
    expect(Features.fields.children?.type).toBe("slot")
    expect(Features.defaultProps.columns).toBe(3)
  })
})

describe("createComponentsConfig", () => {
  it("registers all blocks by name", () => {
    const config = createComponentsConfig()

    expect(config.components.Hero).toBe(Hero)
    expect(config.components.FeatureCard).toBe(FeatureCard)
    expect(config.components.Features).toBe(Features)
  })
})
