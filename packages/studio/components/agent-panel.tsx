"use client"

import type { AgentLoopContext, AgentLoopResult } from "@blocksmith/agent"
import { runAgentLoop } from "@blocksmith/agent"
import type { PageDocument } from "@blocksmith/core"
import { Bot, Loader2, Sparkles } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

import { requestCraftSave } from "@/components/editor-bridge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { loadPageDocument, savePageDocument } from "@/lib/storage"

async function mockGenerate(context: AgentLoopContext): Promise<string> {
  const title = context.intent.trim() || "Generated section"
  return `<section className="mx-auto max-w-screen-xl px-4 py-24">
  <h1 className="text-4xl font-bold tracking-tight">${title}</h1>
  <p className="mt-4 text-base text-muted-foreground leading-relaxed">Stub output from runAgentLoop (iteration ${context.iteration + 1}).</p>
</section>`
}

function appendAgentHero(
  page: PageDocument,
  intent: string,
  result: AgentLoopResult,
): PageDocument {
  const hero = {
    type: "Hero",
    props: {
      id: `hero-agent-${Date.now()}`,
      title: intent.trim() || "Generated section",
      subtitle: `Agent stub committed with score ${result.committed.critique.score.toFixed(2)} after ${result.iterations} iteration(s).`,
      ctaLabel: "View preview",
      className: "py-20 border-t",
    },
  }

  return {
    ...page,
    content: [...page.content, hero],
  }
}

export function AgentPanel() {
  const [intent, setIntent] = useState("Marketing hero section")
  const [status, setStatus] = useState<string | null>(null)
  const [running, setRunning] = useState(false)

  const handleGenerate = async () => {
    setRunning(true)
    setStatus(null)

    try {
      const result = await runAgentLoop({
        intent,
        generate: mockGenerate,
      })

      const page = appendAgentHero(loadPageDocument(), intent, result)
      savePageDocument(page)
      setStatus(
        `Committed Hero block (score ${result.committed.critique.score.toFixed(2)}). Open /preview to see it.`,
      )
    } catch (error) {
      setStatus(
        error instanceof Error ? error.message : "Agent loop failed unexpectedly.",
      )
    } finally {
      setRunning(false)
    }
  }

  const handleSaveEditor = () => {
    requestCraftSave()
    setStatus("Editor canvas saved to localStorage.")
  }

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-border bg-background">
      <div className="flex items-center gap-2 border-b border-border px-4 py-3">
        <Bot className="size-4 text-primary" />
        <span className="text-sm font-semibold">Agent</span>
      </div>

      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="space-y-2">
          <label
            htmlFor="agent-intent"
            className="text-xs font-medium uppercase tracking-wide text-muted-foreground"
          >
            Intent
          </label>
          <textarea
            id="agent-intent"
            value={intent}
            onChange={(event) => setIntent(event.target.value)}
            rows={3}
            className="w-full resize-none rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
            placeholder="Describe the section to generate…"
          />
        </div>

        <Button
          className="w-full"
          onClick={handleGenerate}
          disabled={running}
        >
          {running ? (
            <>
              <Loader2 className="animate-spin" />
              Generating…
            </>
          ) : (
            <>
              <Sparkles />
              Generate section
            </>
          )}
        </Button>

        <Separator />

        <Button variant="outline" className="w-full" onClick={handleSaveEditor}>
          Save editor
        </Button>

        <Button variant="ghost" className="w-full" asChild>
          <Link href="/preview">Open preview</Link>
        </Button>

        {status ? (
          <p className="text-xs leading-relaxed text-muted-foreground">{status}</p>
        ) : (
          <p className="text-xs leading-relaxed text-muted-foreground">
            Mock agent loop — no API keys. Generated sections append a Hero block to
            the preview page JSON.
          </p>
        )}
      </div>
    </aside>
  )
}
