import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { describe, expect, it } from "vitest"

import { BlocksmithEditor } from "../../BlocksmithEditor"
import { BlocksPalette } from "../BlocksPalette"
import { Editor, Frame } from "@craftjs/core"
import { Element } from "@craftjs/core"
import { Prim } from "../../components/Prim"
import { resolver } from "../../resolver"

describe("BlocksPalette", () => {
  it("renders palette tabs and search within the editor shell", () => {
    render(<BlocksmithEditor />)

    expect(screen.getByText("Palette")).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: "Blocks" })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: "Components" })).toBeInTheDocument()
    expect(screen.getByRole("tab", { name: "Sections" })).toBeInTheDocument()
    expect(screen.getByLabelText("Search palette")).toBeInTheDocument()
    expect(screen.getByTitle("Drag Container")).toBeInTheDocument()
  })

  it("filters palette items by search query", () => {
    render(
      <Editor resolver={resolver} enabled>
        <Frame>
          <Element is={Prim} canvas tag="body" />
        </Frame>
        <BlocksPalette />
      </Editor>,
    )

    expect(screen.getByTitle("Drag Container")).toBeInTheDocument()
    expect(screen.getByTitle("Drag Heading")).toBeInTheDocument()

    fireEvent.change(screen.getByLabelText("Search palette"), {
      target: { value: "heading" },
    })

    expect(screen.queryByTitle("Drag Container")).not.toBeInTheDocument()
    expect(screen.getByTitle("Drag Heading")).toBeInTheDocument()
  })

  it("shows section items on the Sections tab", async () => {
    const user = userEvent.setup()

    render(<BlocksmithEditor />)

    await user.click(screen.getByRole("tab", { name: "Sections" }))

    expect(screen.getByTitle("Drag Hero")).toBeInTheDocument()
    expect(screen.getByTitle("Drag Features")).toBeInTheDocument()
    expect(screen.getByTitle("Drag CTA")).toBeInTheDocument()
  })
})
