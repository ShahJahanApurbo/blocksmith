import type { PageDocument } from "@blocksmith/core"

import { DEFAULT_PAGE } from "./default-page"

const CRAFT_KEY = "blocksmith:craft"
const PAGE_KEY = "blocksmith:page"

export function loadCraftState(): string | null {
  if (typeof window === "undefined") return null
  return window.localStorage.getItem(CRAFT_KEY)
}

export function saveCraftState(serialized: string): void {
  if (typeof window === "undefined") return
  window.localStorage.setItem(CRAFT_KEY, serialized)
}

export function loadPageDocument(): PageDocument {
  if (typeof window === "undefined") return DEFAULT_PAGE

  const raw = window.localStorage.getItem(PAGE_KEY)
  if (!raw) return DEFAULT_PAGE

  try {
    return JSON.parse(raw) as PageDocument
  } catch {
    return DEFAULT_PAGE
  }
}

export function savePageDocument(page: PageDocument): void {
  if (typeof window === "undefined") return
  window.localStorage.setItem(PAGE_KEY, JSON.stringify(page))
}

export function clearPageDocument(): void {
  if (typeof window === "undefined") return
  window.localStorage.removeItem(PAGE_KEY)
}

export const SAVE_CRAFT_EVENT = "blocksmith:save-craft"
