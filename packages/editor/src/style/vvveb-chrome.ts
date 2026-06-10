/** Vvveb chrome tokens mapped to Tailwind classes for Style Manager panel. */
export const VVVEB_STYLE_MANAGER = {
  panelWidth: "w-[300px]",
  tabContentPadding: "py-2",
  sectionHeader:
    "text-[11px] font-medium leading-8 px-3 border-t border-border bg-muted/25",
  propertyRow: "mb-2 px-3",
  label: "text-[11px] font-medium text-muted-foreground mb-1",
  controlFontSize: "text-xs",
  navTabPadding: "py-2",
  navItemBg: "bg-muted/40",
} as const

export const BREAKPOINTS = [
  { id: "" as const, label: "Base" },
  { id: "sm" as const, label: "sm" },
  { id: "md" as const, label: "md" },
  { id: "lg" as const, label: "lg" },
  { id: "xl" as const, label: "xl" },
]

export const INTERACTION_STATES = [
  { id: "" as const, label: "Normal" },
  { id: "hover" as const, label: "Hover" },
  { id: "focus" as const, label: "Focus" },
  { id: "active" as const, label: "Active" },
]
