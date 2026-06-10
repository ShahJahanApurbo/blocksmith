import { Paintbrush } from "lucide-react"
import React from "react"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion"
import { cn } from "../lib/utils"
import { STYLE_CONTROL_GROUPS } from "./control-config"
import { StyleControl } from "./controls/StyleControl"
import { StyleContextProvider } from "./style-context"
import { StyleToolbar } from "./StyleToolbar"
import { useStyle } from "./use-style"
import { VVVEB_STYLE_MANAGER } from "./vvveb-chrome"

function StyleManagerInner() {
  const { selectedId, displayName } = useStyle()

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <StyleToolbar />
      {!selectedId ? (
        <div className="border-b border-border px-3 py-2 text-center text-[10px] text-muted-foreground">
          Select an element on the canvas to edit its styles.
        </div>
      ) : displayName ? (
        <div className="border-b border-border px-3 py-1.5 text-[10px] text-muted-foreground">
          Editing <span className="font-medium text-foreground">{displayName}</span>
        </div>
      ) : null}
      <div className="min-h-0 flex-1 overflow-y-auto">
        <Accordion
          type="multiple"
          defaultValue={["layout", "spacing"]}
          className="w-full"
        >
          {STYLE_CONTROL_GROUPS.map((group) => (
            <AccordionItem key={group.id} value={group.id} className="border-none">
              <AccordionTrigger
                className={cn(
                  VVVEB_STYLE_MANAGER.sectionHeader,
                  "hover:no-underline [&[data-state=open]>svg]:rotate-180",
                )}
              >
                {group.label}
              </AccordionTrigger>
              <AccordionContent className={VVVEB_STYLE_MANAGER.tabContentPadding}>
                <div
                  className={cn(
                    "space-y-3 pb-2",
                    !selectedId && "pointer-events-none opacity-50",
                  )}
                >
                  {group.controls.map((control) => (
                    <div key={`${group.id}-${control.group}`} className={VVVEB_STYLE_MANAGER.propertyRow}>
                      <StyleControl control={control} />
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}

export function StyleManager() {
  return (
    <StyleContextProvider>
      <StyleManagerInner />
    </StyleContextProvider>
  )
}

export function StyleManagerPanel() {
  return (
    <aside
      className={cn(
        "flex shrink-0 flex-col border-l border-border bg-background",
        VVVEB_STYLE_MANAGER.panelWidth,
      )}
    >
      <div className="flex items-center gap-2 border-b border-border px-3 py-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        <Paintbrush className="size-3.5" />
        Style Manager
      </div>
      <StyleManager />
    </aside>
  )
}
