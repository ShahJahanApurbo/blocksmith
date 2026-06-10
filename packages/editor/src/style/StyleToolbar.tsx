import { Monitor, MousePointerClick } from "lucide-react"
import React from "react"

import { ToggleGroup, ToggleGroupItem } from "../ui/toggle-group"
import { cn } from "../lib/utils"
import { useStyleContext } from "./style-context"
import {
  BREAKPOINTS,
  INTERACTION_STATES,
  VVVEB_STYLE_MANAGER,
} from "./vvveb-chrome"

export function StyleToolbar() {
  const { ctx, setBreakpoint, setState } = useStyleContext()

  return (
    <div
      className={cn(
        "shrink-0 space-y-2 border-b border-border px-2 py-2",
        VVVEB_STYLE_MANAGER.navItemBg,
      )}
    >
      <div className="flex items-center gap-1">
        <Monitor className="size-3 shrink-0 text-muted-foreground" aria-hidden />
        <ToggleGroup
          type="single"
          size="sm"
          variant="outline"
          value={ctx.breakpoint || "base"}
          onValueChange={(v: string) =>
            setBreakpoint(v === "base" ? "" : (v as typeof ctx.breakpoint))
          }
          className="flex flex-1 flex-wrap justify-start gap-0.5"
        >
          {BREAKPOINTS.map((bp) => (
            <ToggleGroupItem
              key={bp.id || "base"}
              value={bp.id || "base"}
              className="h-6 px-2 text-[10px] data-[state=on]:bg-primary/10 data-[state=on]:text-primary"
            >
              {bp.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
      <div className="flex items-center gap-1">
        <MousePointerClick
          className="size-3 shrink-0 text-muted-foreground"
          aria-hidden
        />
        <ToggleGroup
          type="single"
          size="sm"
          variant="outline"
          value={ctx.state || "normal"}
          onValueChange={(v: string) =>
            setState(v === "normal" ? "" : (v as typeof ctx.state))
          }
          className="flex flex-1 flex-wrap justify-start gap-0.5"
        >
          {INTERACTION_STATES.map((s) => (
            <ToggleGroupItem
              key={s.id || "normal"}
              value={s.id || "normal"}
              className="h-6 px-2 text-[10px] data-[state=on]:bg-primary/10 data-[state=on]:text-primary"
            >
              {s.label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>
    </div>
  )
}
