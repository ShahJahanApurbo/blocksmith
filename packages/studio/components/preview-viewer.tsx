"use client"

import { createComponentsConfig } from "@blocksmith/components"
import type { PageDocument } from "@blocksmith/core"
import { Render } from "@blocksmith/runtime"
import { ArrowLeft, RefreshCw } from "lucide-react"
import Link from "next/link"
import { useCallback, useState } from "react"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { DEFAULT_PAGE } from "@/lib/default-page"
import { clearPageDocument, loadPageDocument } from "@/lib/storage"

const config = createComponentsConfig()

export function PreviewViewer() {
  const [page, setPage] = useState<PageDocument>(() => loadPageDocument())

  const refresh = useCallback(() => {
    setPage(loadPageDocument())
  }, [])

  const reset = useCallback(() => {
    clearPageDocument()
    setPage(DEFAULT_PAGE)
  }, [])

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="flex h-12 items-center gap-3 border-b border-border px-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/">
            <ArrowLeft />
            Home
          </Link>
        </Button>
        <Separator orientation="vertical" className="h-5" />
        <span className="text-sm font-medium">Preview</span>
        <div className="ml-auto flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={refresh}>
            <RefreshCw />
            Reload
          </Button>
          <Button variant="ghost" size="sm" onClick={reset}>
            Reset
          </Button>
          <Button size="sm" asChild>
            <Link href="/editor">Editor</Link>
          </Button>
        </div>
      </header>
      <main className="flex-1">
        <Render config={config} data={page} />
      </main>
    </div>
  )
}
