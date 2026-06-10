import {
  type UserComponent,
  useNode,
} from "@craftjs/core"
import React from "react"

import {
  ALLOWED_HTML_TAG_SET,
  type AllowedHtmlTag,
} from "../constants"
import { cn } from "../lib/utils"

export type PrimProps = {
  tag?: AllowedHtmlTag
  className?: string
  children?: React.ReactNode
}

export const Prim: UserComponent<PrimProps> = ({
  tag = "div",
  className,
  children,
}) => {
  const {
    connectors: { connect, drag },
  } = useNode()

  if (!ALLOWED_HTML_TAG_SET.has(tag)) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`Prim: disallowed tag "${tag}"`)
    }
    return null
  }

  const setRef = (ref: HTMLElement | null) => {
    if (ref) connect(drag(ref))
  }

  return React.createElement(
    tag,
    {
      ref: setRef,
      className: cn(className),
    },
    children,
  )
}

Prim.craft = {
  displayName: "Prim",
  props: {
    tag: "div",
    className: "",
  },
  rules: {
    canDrag: () => true,
  },
}
