import { readFileSync } from "node:fs"
import { fileURLToPath } from "node:url"
import { dirname, join } from "node:path"
import { describe, expect, it } from "vitest"
import type { ElementNode, PageDocument } from "./types"

const fixturesDir = join(dirname(fileURLToPath(import.meta.url)), "../fixtures")

describe("PageDocument", () => {
  it("round-trips through JSON.stringify/parse losslessly", () => {
    const raw = readFileSync(join(fixturesDir, "sample-page.json"), "utf8")
    const doc = JSON.parse(raw) as PageDocument
    const roundTripped = JSON.parse(JSON.stringify(doc)) as PageDocument

    expect(roundTripped).toEqual(doc)
    expect(roundTripped.version).toBe(1)
    expect(roundTripped.content).toHaveLength(2)
  })
})

describe("ElementNode", () => {
  it("parses canonical element tree fixture", () => {
    const raw = readFileSync(join(fixturesDir, "sample-element-tree.json"), "utf8")
    const tree = JSON.parse(raw) as ElementNode

    expect(tree.tag).toBe("section")
    const heading = tree.children?.[0]
    expect(heading).toMatchObject({ tag: "h1" })
    if (heading && "children" in heading) {
      expect(heading.children?.[0]).toMatchObject({
        text: "Build pages with Blocksmith",
      })
    }
  })
})
