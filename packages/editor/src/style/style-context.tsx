import React, { createContext, useContext, useMemo, useState } from "react"

import type { Breakpoint, InteractionState, StyleContext } from "./class-string-engine"

type StyleContextValue = {
  ctx: StyleContext
  setBreakpoint: (bp: Breakpoint) => void
  setState: (state: InteractionState) => void
}

const StyleCtx = createContext<StyleContextValue | null>(null)

export function StyleContextProvider({ children }: { children: React.ReactNode }) {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>("")
  const [state, setState] = useState<InteractionState>("")

  const value = useMemo(
    () => ({
      ctx: { breakpoint, state },
      setBreakpoint,
      setState,
    }),
    [breakpoint, state],
  )

  return <StyleCtx.Provider value={value}>{children}</StyleCtx.Provider>
}

export function useStyleContext(): StyleContextValue {
  const value = useContext(StyleCtx)
  if (!value) {
    throw new Error("useStyleContext must be used within StyleContextProvider")
  }
  return value
}
