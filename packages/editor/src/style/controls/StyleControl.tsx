import {
  AlignCenter,
  AlignStartVertical,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
} from "lucide-react"
import React from "react"

import { Label } from "../../ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../ui/select"
import { ToggleGroup, ToggleGroupItem } from "../../ui/toggle-group"
import { cn } from "../../lib/utils"
import { getInheritedToken } from "../class-string-engine"
import type { ControlDef } from "../control-config"
import { useStyle } from "../use-style"

type ControlProps = {
  control: ControlDef
}

export function StyleControl({ control }: ControlProps) {
  switch (control.kind) {
    case "segmented":
      return <SegmentedControl control={control} />
    case "dropdown":
      return <DropdownControl control={control} />
    case "colorToken":
      return <ColorTokenControl control={control} />
    case "flexAlign":
      return <FlexAlignControl control={control} />
    case "boxModel":
      return <BoxModelControl control={control} />
    case "input":
      return <RawInputControl control={control} />
    default:
      return null
  }
}

function ControlLabel({
  label,
  inherited,
  inheritedValue,
}: {
  label: string
  inherited?: boolean
  inheritedValue?: string | null
}) {
  return (
    <Label className="text-[11px] font-medium text-muted-foreground">
      {label}
      {inherited && inheritedValue ? (
        <span className="ml-1 font-normal text-muted-foreground/60">
          ({inheritedValue})
        </span>
      ) : null}
    </Label>
  )
}

