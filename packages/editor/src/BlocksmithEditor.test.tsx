import { Editor, Element, Frame } from "@craftjs/core"
import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"

import { BlocksmithEditor } from "./BlocksmithEditor"
import { Prim } from "./components/Prim"
import { resolver } from "./resolver"

describe("BlocksmithEditor", () => {
  it("renders the editor shell with default canvas content", () => {
    render(<BlocksmithEditor />)

    expect(screen.getByText("Blocksmith")).toBeInTheDocument()
    expect(screen.getByText("Blocksmith Editor")).toBeInTheDocument()
    expect(
      screen.getAllByRole("button", { name: "Button" }).length,
    ).toBeGreaterThanOrEqual(1)
  })

  it("accepts custom canvas children", () => {
    render(
      <BlocksmithEditor>
        <Element is={Prim} tag="p" className="custom-leaf">
          Custom content
        </Element>
      </BlocksmithEditor>,
    )

    expect(screen.getByText("Custom content")).toBeInTheDocument()
  })
})

describe("Prim", () => {
  it("registers in the resolver", () => {
    expect(resolver.Prim).toBe(Prim)
    expect(Prim.craft?.displayName).toBe("Prim")
  })

  it("renders inside Craft Editor", () => {
    render(
      <Editor resolver={resolver} enabled>
        <Frame>
          <Element is={Prim} tag="div" className="test-prim">
            Hello
          </Element>
        </Frame>
      </Editor>,
    )

    expect(screen.getByText("Hello")).toHaveClass("test-prim")
  })
})
