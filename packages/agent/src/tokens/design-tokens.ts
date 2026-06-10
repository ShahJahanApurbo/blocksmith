import tokensJson from "./design-tokens.json"

export interface DesignTokens {
  colors: {
    background: string
    foreground: string
    card: string
    cardForeground: string
    primary: string
    primaryForeground: string
    secondary: string
    secondaryForeground: string
    muted: string
    mutedForeground: string
    accent: string
    accentForeground: string
    destructive: string
    destructiveForeground: string
    border: string
    input: string
    ring: string
    classExamples: string[]
  }
  spacing: {
    scale: number[]
    sectionPadding: string[]
    gapRhythm: string[]
  }
  container: string
  typography: {
    display: string
    h1: string
    h2: string
    h3: string
    body: string
    small: string
  }
  radius: {
    cards: string
    largeSurfaces: string
    pills: string
  }
  shadow: {
    cards: string
    popovers: string
    modals: string
  }
  border: string
}

/** Single source of visual truth for the agent prompt and validation contract. */
export const designTokens: DesignTokens = tokensJson as DesignTokens

export function formatDesignTokens(tokens: DesignTokens = designTokens): string {
  const { colors, spacing, typography, radius, shadow, border, container } =
    tokens

  return [
    "COLORS (shadcn CSS variables -> Tailwind tokens; use the token names, not hex):",
    `  background / foreground`,
    `  card / card-foreground`,
    `  primary / primary-foreground`,
    `  secondary / secondary-foreground`,
    `  muted / muted-foreground`,
    `  accent / accent-foreground`,
    `  destructive / destructive-foreground`,
    `  border, input, ring`,
    `  -> classes: ${colors.classExamples.join(", ")} ...`,
    "",
    `SPACING SCALE (Tailwind default 4px step): use ${spacing.scale.join(",")}`,
    `  Section padding rhythm: ${spacing.sectionPadding.join(" / ")} (never random).`,
    `  Gap rhythm: ${spacing.gapRhythm.join(" / ")}.`,
    "",
    `CONTAINER: ${container}`,
    "",
    "TYPE SCALE:",
    `  Display: ${typography.display}`,
    `  H1: ${typography.h1}`,
    `  H2: ${typography.h2}`,
    `  H3: ${typography.h3}`,
    `  Body: ${typography.body}`,
    `  Small: ${typography.small}`,
    "",
    `RADIUS: ${radius.cards} (cards/buttons), ${radius.largeSurfaces} (large surfaces), ${radius.pills} (pills/avatars)`,
    `SHADOW: ${shadow.cards} (cards), ${shadow.popovers} (popovers), ${shadow.modals} (modals/hero media)`,
    `BORDER: ${border}`,
  ].join("\n")
}
