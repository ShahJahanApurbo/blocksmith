import { describe, expect, it, vi } from "vitest"
import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { createConfig, type PageDocument } from "@blocksmith/core"
import { Render } from "./render"
import { Counter } from "./fixtures/counter"

const pageData: PageDocument = {
  version: 1,
  root: { props: {} },
  content: [
    {
      type: "Counter",
      props: { id: "counter-1", label: "Clicks" },
    },
  ],
}

const config = createConfig({
  components: {
    Counter,
  },
})

describe("Render", () => {
  it("increments Counter on click", async () => {
    const user = userEvent.setup()
    render(<Render config={config} data={pageData} />)

    const button = screen.getByRole("button", { name: /Clicks: 0/ })
    await user.click(button)

    expect(screen.getByRole("button", { name: /Clicks: 1/ })).toBeInTheDocument()
  })

  it("renders nested slots recursively", () => {
    const data: PageDocument = {
      version: 1,
      root: { props: {} },
      content: [
        {
          type: "Card",
          props: { id: "card-1", title: "Hello" },
          slots: {
            body: [
              {
                type: "Counter",
                props: { id: "counter-nested", label: "Nested" },
              },
            ],
          },
        },
      ],
    }

    const slotConfig = createConfig({
      components: {
        Counter,
        Card: {
          name: "Card",
          fields: { title: { type: "text" } },
          defaultProps: { title: "" },
          render: ({ title, body }) => (
            <section>
              <h2>{title}</h2>
              {body?.()}
            </section>
          ),
        },
      },
    })

    render(<Render config={slotConfig} data={data} />)

    expect(screen.getByRole("heading", { name: "Hello" })).toBeInTheDocument()
    expect(screen.getByRole("button", { name: /Nested: 0/ })).toBeInTheDocument()
  })

  it("skips unknown component types gracefully", () => {
    const data: PageDocument = {
      version: 1,
      root: { props: {} },
      content: [
        {
          type: "UnknownBlock",
          props: { id: "unknown-1" },
        },
      ],
    }

    const warn = vi.spyOn(console, "warn").mockImplementation(() => {})
    const { container } = render(<Render config={config} data={data} />)

    expect(container).toBeEmptyDOMElement()
    expect(warn).toHaveBeenCalledWith("Unknown component type: UnknownBlock")
    warn.mockRestore()
  })
})
