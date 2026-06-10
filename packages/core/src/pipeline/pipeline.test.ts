import { describe, expect, it } from "vitest"
import type { ElementNode, TextNode } from "../types"
import { codegen } from "./codegen"
import { ValidationError } from "./errors"
import { lower } from "./lower"
import { parseJsx } from "./parse"
import { validate } from "./validate"

const DEFAULT_REGISTRY = new Set([
  "Button",
  "Input",
  "Tabs",
  "Accordion",
  "Carousel",
  "Dialog",
  "Icon",
])

function runPipeline(fragment: string, registry = DEFAULT_REGISTRY): ElementNode {
  const ast = parseJsx(fragment)
  validate(ast, registry)
  return lower(ast)
}

function stripIds(node: ElementNode | TextNode): unknown {
  if ("text" in node) {
    return { text: node.text }
  }
  return {
    tag: node.tag,
    props: node.props,
    children: node.children?.map(stripIds),
  }
}

describe("parseJsx", () => {
  it("parses a simple section fragment", () => {
    const ast = parseJsx('<section className="mx-auto"><h1>Hello</h1></section>')
    expect(ast.type).toBe("File")
  })
})

describe("validate", () => {
  it("rejects disallowed tags", () => {
    const ast = parseJsx("<script>alert(1)</script>")
    expect(() => validate(ast, DEFAULT_REGISTRY)).toThrow(ValidationError)
    expect(() => validate(ast, DEFAULT_REGISTRY)).toThrow(/Disallowed tag/)
  })

  it("rejects unknown components", () => {
    const ast = parseJsx("<Unknown>child</Unknown>")
    expect(() => validate(ast, DEFAULT_REGISTRY)).toThrow(/Unknown component/)
  })

  it("rejects event handlers", () => {
    const ast = parseJsx('<div onClick={() => {}}>x</div>')
    expect(() => validate(ast, DEFAULT_REGISTRY)).toThrow(/Event handler/)
  })

  it("rejects inline style", () => {
    const ast = parseJsx('<div style={{ color: "red" }}>x</div>')
    expect(() => validate(ast, DEFAULT_REGISTRY)).toThrow(/Inline style/)
  })

  it("rejects arbitrary bracket classes", () => {
    const ast = parseJsx('<div className="text-[13px]">x</div>')
    expect(() => validate(ast, DEFAULT_REGISTRY)).toThrow(/Arbitrary value/)
  })

  it("rejects dangerouslySetInnerHTML", () => {
    const ast = parseJsx('<div dangerouslySetInnerHTML={{ __html: "x" }} />')
    expect(() => validate(ast, DEFAULT_REGISTRY)).toThrow(
      /dangerouslySetInnerHTML/,
    )
  })

  it("allows registered components", () => {
    const ast = parseJsx('<Button className="px-4">Click</Button>')
    expect(() => validate(ast, DEFAULT_REGISTRY)).not.toThrow()
  })
})

describe("lower", () => {
  it("lowers nested HTML into an ElementNode tree", () => {
    const tree = runPipeline(
      '<section className="mx-auto max-w-3xl"><h1 className="text-4xl">Build pages</h1><p className="mt-4">Agent-first JSX.</p></section>',
    )

    expect(tree.tag).toBe("section")
    expect(tree.props.className).toBe("mx-auto max-w-3xl")
    expect(tree.children).toHaveLength(2)

    const heading = tree.children?.[0] as ElementNode
    expect(heading.tag).toBe("h1")
    expect((heading.children?.[0] as TextNode).text).toBe("Build pages")
  })

  it("rejects non-serializable prop expressions", () => {
    const ast = parseJsx("<Button items={getItems()}>x</Button>")
    validate(ast, DEFAULT_REGISTRY)
    expect(() => lower(ast)).toThrow(ValidationError)
  })

  it("accepts static array and object props on components", () => {
    const tree = runPipeline(
      '<Button items={["a", "b"]} meta={{ size: "lg" }}>Save</Button>',
    )
    expect(tree.tag).toBe("Button")
    expect(tree.props.items).toEqual(["a", "b"])
    expect(tree.props.meta).toEqual({ size: "lg" })
  })
})

describe("codegen", () => {
  it("emits clean JSX from a tree", () => {
    const tree = runPipeline(
      '<section className="mx-auto"><h1>Hello</h1></section>',
    )
    const jsx = codegen(tree)
    expect(jsx).toContain('<section className="mx-auto">')
    expect(jsx).toContain("<h1>")
    expect(jsx).toContain("Hello")
    expect(jsx).toContain("</section>")
  })
})

describe("round-trip", () => {
  const samples = [
    '<section className="mx-auto max-w-3xl px-6 py-12"><h1 className="text-4xl font-bold">Build pages with Blocksmith</h1><p className="mt-4 text-muted-foreground">Agent-first JSX that compiles into an editable tree.</p></section>',
    '<div className="flex gap-4"><a href="/docs" target="_blank" rel="noopener">Docs</a><img src="/logo.png" alt="Logo" /></div>',
    '<Button className="px-4 py-2" type="button">Get started</Button>',
  ]

  for (const fragment of samples) {
    it(`round-trips: ${fragment.slice(0, 48)}…`, () => {
      const tree = runPipeline(fragment)
      const jsx = codegen(tree)
      const roundTripped = runPipeline(jsx)

      expect(stripIds(roundTripped)).toEqual(stripIds(tree))
    })
  }
})
