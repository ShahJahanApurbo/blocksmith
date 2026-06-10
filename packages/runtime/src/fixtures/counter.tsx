import { useState } from "react"
import { defineComponent } from "@blocksmith/core"

export const Counter = defineComponent<{ label: string }>({
  name: "Counter",
  fields: { label: { type: "text" } },
  defaultProps: { label: "Clicks" },
  render: ({ label }) => {
    const [n, setN] = useState(0)
    return (
      <button
        type="button"
        className="rounded-md border px-4 py-2"
        onClick={() => setN(n + 1)}
      >
        {label}: {n}
      </button>
    )
  },
})
