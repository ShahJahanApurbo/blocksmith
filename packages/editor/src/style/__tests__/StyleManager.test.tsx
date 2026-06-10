import { render, screen } from "@testing-library/react"
import { Editor } from "@craftjs/core"
import { describe, expect, it } from "vitest"

import { BlocksmithEditor } from "../../BlocksmithEditor"
import { StyleManagerPanel } from "../StyleManager"
import { STYLE_CONTROL_GROUPS } from "../control-config"

describe("STYLE_CONTROL_GROUPS", () => {
  it("lists groups in Vvveb order", () => {
    expect(STYLE_CONTROL_GROUPS.map((g) => g.id)).toEqual([
      "layout",
      "spacing",
      "size",
      "typography",
      "background",
      "border",
      "effects",
      "position",
      "transitions",
      "raw",
    ])
  })
})

describe("StyleManagerPanel", () => {
  it("renders the style manager header and empty state", () => {
    render(
      <BlocksmithEditor>
        <div />
      </BlocksmithEditor>,
    )

    expect(screen.getByText("Style Manager")).toBeInTheDocument()
    expect(
      screen.getByText(/Select an element on the canvas/i),
    ).toBeInTheDocument()
  })

  it("renders breakpoint and state toolbars", () => {
    render(
      <Editor enabled resolver={{}}>
        <StyleManagerPanel />
      </Editor>,
    )

    expect(screen.getByRole("radio", { name: "Base" })).toBeInTheDocument()
    expect(screen.getByRole("radio", { name: "Normal" })).toBeInTheDocument()
    expect(screen.getByRole("radio", { name: "Hover" })).toBeInTheDocument()
  })

  it("renders accordion section headers", () => {
    render(
      <Editor enabled resolver={{}}>
        <StyleManagerPanel />
      </Editor>,
    )

    expect(screen.getByRole("button", { name: /Layout/i })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Raw/i })).toBeInTheDocument()
  })
})

describe("StyleManagerPanel (standalone export)", () => {
  it("exports panel component", () => {
    expect(StyleManagerPanel).toBeDefined()
  })
})
