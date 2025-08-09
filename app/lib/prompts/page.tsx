import { LIBRARY } from "@/lib/library/registry"
import LibraryPageClient from "@/components/library/library-page-client"
import { Suspense } from "react"

export default function PromptsLibraryPage() {
  const def = LIBRARY.prompts
  return (
    <div className="mx-auto max-w-6xl p-4 md:p-8">
      <Suspense fallback={<div>Loading...</div>}>
        <LibraryPageClient definition={def} />
      </Suspense>
    </div>
  )
}
