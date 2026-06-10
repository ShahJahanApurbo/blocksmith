import { type UserComponent, useNode } from "@craftjs/core"
import React from "react"

import { cn } from "../lib/utils"

export type ButtonComponentProps = {
  className?: string
  children?: React.ReactNode
}

/** Placeholder smart component stub for Wave 1 resolver. */
export const Button: UserComponent<ButtonComponentProps> = ({
  className,
  children,
}) => {
  const {
    connectors: { connect, drag },
  } = useNode()

  return (
    <button
      ref={(ref) => {
        if (ref) connect(drag(ref))
      }}
      type="button"
      className={cn(
        "inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700",
        className,
      )}
    >
      {children ?? "Button"}
    </button>
  )
}

Button.craft = {
  displayName: "Button",
  props: {
    className: "",
    children: "Button",
  },
  rules: {
    canDrag: () => true,
  },
}
