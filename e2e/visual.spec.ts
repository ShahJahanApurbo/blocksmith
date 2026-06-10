import { expect, test } from "@playwright/test"

test.describe("Visual regression", () => {
  test("style manager panel matches baseline", async ({ page }) => {
    await page.goto("/")
    await page.getByRole("heading", { name: "Blocksmith Editor" }).click()

    const stylePanel = page.locator("aside").filter({ hasText: "Style Manager" })
    await expect(stylePanel).toBeVisible()

    await expect(stylePanel).toHaveScreenshot("style-manager-panel.png", {
      mask: [page.locator('[data-state="open"] svg')],
    })
  })
})
