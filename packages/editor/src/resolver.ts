import { Button } from "./components/Button"
import { Prim } from "./components/Prim"

export const resolver = {
  Prim,
  Button,
} as const

export type EditorResolver = typeof resolver
