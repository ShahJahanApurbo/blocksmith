export type ControlKind =
  | "segmented"
  | "dropdown"
  | "slider"
  | "colorToken"
  | "boxModel"
  | "input"
  | "flexAlign"

export type ControlOption = {
  label: string
  token: string
}

export type ControlDef = {
  kind: ControlKind
  group: string
  label: string
  options?: ControlOption[]
  min?: number
  max?: number
  placeholder?: string
  /** For boxModel: padding | margin */
  boxKind?: "padding" | "margin"
}

export type ControlGroup = {
  id: string
  label: string
  controls: ControlDef[]
}

const DISPLAY_OPTIONS: ControlOption[] = [
  { label: "Block", token: "block" },
  { label: "Flex", token: "flex" },
  { label: "Grid", token: "grid" },
  { label: "Inline", token: "inline-flex" },
  { label: "Hidden", token: "hidden" },
]

const FLEX_DIR: ControlOption[] = [
  { label: "Row", token: "flex-row" },
  { label: "Col", token: "flex-col" },
  { label: "Row Rev", token: "flex-row-reverse" },
  { label: "Col Rev", token: "flex-col-reverse" },
]

const FLEX_WRAP: ControlOption[] = [
  { label: "Wrap", token: "flex-wrap" },
  { label: "No Wrap", token: "flex-nowrap" },
]

const GAP_SCALE = Array.from({ length: 13 }, (_, i) => ({
  label: String(i),
  token: `gap-${i}`,
}))

const FONT_SIZE: ControlOption[] = [
  { label: "xs", token: "text-xs" },
  { label: "sm", token: "text-sm" },
  { label: "base", token: "text-base" },
  { label: "lg", token: "text-lg" },
  { label: "xl", token: "text-xl" },
  { label: "2xl", token: "text-2xl" },
  { label: "3xl", token: "text-3xl" },
]

const FONT_WEIGHT: ControlOption[] = [
  { label: "Light", token: "font-light" },
  { label: "Normal", token: "font-normal" },
  { label: "Medium", token: "font-medium" },
  { label: "Semibold", token: "font-semibold" },
  { label: "Bold", token: "font-bold" },
]

const TEXT_ALIGN: ControlOption[] = [
  { label: "Left", token: "text-left" },
  { label: "Center", token: "text-center" },
  { label: "Right", token: "text-right" },
  { label: "Justify", token: "text-justify" },
]

const TEXT_COLORS: ControlOption[] = [
  { label: "Foreground", token: "text-foreground" },
  { label: "Muted", token: "text-muted-foreground" },
  { label: "Primary", token: "text-primary" },
  { label: "Destructive", token: "text-destructive" },
  { label: "White", token: "text-white" },
  { label: "Black", token: "text-black" },
]

const BG_COLORS: ControlOption[] = [
  { label: "Background", token: "bg-background" },
  { label: "Muted", token: "bg-muted" },
  { label: "Primary", token: "bg-primary" },
  { label: "Secondary", token: "bg-secondary" },
  { label: "Transparent", token: "bg-transparent" },
  { label: "White", token: "bg-white" },
]

const WIDTH: ControlOption[] = [
  { label: "Auto", token: "w-auto" },
  { label: "Full", token: "w-full" },
  { label: "1/2", token: "w-1/2" },
  { label: "1/3", token: "w-1/3" },
  { label: "2/3", token: "w-2/3" },
  { label: "Fit", token: "w-fit" },
]

const HEIGHT: ControlOption[] = [
  { label: "Auto", token: "h-auto" },
  { label: "Full", token: "h-full" },
  { label: "Screen", token: "h-screen" },
  { label: "Fit", token: "h-fit" },
]

const OVERFLOW: ControlOption[] = [
  { label: "Visible", token: "overflow-visible" },
  { label: "Hidden", token: "overflow-hidden" },
  { label: "Auto", token: "overflow-auto" },
  { label: "Scroll", token: "overflow-scroll" },
]

const BORDER_WIDTH: ControlOption[] = [
  { label: "None", token: "" },
  { label: "Default", token: "border" },
  { label: "2", token: "border-2" },
  { label: "4", token: "border-4" },
]

const BORDER_STYLE: ControlOption[] = [
  { label: "Solid", token: "border-solid" },
  { label: "Dashed", token: "border-dashed" },
  { label: "Dotted", token: "border-dotted" },
]

const BORDER_RADIUS: ControlOption[] = [
  { label: "None", token: "rounded-none" },
  { label: "SM", token: "rounded-sm" },
  { label: "MD", token: "rounded-md" },
  { label: "LG", token: "rounded-lg" },
  { label: "Full", token: "rounded-full" },
]

const SHADOW: ControlOption[] = [
  { label: "None", token: "shadow-none" },
  { label: "SM", token: "shadow-sm" },
  { label: "MD", token: "shadow-md" },
  { label: "LG", token: "shadow-lg" },
  { label: "XL", token: "shadow-xl" },
]

