/** Allowlisted HTML tags for Prim (mirrors @blocksmith/core pipeline constants). */
export const ALLOWED_HTML_TAGS = [
  "section",
  "header",
  "footer",
  "nav",
  "div",
  "span",
  "h1",
  "h2",
  "h3",
  "p",
  "ul",
  "ol",
  "li",
  "a",
  "img",
  "figure",
  "figcaption",
  "blockquote",
  /** Root canvas only — not valid in page content pipeline. */
  "body",
] as const

export type AllowedHtmlTag = (typeof ALLOWED_HTML_TAGS)[number]

export const ALLOWED_HTML_TAG_SET = new Set<string>(ALLOWED_HTML_TAGS)
