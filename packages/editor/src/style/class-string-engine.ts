export type Breakpoint = "" | "sm" | "md" | "lg" | "xl"
export type InteractionState = "" | "hover" | "focus" | "active"

export type StyleContext = {
  breakpoint: Breakpoint
  state: InteractionState
}

export const CONFLICTS: Record<string, RegExp> = {
  display: /^(block|flex|grid|inline-flex|hidden|inline)$/,
  flexDirection: /^flex-(row|col|row-reverse|col-reverse)$/,
  flexWrap: /^flex-(wrap|nowrap|wrap-reverse)$/,
  justify: /^justify-(start|end|center|between|around|evenly)$/,
  align: /^items-(start|end|center|baseline|stretch)$/,
  gap: /^gap-\d+$/,
  padding: /^p[tblrxy]?-\d+$/,
  paddingTop: /^pt-\d+$/,
  paddingRight: /^pr-\d+$/,
  paddingBottom: /^pb-\d+$/,
  paddingLeft: /^pl-\d+$/,
  paddingX: /^px-\d+$/,
  paddingY: /^py-\d+$/,
  margin: /^m[tblrxy]?-\d+$/,
  marginTop: /^mt-\d+$/,
  marginRight: /^mr-\d+$/,
  marginBottom: /^mb-\d+$/,
  marginLeft: /^ml-\d+$/,
  marginX: /^mx-\d+$/,
  marginY: /^my-\d+$/,
  width: /^w-(auto|full|screen|\d+\/\d+|\[\d+px\]|\[\d+%\]|min|max|fit|\d+)$/,
  height: /^h-(auto|full|screen|\d+\/\d+|\[\d+px\]|\[\d+%\]|min|max|fit|\d+)$/,
  minWidth: /^min-w-/,
  maxWidth: /^max-w-/,
  minHeight: /^min-h-/,
  maxHeight: /^max-h-/,
  overflow: /^overflow-(auto|hidden|visible|scroll|x-auto|y-auto)$/,
  fontSize: /^text-(xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl)$/,
  fontWeight:
    /^font-(thin|extralight|light|normal|medium|semibold|bold|extrabold|black)$/,
  lineHeight: /^leading-/,
  letterSpacing: /^tracking-/,
  textAlign: /^text-(left|center|right|justify|start|end)$/,
  textColor:
    /^text-(?!xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl|left|center|right|justify|start|end)/,
  textTransform: /^uppercase$|^lowercase$|^capitalize$|^normal-case$/,
  textDecoration: /^underline$|^line-through$|^no-underline$/,
  bg: /^bg-/,
  borderWidth: /^border(-[trblxy])?(-\d+)?$/,
  borderStyle: /^border-(solid|dashed|dotted|double|none)$/,
  borderColor: /^border-(?!solid|dashed|dotted|double|none)/,
  borderRadius: /^rounded(-[trblxy]{1,2})?(-(none|sm|md|lg|xl|2xl|3xl|full|\[\d+px\]))?$/,
  shadow: /^shadow(-(sm|md|lg|xl|2xl|inner|none))?$/,
  opacity: /^opacity-\d+$/,
  blur: /^blur(-(sm|md|lg|xl|2xl|3xl|none))?$/,
  position: /^(static|relative|absolute|fixed|sticky)$/,
  inset: /^inset(-[xytrbl])?-/,
  zIndex: /^z-\d+$/,
  transition: /^transition(-(none|all|colors|opacity|shadow|transform))?$/,
  duration: /^duration-\d+$/,
  ease: /^ease-(linear|in|out|in-out)$/,
}

export function buildPrefix(ctx: StyleContext): string {
  return [ctx.breakpoint, ctx.state].filter(Boolean).join(":")
}

/** Variant chain before the utility token (e.g. md:hover:flex → md:hover). */
export function getVariantPrefix(classToken: string): string {
  const lastColon = classToken.lastIndexOf(":")
  if (lastColon === -1) return ""
  return classToken.slice(0, lastColon)
}

export function stripVariantPrefix(classToken: string): string {
  const lastColon = classToken.lastIndexOf(":")
  return lastColon === -1 ? classToken : classToken.slice(lastColon + 1)
}

function sameVariantContext(classToken: string, ctxPrefix: string): boolean {
  return getVariantPrefix(classToken) === ctxPrefix
}

export function setToken(
  className: string,
  group: string,
  token: string | null,
  ctx: StyleContext,
): string {
  const prefix = buildPrefix(ctx)
  const full = token ? (prefix ? `${prefix}:${token}` : token) : null
  const rx = CONFLICTS[group]
  if (!rx) {
    return full ? `${className} ${full}`.trim() : className
  }

  const kept = className
    .split(/\s+/)
    .filter(Boolean)
    .filter((c) => {
      const base = stripVariantPrefix(c)
      const samePrefix = sameVariantContext(c, prefix)
      return !(rx.test(base) && samePrefix)
    })

  return [...kept, full].filter(Boolean).join(" ")
}

export function getToken(
  className: string,
  group: string,
  ctx: StyleContext,
): string | null {
  const rx = CONFLICTS[group]
  if (!rx) return null

  const prefix = buildPrefix(ctx)
  for (const c of className.split(/\s+/).filter(Boolean)) {
    if (!sameVariantContext(c, prefix)) continue
    const base = stripVariantPrefix(c)
    if (rx.test(base)) return base
  }
  return null
}

/** Base-level token for a group (ignores breakpoint/state prefixes). */
export function getBaseToken(className: string, group: string): string | null {
  const rx = CONFLICTS[group]
  if (!rx) return null

  for (const c of className.split(/\s+/).filter(Boolean)) {
    if (getVariantPrefix(c) !== "") continue
    const base = stripVariantPrefix(c)
    if (rx.test(base)) return base
  }
  return null
}

export function getInheritedToken(
  className: string,
  group: string,
  ctx: StyleContext,
): { value: string | null; inherited: boolean } {
  const current = getToken(className, group, ctx)
  if (current) return { value: current, inherited: false }

  if (buildPrefix(ctx) === "") {
    return { value: null, inherited: false }
  }

  const base = getBaseToken(className, group)
  return { value: base, inherited: base !== null }
}
