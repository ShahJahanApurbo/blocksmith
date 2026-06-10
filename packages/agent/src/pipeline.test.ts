import { describe, expect, it } from "vitest"
import { ValidationError } from "@blocksmith/core"
import { processJsx } from "./pipeline"

describe("processJsx", () => {
  it("parses and lowers valid JSX through the core pipeline", () => {
    const tree = processJsx(
      '<section className="mx-auto py-16"><h1 className="text-4xl">Hello</h1></section>',
    )

    expect(tree.tag).toBe("section")
    expect(tree.props.className).toBe("mx-auto py-16")
    expect(tree.children).toHaveLength(1)
  })

  it("rejects disallowed tags", () => {
    expect(() => processJsx("<script>alert(1)</script>")).toThrow(ValidationError)
    expect(() => processJsx("<script>alert(1)</script>")).toThrow(/Disallowed tag/)
  })

  it("rejects arbitrary bracket classes", () => {
    expect(() => processJsx('<div className="text-[13px]">x</div>')).toThrow(
      ValidationError,
    )
    expect(() => processJsx('<div className="text-[13px]">x</div>')).toThrow(
      /Arbitrary value/,
    )
  })

  it("rejects inline style", () => {
    expect(() =>
      processJsx('<div style={{ color: "red" }}>x</div>'),
    ).toThrow(/Inline style/)
  })

  it("rejects unknown components", () => {
    expect(() => processJsx("<Unknown>child</Unknown>")).toThrow(
      /Unknown component/,
    )
  })
})
