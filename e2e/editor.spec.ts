import { expect, test } from "@playwright/test"

test.describe("Blocksmith Editor", () => {
  test("loads without crash", async ({ page }) => {
    await page.goto("/")

    await expect(page).toHaveTitle(/Blocksmith Editor Preview/)
    await expect(
      page.getByRole("heading", { name: "Blocksmith Editor" }),
    ).toBeVisible()
  })

  test("canvas is visible", async ({ page }) => {
    await page.goto("/")

    const canvas = page.locator("main.craftjs-renderer")
    await expect(canvas).toBeVisible()
    await expect(canvas.getByRole("heading", { name: "Blocksmith Editor" })).toBeVisible()
  })

  test("clicking an element shows Style Manager selection state", async ({ page }) => {
    await page.goto("/")

    await page.getByRole("heading", { name: "Blocksmith Editor" }).click()

    const stylePanel = page.locator("aside").filter({ hasText: "Style Manager" })
    await expect(stylePanel).toBeVisible()
    await expect(stylePanel.getByText(/Editing/)).toBeVisible()
    await expect(stylePanel.getByRole("button", { name: "Layout" })).toBeVisible()
  })
})