const OPACITY = Array.from({ length: 11 }, (_, i) => ({
  label: `${i * 10}%`,
  token: `opacity-${i * 10}`,
}))

const POSITION: ControlOption[] = [
  { label: "Static", token: "static" },
  { label: "Relative", token: "relative" },
  { label: "Absolute", token: "absolute" },
  { label: "Fixed", token: "fixed" },
  { label: "Sticky", token: "sticky" },
]

const Z_INDEX: ControlOption[] = [
  { label: "0", token: "z-0" },
  { label: "10", token: "z-10" },
  { label: "20", token: "z-20" },
  { label: "30", token: "z-30" },
  { label: "40", token: "z-40" },
  { label: "50", token: "z-50" },
]

const TRANSITION: ControlOption[] = [
  { label: "None", token: "transition-none" },
  { label: "All", token: "transition-all" },
  { label: "Colors", token: "transition-colors" },
  { label: "Opacity", token: "transition-opacity" },
  { label: "Transform", token: "transition-transform" },
]

const DURATION: ControlOption[] = [
  { label: "75ms", token: "duration-75" },
  { label: "150ms", token: "duration-150" },
  { label: "300ms", token: "duration-300" },
  { label: "500ms", token: "duration-500" },
  { label: "700ms", token: "duration-700" },
]

const EASE: ControlOption[] = [
  { label: "Linear", token: "ease-linear" },
  { label: "In", token: "ease-in" },
  { label: "Out", token: "ease-out" },
  { label: "In Out", token: "ease-in-out" },
]

export const STYLE_CONTROL_GROUPS: ControlGroup[] = [
  {
    id: "layout",
    label: "Layout",
    controls: [
      { kind: "segmented", group: "display", label: "Display", options: DISPLAY_OPTIONS },
      { kind: "segmented", group: "flexDirection", label: "Direction", options: FLEX_DIR },
      { kind: "segmented", group: "flexWrap", label: "Wrap", options: FLEX_WRAP },
      { kind: "flexAlign", group: "justify", label: "Align", options: [] },
      { kind: "dropdown", group: "gap", label: "Gap", options: GAP_SCALE },
    ],
  },
  {
    id: "spacing",
    label: "Spacing",
    controls: [
      { kind: "boxModel", group: "padding", label: "Padding", boxKind: "padding" },
      { kind: "boxModel", group: "margin", label: "Margin", boxKind: "margin" },
    ],
  },
  {
    id: "size",
    label: "Size",
    controls: [
      { kind: "dropdown", group: "width", label: "Width", options: WIDTH },
      { kind: "dropdown", group: "height", label: "Height", options: HEIGHT },
      { kind: "dropdown", group: "overflow", label: "Overflow", options: OVERFLOW },
    ],
  },
  {
    id: "typography",
    label: "Typography",
    controls: [
      { kind: "dropdown", group: "fontSize", label: "Font Size", options: FONT_SIZE },
      { kind: "dropdown", group: "fontWeight", label: "Weight", options: FONT_WEIGHT },
      { kind: "dropdown", group: "textAlign", label: "Align", options: TEXT_ALIGN },
      { kind: "colorToken", group: "textColor", label: "Color", options: TEXT_COLORS },
    ],
  },
  {
    id: "background",
    label: "Background",
    controls: [
      { kind: "colorToken", group: "bg", label: "Color", options: BG_COLORS },
    ],
  },
  {
    id: "border",
    label: "Border",
    controls: [
      { kind: "dropdown", group: "borderWidth", label: "Width", options: BORDER_WIDTH },
      { kind: "dropdown", group: "borderStyle", label: "Style", options: BORDER_STYLE },
      { kind: "dropdown", group: "borderRadius", label: "Radius", options: BORDER_RADIUS },
    ],
  },
  {
    id: "effects",
    label: "Effects",
    controls: [
      { kind: "dropdown", group: "shadow", label: "Shadow", options: SHADOW },
      { kind: "dropdown", group: "opacity", label: "Opacity", options: OPACITY },
    ],
  },
  {
    id: "position",
    label: "Position",
    controls: [
      { kind: "segmented", group: "position", label: "Position", options: POSITION },
      { kind: "dropdown", group: "zIndex", label: "Z-Index", options: Z_INDEX },
    ],
  },
  {
    id: "transitions",
    label: "Transitions",
    controls: [
      { kind: "dropdown", group: "transition", label: "Property", options: TRANSITION },
      { kind: "dropdown", group: "duration", label: "Duration", options: DURATION },
      { kind: "dropdown", group: "ease", label: "Easing", options: EASE },
    ],
  },
  {
    id: "raw",
    label: "Raw",
    controls: [
      { kind: "input", group: "rawClassName", label: "className", placeholder: "Tailwind classes…" },
      { kind: "input", group: "rawAttributes", label: "Attributes", placeholder: "id, href, aria-*…" },
    ],
  },
]
