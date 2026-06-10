import { describe, expect, it } from "vitest"

import {
  buildPrefix,
  getBaseToken,
  getInheritedToken,
  getToken,
  getVariantPrefix,
  setToken,
  stripVariantPrefix,
} from "../class-string-engine"

describe("class-string-engine", () => {
  describe("prefix helpers", () => {
    it("parses variant prefixes", () => {
      expect(getVariantPrefix("flex")).toBe("")
      expect(getVariantPrefix("sm:flex")).toBe("sm")
      expect(getVariantPrefix("hover:bg-red-500")).toBe("hover")
      expect(getVariantPrefix("md:hover:flex")).toBe("md:hover")
    })

    it("strips variant prefixes", () => {
      expect(stripVariantPrefix("md:hover:flex")).toBe("flex")
      expect(stripVariantPrefix("block")).toBe("block")
    })

    it("builds context prefix", () => {
      expect(buildPrefix({ breakpoint: "", state: "" })).toBe("")
      expect(buildPrefix({ breakpoint: "md", state: "" })).toBe("md")
      expect(buildPrefix({ breakpoint: "md", state: "hover" })).toBe("md:hover")
    })
  })

  describe("setToken", () => {
    it("adds a base display token", () => {
      expect(setToken("", "display", "flex", { breakpoint: "", state: "" })).toBe(
        "flex",
      )
    })

    it("replaces conflicting display tokens at the same prefix", () => {
      const result = setToken("block p-4", "display", "flex", {
        breakpoint: "",
        state: "",
      })
      expect(result).toBe("p-4 flex")
      expect(result).not.toContain("block")
    })

    it("preserves display tokens at other breakpoints", () => {
      const result = setToken("block sm:flex", "display", "grid", {
        breakpoint: "",
        state: "",
      })
      expect(result).toContain("sm:flex")
      expect(result).toContain("grid")
      expect(result).not.toContain("block")
    })

    it("writes breakpoint-prefixed tokens", () => {
      expect(
        setToken("flex", "display", "grid", { breakpoint: "md", state: "" }),
      ).toBe("flex md:grid")
    })

    it("writes state-prefixed tokens", () => {
      expect(
        setToken("flex", "bg", "bg-primary", { breakpoint: "", state: "hover" }),
      ).toBe("flex hover:bg-primary")
    })

    it("writes combined md:hover: prefix", () => {
      expect(
        setToken("flex", "display", "block", {
          breakpoint: "md",
          state: "hover",
        }),
      ).toBe("flex md:hover:block")
    })

    it("removes token when null is passed", () => {
      expect(
        setToken("flex p-4", "display", null, { breakpoint: "", state: "" }),
      ).toBe("p-4")
    })

    it("resolves bg conflicts", () => {
      const result = setToken("bg-red-500 text-white", "bg", "bg-primary", {
        breakpoint: "",
        state: "",
      })
      expect(result).toBe("text-white bg-primary")
    })

    it("does not conflate text size and text color", () => {
      const withSize = setToken("", "fontSize", "text-lg", {
        breakpoint: "",
        state: "",
      })
      const withColor = setToken(withSize, "textColor", "text-primary", {
        breakpoint: "",
        state: "",
      })
      expect(withColor).toContain("text-lg")
      expect(withColor).toContain("text-primary")
    })
  })

  describe("getToken", () => {
    it("reads token at current context", () => {
      expect(
        getToken("flex md:grid", "display", { breakpoint: "md", state: "" }),
      ).toBe("grid")
    })

    it("returns null when no token at context", () => {
      expect(
        getToken("flex", "display", { breakpoint: "sm", state: "" }),
      ).toBeNull()
    })
  })

  describe("getInheritedToken", () => {
    it("returns inherited base value at breakpoint", () => {
      const { value, inherited } = getInheritedToken(
        "flex sm:block",
        "display",
        { breakpoint: "md", state: "" },
      )
      expect(value).toBe("flex")
      expect(inherited).toBe(true)
    })

    it("returns current value when set at breakpoint", () => {
      const { value, inherited } = getInheritedToken(
        "flex md:grid",
        "display",
        { breakpoint: "md", state: "" },
      )
      expect(value).toBe("grid")
      expect(inherited).toBe(false)
    })
  })

  describe("getBaseToken", () => {
    it("reads unprefixed token only", () => {
      expect(getBaseToken("sm:flex flex", "display")).toBe("flex")
    })
  })
})
