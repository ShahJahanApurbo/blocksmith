import { Blocks, Eye, Pencil } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function HomePage() {
  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col justify-center gap-10 px-6 py-16">
      <div className="space-y-4 text-center">
        <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <Blocks className="size-6" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">Blocksmith Studio</h1>
        <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
          Wave 3 integration app — edit pages in the Craft.js editor, preview with
          runtime Render, and stub agent-generated sections without API keys.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Button size="lg" asChild>
            <Link href="/editor">
              <Pencil />
              Open editor
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/preview">
              <Eye />
              Preview page
            </Link>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Editor</CardTitle>
            <CardDescription>
              Full BlocksmithEditor with Style Manager and canvas selection.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" className="w-full" asChild>
              <Link href="/editor">Go to /editor</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Preview</CardTitle>
            <CardDescription>
              Renders saved PageDocument JSON via @blocksmith/runtime.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" className="w-full" asChild>
              <Link href="/preview">Go to /preview</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Agent stub</CardTitle>
            <CardDescription>
              Generate section calls runAgentLoop with a mock generator.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="secondary" className="w-full" asChild>
              <Link href="/editor">Try in editor sidebar</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
