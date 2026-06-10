import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import type { Node } from "@craftjs/core"

import { BlocksmithEditor } from "../../BlocksmithEditor"
import { getNodeLabel } from "../layer-utils"

describe("getNodeLabel", () => {
  it("prefers html tag for Prim nodes", () => {
    const label = getNodeLabel({
      data: {
        displayName: "Prim",
        props: { tag: "h1" },
      },
    } as unknown as Node)

    expect(label).toBe("h1")
  })
})

describe("LayersPanel", () => {
  it("renders a hierarchical layer tree from the canvas", async () => {
    render(<BlocksmithEditor />)

    expect(screen.getByText("Layers")).toBeInTheDocument()
    expect(await screen.findByRole("button", { name: "section" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "h1" })).toBeInTheDocument()
    expect(
      screen.getAllByRole("button", { name: "Button" }).length,
    ).toBeGreaterThanOrEqual(1)
  })

  it("selects a node when a layer row is clicked", async () => {
    render(<BlocksmithEditor />)

    const headingLayer = await screen.findByRole("button", { name: "h1" })
    fireEvent.click(headingLayer)

    await waitFor(() => {
      expect(headingLayer.closest("div")).toHaveClass("bg-primary/10")
    })
  })
})
