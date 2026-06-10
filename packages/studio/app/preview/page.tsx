import dynamic from "next/dynamic"

const PreviewViewer = dynamic(
  () =>
    import("@/components/preview-viewer").then((module) => module.PreviewViewer),
  { ssr: false, loading: () => <PreviewLoading /> },
)

function PreviewLoading() {
  return (
    <div className="flex min-h-screen items-center justify-center text-sm text-muted-foreground">
      Loading preview…
    </div>
  )
}

export default function PreviewPage() {
  return <PreviewViewer />
}
