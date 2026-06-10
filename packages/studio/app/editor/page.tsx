import dynamic from "next/dynamic"

const StudioEditor = dynamic(
  () =>
    import("@/components/studio-editor").then((module) => module.StudioEditor),
  { ssr: false, loading: () => <EditorLoading /> },
)

function EditorLoading() {
  return (
    <div className="flex h-screen items-center justify-center text-sm text-muted-foreground">
      Loading editor…
    </div>
  )
}

export default function EditorPage() {
  return <StudioEditor />
}