function SegmentedControl({ control }: ControlProps) {
  const { className, apply, ctx } = useStyle()
  const { value, inherited } = getInheritedToken(className, control.group, ctx)

  return (
    <div className="space-y-1">
      <ControlLabel
        label={control.label}
        inherited={inherited}
        inheritedValue={value}
      />
      <ToggleGroup
        type="single"
        size="sm"
        variant="outline"
        value={inherited ? "" : (value ?? "")}
        onValueChange={(v: string) => apply(control.group, v || null)}
        className="flex flex-wrap justify-start gap-0.5"
      >
        {control.options?.map((opt) => (
          <ToggleGroupItem
            key={opt.token}
            value={opt.token}
            className="h-7 px-2 text-[11px] data-[state=on]:bg-primary/10 data-[state=on]:text-primary"
            aria-label={opt.label}
          >
            {opt.label}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  )
}

function DropdownControl({ control }: ControlProps) {
  const { className, apply, ctx } = useStyle()
  const { value, inherited } = getInheritedToken(className, control.group, ctx)
  const current = inherited ? "" : (value ?? "")

  return (
    <div className="space-y-1">
      <ControlLabel
        label={control.label}
        inherited={inherited}
        inheritedValue={value}
      />
      <Select
        value={current || "__none__"}
        onValueChange={(v: string) => apply(control.group, v === "__none__" ? null : v)}
      >
        <SelectTrigger className="h-7 text-xs">
          <SelectValue placeholder="—" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="__none__">—</SelectItem>
          {control.options?.map((opt) => (
            <SelectItem key={opt.token || "__empty__"} value={opt.token || "__none__"}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}

function ColorTokenControl({ control }: ControlProps) {
  const { className, apply, ctx } = useStyle()
  const { value, inherited } = getInheritedToken(className, control.group, ctx)

  return (
    <div className="space-y-1">
      <ControlLabel
        label={control.label}
        inherited={inherited}
        inheritedValue={value}
      />
      <div className="flex flex-wrap gap-1">
        {control.options?.map((opt) => (
          <button
            key={opt.token}
            type="button"
            title={opt.label}
            onClick={() => apply(control.group, opt.token)}
            className={cn(
              "size-6 rounded-sm border border-border text-[9px] font-medium transition-colors",
              value === opt.token && !inherited
                ? "ring-2 ring-primary ring-offset-1"
                : "hover:border-primary/50",
              opt.token.includes("primary") && "bg-primary",
              opt.token.includes("muted") && "bg-muted",
              opt.token.includes("background") && "bg-background",
              opt.token.includes("secondary") && "bg-secondary",
              opt.token.includes("destructive") && "bg-destructive",
              opt.token.includes("white") && "bg-white",
              opt.token.includes("black") && "bg-black",
              opt.token.includes("transparent") && "bg-transparent",
              opt.token.includes("foreground") && "bg-foreground",
            )}
            aria-label={opt.label}
          />
        ))}
      </div>
    </div>
  )
}

const JUSTIFY = ["start", "center", "end", "between"] as const
const ALIGN = ["start", "center", "end", "stretch"] as const

function FlexAlignControl({ control }: ControlProps) {
  const { className, apply, ctx } = useStyle()
  const justify = getInheritedToken(className, "justify", ctx)
  const align = getInheritedToken(className, "align", ctx)

  return (
    <div className="space-y-1">
      <ControlLabel label={control.label} />
      <div className="inline-grid grid-cols-4 gap-0.5 rounded-md border border-border p-1">
        {JUSTIFY.flatMap((j) =>
          ALIGN.map((a) => {
            const jToken = `justify-${j}`
            const aToken = `items-${a}`
            const active =
              !justify.inherited &&
              !align.inherited &&
              justify.value === jToken &&
              align.value === aToken
            return (
              <button
                key={`${j}-${a}`}
                type="button"
                className={cn(
                  "flex size-7 items-center justify-center rounded-sm text-muted-foreground hover:bg-muted",
                  active && "bg-primary/10 text-primary",
                )}
                onClick={() => {
                  apply("justify", jToken)
                  apply("align", aToken)
                }}
                aria-label={`justify-${j} items-${a}`}
              >
                <AlignIcon justify={j} align={a} />
              </button>
            )
          }),
        )}
      </div>
    </div>
  )
}

function AlignIcon({
  justify,
  align,
}: {
  justify: (typeof JUSTIFY)[number]
  align: (typeof ALIGN)[number]
}) {
  if (align === "stretch") return <AlignCenter className="size-3.5" />
  if (justify === "start" && align === "start") return <ArrowUp className="size-3.5" />
  if (justify === "end" && align === "end") return <ArrowDown className="size-3.5" />
  if (justify === "center") return <AlignCenter className="size-3.5" />
  if (justify === "start") return <ArrowLeft className="size-3.5" />
  if (justify === "end") return <ArrowRight className="size-3.5" />
  return <AlignStartVertical className="size-3.5" />
}

type Side = "t" | "r" | "b" | "l"

function BoxModelControl({ control }: ControlProps) {
  const prefix = control.boxKind === "margin" ? "m" : "p"
  const sides: Side[] = ["t", "r", "b", "l"]

  return (
    <div className="space-y-1">
      <ControlLabel label={control.label} />
      <div className="relative mx-auto aspect-square w-full max-w-[180px] rounded-sm border border-dashed border-border bg-muted/20 p-6">
        <span className="absolute left-1/2 top-1 -translate-x-1/2 text-[9px] uppercase text-muted-foreground">
          {control.boxKind}
        </span>
        {sides.map((side) => (
          <BoxSideInput key={side} side={side} prefix={prefix} />
        ))}
        <div className="flex h-full items-center justify-center rounded-sm border border-border bg-background text-[9px] text-muted-foreground">
          content
        </div>
      </div>
    </div>
  )
}

function BoxSideInput({ side, prefix }: { side: Side; prefix: string }) {
  const group = `${prefix === "p" ? "padding" : "margin"}${side.toUpperCase()}` as
    | "paddingTop"
    | "paddingRight"
    | "paddingBottom"
    | "paddingLeft"
    | "marginTop"
    | "marginRight"
    | "marginBottom"
    | "marginLeft"
  const tokenPrefix = `${prefix}${side}`
  const { className, apply, ctx } = useStyle()
  const { value } = getInheritedToken(className, group, ctx)
  const num = value?.replace(/^[pm][trblxy]?-/, "") ?? ""

  const position: Record<Side, string> = {
    t: "absolute left-1/2 top-0 -translate-x-1/2",
    r: "absolute right-0 top-1/2 -translate-y-1/2",
    b: "absolute bottom-0 left-1/2 -translate-x-1/2",
    l: "absolute left-0 top-1/2 -translate-y-1/2",
  }

  return (
    <input
      type="number"
      min={0}
      max={32}
      value={num}
      onChange={(e) => {
        const n = e.target.value
        apply(group, n === "" ? null : `${tokenPrefix}-${n}`)
      }}
      className={cn(
        "h-6 w-8 rounded-sm border border-input bg-background text-center text-[10px]",
        position[side],
      )}
      aria-label={`${prefix}${side}`}
    />
  )
}

function RawInputControl({ control }: ControlProps) {
  const { className, setClassName, rawProps, setRawProp } = useStyle()

  if (control.group === "rawClassName") {
    return (
      <div className="space-y-1">
        <ControlLabel label={control.label} />
        <textarea
          className="min-h-[80px] w-full rounded-sm border border-input bg-background px-2 py-1.5 font-mono text-[11px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          value={className}
          placeholder={control.placeholder}
          onChange={(e) => setClassName(e.target.value)}
        />
      </div>
    )
  }

  const attrEntries = Object.entries(rawProps).filter(
    ([k]) => k !== "className" && k !== "tag",
  )
  const attrText = attrEntries
    .map(([k, v]) => `${k}="${String(v ?? "")}"`)
    .join("\n")

  return (
    <div className="space-y-1">
      <ControlLabel label={control.label} />
      <textarea
        className="min-h-[60px] w-full rounded-sm border border-input bg-background px-2 py-1.5 font-mono text-[11px] focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
        value={attrText}
        placeholder={control.placeholder}
        onChange={(e) => {
          const lines = e.target.value.split("\n").filter(Boolean)
          for (const line of lines) {
            const match = line.match(/^([\w-]+)="(.*)"$/)
            if (match?.[1] !== undefined && match[2] !== undefined) {
              setRawProp(match[1], match[2])
            }
          }
        }}
      />
    </div>
  )
}
