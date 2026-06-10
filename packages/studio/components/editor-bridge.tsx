"use client"

import { useEditor } from "@craftjs/core"
import { useEffect, useRef } from "react"

import {
  SAVE_CRAFT_EVENT,
  loadCraftState,
  saveCraftState,
} from "@/lib/storage"

/**
 * Invisible Craft bridge: hydrates from localStorage and listens for save events.
 * Must render inside BlocksmithEditor's Craft context.
 */
export function EditorBridge() {
  const { actions, query } = useEditor()
  const hydrated = useRef(false)

  useEffect(() => {
    if (hydrated.current) return

    const saved = loadCraftState()
    if (saved) {
      try {
        actions.deserialize(saved)
      } catch {
        // Ignore corrupt snapshots — default canvas remains.
      }
    }
    hydrated.current = true
  }, [actions])

  useEffect(() => {
    const onSave = () => {
      saveCraftState(query.serialize())
    }

    window.addEventListener(SAVE_CRAFT_EVENT, onSave)
    return () => window.removeEventListener(SAVE_CRAFT_EVENT, onSave)
  }, [query])

  return null
}

export function requestCraftSave() {
  window.dispatchEvent(new Event(SAVE_CRAFT_EVENT))
}
